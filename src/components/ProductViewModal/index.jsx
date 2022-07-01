import React, { useContext, useEffect, useState } from 'react'
import { productsData } from '../../services/productApi';
import ProductView from '../ProductView'
import "./productViewModal.scss"
import { modal } from '../../Context/Context';
const ProductViewModal = () => {
  // const dispatch = useDispatch()
  const {productId, handleRemoveProductID} =useContext(modal)
  const [product, setProduct] = useState(undefined)
  useEffect(() => {
    setProduct(productsData.find(product => product._id === productId ))
    
  }, [productId])
  const removeModel = () => {
    handleRemoveProductID()
  }
  return (
    <>
    {product && 
    <div className={`product-view__modal ${product === undefined ? '' : 'active'}`} > 
      <div className="product-view__modal__backdrop" onClick={removeModel} ></div>
      <div className="product-view__modal__content">
       {product && <ProductView product={product} onclose = {removeModel} />}
        <button onClick={removeModel} className='product-view__modal__content__close'><i className="fal fa-times"></i></button>
      </div> 
    </div>
          }
    </>
  )
}

export default ProductViewModal