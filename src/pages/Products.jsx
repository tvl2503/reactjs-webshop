import React, { useState, useCallback, useEffect } from 'react'
import Breadcrumb from '../components/Breadcrumb'
import Helmet from '../components/Helmet'
import ProductList from '../components/ProductList'
import numberWithCommas from '../utils/numberWithCommas'
import { Select, Slider, Radio } from 'antd';
import 'antd/dist/antd.css';
import { publicRequest } from '../services/requesMethods'
import { Pagination } from 'antd';

const { Option } = Select;
const Products = () => {
  const [pageNumber, setPageNumber] = useState(1)
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState([])
  const [products, setProducts] = useState([])
  const [rangePrice, setRangePrice] = useState([0, 1000000])
  const [radioSort, setRadioSort] = useState(1); 
  const getCategory = async () => {
    try {
      const res = await publicRequest.get("/categories")
      setCategories(res.data)
    } catch (error) {
      alert("Looxi")
    }
  } 
  const getProducts = async (key, sort, cate) => {
    try{
      const res = await publicRequest(
        `products?page=${pageNumber}${key? "&key=" + key: ''}${"&priceMin=" + rangePrice[0] + "&priceMax=" + rangePrice[1]}${sort? "&sort=" + sort: ''}${cate? "&cate=" + cate: ''}`
        )
      const {totalPages,productsList } = res.data
      setProducts(productsList)
      setNumberOfPages(totalPages)
    }catch(err){

    }
  }
  const handleChange = (value) => {
    setCategory(value)
  }
  const handleChangeRange = (value) => {
    setRangePrice(value)
  }
  const handleChangeSort = e => { 
    setRadioSort(e.target.value)
  }
  const updateProducts = useCallback(() => {
    let sort, key, cate;
    if (category !== "Category") {
      cate = category
    }
    
    if(radioSort === 1){
      sort = 1
      key = "price"
    }
    else if(radioSort === 2){
      sort = -1
      key = "price"

    }
    getProducts(key, sort, cate);
  }, [rangePrice, category, radioSort,pageNumber])
  useEffect(() => {
    updateProducts()
    getCategory()
  }, [updateProducts])
  
  return (
    <Helmet title='Sản phẩm'>
      <Breadcrumb title={'Sản Phẩm'} />
      <div className="container">
        <div className="catalog">
          <div className="catalog__filter">
            <Select defaultValue="Category" style={{ width: 250 }} onChange={handleChange}>
              <Option value="Category" >Danh mục sản phẩm </Option>
              {categories.map((item, index) => (
                <Option key={index} value={item._id} >{item.title}</Option>
              ))}
            </Select>
            <div className="slider">
              <div className="slider__title"> <h3>Lọc theo giá</h3></div>
              <Slider range max={1000000} step={10000} defaultValue={rangePrice} disabled={false} onChange={handleChangeRange} />
              <div className="slider__des">
                {numberWithCommas(rangePrice[0])} đến {numberWithCommas(rangePrice[1])}
              </div>
            </div>
            <div className="radio__sort">
              <div className="radio__sort__title">
                <h3>Sắp xếp theo giá </h3>
              </div>
              <Radio.Group value={radioSort} onChange={handleChangeSort}>
                <Radio value={1}>Tăng Dần</Radio>
                <Radio value={2}>Giảm Dần</Radio>
            </Radio.Group>
            </div>
            
          </div>
          <ProductList products={products} />
          
        </div>
        <div className="pagination">
            <Pagination defaultCurrent = {1} total={numberOfPages > 0 ? numberOfPages*10 : 1}  onChange={(title) => setPageNumber(title)} />   
        </div>
      </div>
    </Helmet>
  )
}

export default Products 