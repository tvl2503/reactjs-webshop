import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Breadcrumb from '../components/Breadcrumb'
import Button from '../components/Button'
import Grid from '../components/Grid'
import Helmet from '../components/Helmet'
import Input from '../components/Input'
import {toast} from 'react-toastify'
import { Radio } from 'antd';
import { publicRequest } from '../services/requesMethods'
import { getProductsToOrder } from '../redux/order/orderSlice'
import numberWithCommas from '../utils/numberWithCommas'
import { gettoCart } from '../services/cart/cartApi'

const Checkout = () => {
  const dispatch = useDispatch()
  const { products } = useSelector(state => state.cart)
  const { total } = useSelector(state => state.cart)
  const { email } = useSelector(state => state.user.currentUser)
  const [value, setValue]= useState(0)
  const [step, setStep] = useState(1)
  const total1 = total + (total < 200000 ? total * 20 / 100 : 0)
  const [data, setData] = useState({
    fullname: "",
    address: '',
    phone: '',
    note: '',
    status: 'pending'
  })
  const handleOnChangeInput = ({ currentTarget: input }) => {
    setData({...data, [input.name]: input.value })
  }
  const handleOnchange = (e) => {
    setValue(e.target.value);
  }
  const handleNext = () => {
    if(data.fullname === '' ||
       data.address === '' ||
       data.phone === '' ){
      toast.error("Vui lòng nhập đầy đủ thông tin!")
    }
    else{
      setStep(2)
    }
  }
  const handleOrder = async () => {
    try{
        const res = await publicRequest.post("/orders", {
          products: products,
          amount: total1,
          data: data
        },{
          headers: {token: `Bearer ${localStorage.getItem('token')}`}
        })
      dispatch(getProductsToOrder({data: res.data, name: data.fullname}))
      toast.success("Đặt hàng thành công")
      gettoCart(dispatch)
      window.location = "/other/order-success"
    }catch(err){
      toast.error("Lỗi!")

    }
  }

  return (
    <Helmet title='Đặt hàng'>
      <Breadcrumb title='Đặt hàng' />
      <div className="checkout container">
        <Grid col={2} mdCol={1}>
          <div className="checkout__total">
            <div className="checkout__total__list">
              {
                products.map((item, index) => (
                  <div key={index} className="checkout__total__list__item">
                    <img src={item.img} alt="" />
                    <div className="checkout__total__list__item__name">{item.title}</div>
                    <div className="checkout__total__list__item__price"> {numberWithCommas(item.price * item.quantity)}</div>

                  </div>
                ))
              }
            </div>
            <div className="checkout__total__price">
              <div className="checkout__total__price__subtotal">
                <p>Tổng tiền hàng</p>
                <span>{numberWithCommas(total)}</span>
              </div>
              <div className="checkout__total__price__subtotal">
                <p>Phí ship</p>
                <span>{numberWithCommas(total < 200000 ? total * 20 / 100 : 0)}</span>
              </div>
              <p>Miễn phí ship cho đơn hàng trên 200k</p>
            </div>
            <div className="checkout__total__price">

              <div className="checkout__total__price__subtotal">
                <p>Tổng thanh toán</p>
                <span>{numberWithCommas(total + (total < 200000 ? total * 20 / 100 : 0))}</span>
              </div>
            </div>
          </div>
          {step === 1 &&        
          <div className="checkout__infomation">
            <div className="checkout__infomation__title">
              Địa chỉ giao hàng
            </div>
            <div className="checkout__infomation__form">
              <Input type="text"  placeholder={"Họ và Tên"} name = "fullname" onChange = {handleOnChangeInput} />
              <Input type="text"  placeholder={"Địa chỉ"} name = "address" onChange = {handleOnChangeInput} />
              <Input type="text"  placeholder={"Số Điện Thoại"} name = "phone" onChange = {handleOnChangeInput} />
              <Input type="text"  placeholder={"Ghi chú"} name = "note" onChange = {handleOnChangeInput} />
            </div>
            <div className="methodPayment">
              <Radio.Group onChange={handleOnchange} value={value} >
                <Radio value={1}>Thanh toán khi nhận hàng</Radio>

                <Radio value={2}>Thanh toán trực tiếp</Radio>
              </Radio.Group>
            </div>
            <div className="checkout__infomation__button">
              <Button onclick={handleNext}>Tiếp tục</Button>
            </div>
          </div>
          }
          {step === 2 && 
              <div className="checkout__infomation">
                 <div className="checkout__infomation__title">
                    Địa chỉ giao hàng
                 </div>
                 <div className="checkout__infomation__content">
                   Họ Và Tên: {data.fullname}
                 </div>
                 <div className="checkout__infomation__content">
                   Email: {email}
                 </div>
                 <div className="checkout__infomation__content">
                   Địa chỉ: {data.address}
                 </div>
                 <div className="checkout__infomation__content">
                   Số điện thoại: {data.phone}
                 </div>
                 <div className="checkout__infomation__content">
                   Ghi chú: {data.note}
                 </div>
                 
                 <div className="checkout__infomation__content">
                   Tổng tiền: {total1}đ
                 </div>
                 <div className="checkout__infomation__content">
                   Thanh Toán khi nhận hàng
                 </div>
                 <div className="checkout__infomation__button">
                  <Button onclick={() => setStep(1)}>Quay lại</Button>
                  <Button onclick={handleOrder}>Đặt hàng</Button>
                </div>
              </div>
          }
        </Grid>
      </div>
    </Helmet>
  )
}

export default Checkout