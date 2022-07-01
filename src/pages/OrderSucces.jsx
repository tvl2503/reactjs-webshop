import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import Table from '../components/Table'
import numberWithCommas from '../utils/numberWithCommas'
const customerTableHead = [
    '',
    'img',
    'Tên',
    'Số Lượng',
    'Giá ',
  ]
  const renderHead = (item, index) => <th key={index}>{item}</th>

  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{index+1}</td>
      <td><img src={item.img} /></td>
      <td>{item.title}</td>
      <td>{item.quantity}</td>
      <td>
      {numberWithCommas(item.price)}
      </td>
    </tr>
  )
const OrderSucces = () => {
    const {order} = useSelector(state => state.order)
    console.log(order);
  return (
    <div className="container">
        <div className="order--success">
            <div className="title">
                Đặt hàng thành công
            </div>
            <div className="description">
                Cảm ơn quý khách. Chúng tôi sẽ gửi hàng cho bạn.
            </div>
            <div className="infomation">
                <div className="name">
                    Tên khách hàng: {order.name}
                </div>
                <div className="name">
                    Số điện thoại: {order.data.phone}
                </div>
            </div>
            <Table
            headData={customerTableHead}
            renderHead={(item, index) => renderHead(item, index)}
            bodyData={order.data.products}
            renderBody={(item, index) => renderBody(item, index)} />
            <div className="content">
              <div className="name">
                    Ghi chú: {order.data.note}
                </div>
                <div className="name">
                    Tổng thanh toán: {numberWithCommas(order.data.amount)}
                </div>
                <div className="name"> Trạng thái: {order.data.status === "pending" ? 'Chưa thanh toán' : 'Đã thanh toán'}</div>
                <div className="name">{order.data.status === "pending" && <p>Vui lòng thanh toán khi nhận hàng</p>}</div>
            </div>
            <Link to ="/"><Button>Quay về trang chủ</Button> </Link>
        </div>
    </div>
  )
}

export default OrderSucces