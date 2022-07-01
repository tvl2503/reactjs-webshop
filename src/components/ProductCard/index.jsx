import React, {useContext} from 'react';
import {Link} from "react-router-dom"
import PropTypes from 'prop-types';
import "./ProductCard.scss";
import numberWithCommas from '../../utils/numberWithCommas';

import { modal } from '../../Context/Context';
const ProductCard = props => {
    const { handleSetProductID} = useContext(modal)
    const handleClick = (id) => {
        handleSetProductID(id)
    }
  return (
    <div className='product-card'>
        <div className="product-card__img">
            <img src={props.img1} alt=""/>
            <img src={props.img2} alt=""/>
            <ul className='action'>
                <div className='action__item' onClick={() => handleClick(props.slug)}  >
                    <i className="fal fa-cart-plus"></i>
                </div>
                <Link className='action__item' to={`/products/${props.slug}`} onClick={props.onclose} >
                    <i className="fal fa-eye"></i>
                </Link>
            </ul>
        </div>
        <h3 className="product-card__name">{props.name}</h3>
        <div className="product-card__price">
        {numberWithCommas(props.price)}
           
        </div>
    </div>
  )
}

ProductCard.propTypes = {
    img1: PropTypes.string.isRequired,
    img2: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired

}

export default ProductCard