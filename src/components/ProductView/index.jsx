import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'
import numberWithCommas from '../../utils/numberWithCommas'
import Grid from '../Grid';
import Button from '../Button'
import { useDispatch, useSelector } from 'react-redux';
import { addtoCart } from '../../services/cart/cartApi';
import { toast } from 'react-toastify';

const ProductView = props => {
  const product = props.product;
  let navigate = useNavigate();
  const {currentUser} = useSelector(state => state.user)
  const [img, setImg] = useState(product.img1)
  const [quantity, setQuantity] = useState(1)
  const dispatch = useDispatch()
  const updateQuantity = (type) => {
    if (type === 'plus') {
      setQuantity(quantity + 1 > 1000 ? quantity : quantity + 1)
    }
    else if (type === 'minus') {
      setQuantity(quantity - 1 < 1 ? 1 : quantity - 1)
    }
  }
  useEffect(() => {
    setImg(product.img1)
    setQuantity(1)
  }, [product])

  const addProductToCart = () => {
    if(props.onclose){
      props.onclose()
    }
    if (currentUser === null) {
      navigate('/auth/login')
    }
    else{
      toast.success("Đã thêm vào giỏ hàng")
      addtoCart(dispatch, {"productId": product._id,"title": product.title, "img" : product.img1 , "quantity": quantity, "price": product.price})
    }
  }
  return (
    <div className="product">
      <Grid col={2} smCol={1} gap={20}>

        <div className="product__images">
          <div className="product__images__list">

            <div className={`product__images__list__item ${img === product.image01 ? 'action' : ''}`} onClick={() => setImg(product.img1)}>
              <img src={product.img1} alt="" />
            </div>

            <div className={`product__images__list__item ${img === product.image02 ? 'action' : ''}`} onClick={() => setImg(product.img2)}>
              <img src={product.img2} alt="" />
            </div>
          </div>
          <div className="product__images__main">
            <img src={img} alt="" />
          </div>

        </div>
        <div className="product__info">
          <div className="product__info__title">
            {product.title}
          </div>
          <div className="product__info__description">
            {product.description}
          </div>
          <div className="product__info__item">
              <span className="product__info__item__price">
                {numberWithCommas(Number(product.price))}
              </span>
              <del>{numberWithCommas(Number(product.saleprice))}</del>
              <span className='on-sale'>{Math.ceil(100*(1-product.price/product.saleprice))}% Off</span>
          </div>
          <div className="product__info__item">
            <ul className="product__info__item__policy" >
              <li>
                <i className="fal fa-shield"></i> 
                <p>Bảo hành trong 1 năm</p> 
              </li>
              <li>
                <i className="fas fa-undo-alt"></i>
                <p>Hoàn trả trong 30 ngày</p> 
              </li>

            </ul>
          </div>
          <div className="product__info__item">
            <div className="product__info__item__title">
              Số lượng
            </div>
            <div className="product__info__item__quantity">
              <div className="product__info__item__quantity__btn" onClick={() => updateQuantity("minus")}  >
                <i className="far fa-minus"></i>
              </div>
              <div className="product__info__item__quantity__input">
                <input type="text" value={quantity} onChange={e => setQuantity(Number(e.target.value))} />
              </div>
              <div className="product__info__item__quantity__btn" onClick={() => updateQuantity("plus")}>
                <i className="far fa-plus"></i>
              </div>
            </div>
          </div>
          <div className="product__info__item">
            <Button onclick={addProductToCart}>Thêm vào giỏ hàng</Button>
          </div>
        </div>
      </Grid>
    </div>
  )
}

ProductView.propTypes = {
  product: PropTypes.object.isRequired
}

export default ProductView