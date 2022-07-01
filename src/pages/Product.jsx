import React, { useCallback, useEffect, useState } from 'react'
import Helmet from '../components/Helmet'
import Section, { SectionBody } from '../components/Section';
// import productData from '../assets/data/products';
import ProductView from '../components/ProductView';
import { useParams } from 'react-router-dom';
import { publicRequest } from '../services/requesMethods';
import Breadcrumb from '../components/Breadcrumb';
import NotFound from './NotFound';
const Product = () => {
  const { id } = useParams()
  const [product, setProduct] = useState({})
  const getProduct =  useCallback(async () =>{
      try {
          const res = await publicRequest.get("/products/find/" + id)
          setProduct(res.data)
        }
        catch (err) {
          console.log(err)
        }
  }, [])
  useEffect(() => {
    getProduct()
  }, [getProduct])


  return (
    <Helmet title={product.title ? product.title : '' } className="product">
      <Breadcrumb title='Chi tiết sản phẩm' />
      <div className="container">
        <Section>
          <SectionBody>
            {Object.values(product).length === 0 && <NotFound />}
            {Object.values(product).length !== 0 && <ProductView product = {product} />}
          
          </SectionBody>
        </Section>
      </div>
    </Helmet>
  )
}

export default Product