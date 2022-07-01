import React from 'react'
import Grid from '../Grid'
import ProductCard from '../ProductCard'
import Loading from '../Loading'
const ProductList = (props) => {
    const products = props.products;
  return (
    <div className='container'>
            <Grid col={4} mdCol = {2} smCol = {1} >
                {products.map((item, index) => (
                    <ProductCard key={index} 
                    name = {item.title} 
                    price = {item.price} 
                    slug = {item._id}
                     img1 = {item.img1}
                     img2 = {item.img2}
                      />
                ))}
            </Grid>
            {products.length === 0 && <Loading />}
    </div>
  )
}

export default ProductList