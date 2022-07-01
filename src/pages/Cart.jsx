import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'
import Helmet from '../components/Helmet'
import { useDispatch,useSelector } from 'react-redux'
import { updateProductById } from '../services/cart/cartApi'
import { toast } from 'react-toastify';
import Button from '../components/Button'

const Cart = () => {
  const {products} = useSelector(state => state.cart)
  const {total} = useSelector(state => state.cart)
  const dispatch = useDispatch()
  const handleCartPlus = (id) => {
    toast.success("Đã thêm vào giỏ hàng")
    updateProductById(dispatch, id, "plus")
  }
  const handleCartMinus = (id) => {
    toast.warning("Sản phẩm đã giảm số lượng")
    updateProductById(dispatch, id, "minus")
}
  const handleRemoveProductById = (id) => {
    toast.error("Đã xóa sản phẩm khỏi giỏ hàng")
    updateProductById(dispatch, id, "remove")
  }
  const handleOnClick = () =>{

  }
  return (
    <Helmet title="Cart">
      <Breadcrumb title={"Giỏ hàng"} />
      <div className="container">
      {products.length > 0 &&
        <div className="cart">
          <table className='table__cart'>
            <thead>
              <tr>
                <th>&nbsp;</th>
                <th>Tên Sản Phẩm</th>
                <th>Giá</th>
                <th>Số Lượng</th>
                <th>Tổng</th>
                <th>Xóa</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item, index) => (
                <tr key={index}>
                <td className='product--img'><img src={item.img} alt='' /></td>
                <td className='product--name'>{item.title}</td>
                <td className='product--price'>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}</td>
                <td className='product--quantity'>
                  <div className="cart--plus--minus">
                    <button className="minus" onClick={() => handleCartMinus(item.productId)} >
                      -
                    </button>
                    <input type="text" disabled = {true} value={item.quantity} />
                    <button className="plus" onClick={() => handleCartPlus(item.productId)}>
                      +
                    </button>
                  </div>
                </td>
                <td>
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price*item.quantity)}
                </td>
                <td className='product--remove' onClick={() => handleRemoveProductById(item.productId)} ><i className="fal fa-times"></i></td>
              </tr>
              ))}
            </tbody>
          </table>
          <div className="cart__summary">
            <div className="cart__total">
              <div className="cart__total__title"><h2>Tổng số giỏ hàng</h2></div>
              <table className='cart__total__table'>
                  <tr>
                    <td className='cart__total__table__label'>Tổng tiền hàng</td>
                    <td className='cart__total__table__amout'>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total)}</td>
                  </tr>
                  <tr>
                    <td className='cart__total__table__label'>Phí giao hàng</td>
                    <td className='cart__total__table__amout'>Được tính khi thanh toán</td>
                  </tr>
                  {/* <tr>
                    <td className='cart__total__table__label'>Tổng thanh toán</td>
                    <td className='cart__total__table__amout'>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total + (total < 200000 ? total*20/100 : 0))}</td>
                  </tr> */}
              </table>
              <Link to="/other/checkout">
                <Button onclick= {handleOnClick}> 
                  Thanh Toán
                </Button>
              </Link>

            </div>
          </div>
         
        </div>
      
      }
      {products.length === 0 &&
        <div className="cart__empty">
          <h3>Giỏ hàng của bạn hiện tại đang trống.

            <Link to="/products">Quay lại mua sắm</Link>
          </h3>
        </div>
      }
      </div>
    </Helmet>
  )
}

export default Cart