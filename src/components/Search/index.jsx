import React, {useCallback, useEffect, useState} from 'react'
import Modal from '../UI/Modal'
import "./Search.scss"
import ProductCard from '../ProductCard'
import Grid from '../Grid'
import { productsData } from '../../services/productApi'
const SearchForm = props => {
  const productList = productsData
  const [products, setProducts] = useState([])
  const [keyword, setKeyword] = useState('')
  const handleKeyword = (e) => {
    setKeyword(e.target.value)
  }
  const handleSearch = useCallback(
    () => {
      let product = []
      if(keyword !== '')
        product = productList.filter(item => item.title.toLowerCase().includes(keyword.toLowerCase()))
      setProducts(product)
    }, [keyword]
  );
  useEffect(() => {
    handleSearch()
  }, [handleSearch])
  return (
    <Modal onclose= {props.onclose}>
        <div className="modal">
            <div className="search--top">
                <p>Tìm kiếm!</p>
                <div className="close-btn-search" onClick={props.onclose}>
                  <i className="fal fa-times"></i>
                </div>
            </div>
            <form className="form--search">
              <input type="text" placeholder='Tìm kiếm sản phẩm' onChange={handleKeyword} />
              <button type='submit'><i className="fal fa-search"></i></button> 
            </form>
          {products.length !== 0 && 
          <Grid col={5} mdCol = {3} smCol = {2} >
            {  products.map((item, index ) => (
               index < 5 && <ProductCard onclose= {props.onclose}  key={index} 
              name = {item.title} 
              price = {item.price} 
              slug = {item._id}
              img1 = {item.img1}
              img2 = {item.img2} />
          ))}
          </Grid>  
          }
          { products.length === 0 && <div className='search--desc'><h3>Không có sản phẩm được tìm thấy...!</h3></div>}
       </div>
    </Modal>
  )
}

export default SearchForm