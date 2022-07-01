import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Input from '../../components/Input'
import Button from '../../components/Button';
import { toast } from 'react-toastify';
import { publicRequest, userRequest } from '../../services/requesMethods';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../components/Loading';
import Table from '../../components/Table';
import EditProduct from './Edit/EditProduct';
import { isNumber } from '../../utils/input';
const customerTableHead = [
  '',
  'img',
  'Tên',
  'Danh mục',
  'Giá bán',
  'Giá gốc',
  'Sửa',
  'Xóa'
]
const renderHead = (item, index) => <th key={index}>{item}</th>

const Products = () => {
  const deleteProduct = async (id) => {
    try{
      const res = await publicRequest.delete(`/products/${id}`,{
        headers: { token : `Bearer ${currentUser.accessToken}`}
       } 
      );
      getProducts()
      toast.success(res.data)
    }catch(err){
      console.log(err);
    }
  }

  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{index+1}</td>
      <td><img src={item.img1} /></td>
      <td>{item.title}</td>
      <td>{item.category.title}</td>
      <td>{item.price}</td>
      <td>{item.saleprice}</td>
      <td onClick={() => setEditProduct(item)}>Sửa</td>
      <td onClick={() => deleteProduct(item._id)}  ><i className="fal fa-times"></i></td>
    </tr>
  )
  const { currentUser } = useSelector(state => state.user)
  const [isAdd, setIsAdd] = useState(false)
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [editProduct, setEditProduct] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "",
    image: [],
    price: "",
    saleprice: ""
  });

  const getProducts = async () => {
    try {
      const res = await publicRequest.get("/products")
      setProducts(res.data.productsList)
    }
    catch (err) {
    }
  }
  const getCategory = async () => {
    try {
      const res = await publicRequest.get("/categories")
      setCategories(res.data)
      setData({ ...data, category: res.data[0]._id });
    } catch (error) {
      alert("Looxi")
    }
  }
  useEffect(() => {
    getProducts()
    getCategory()
  }, [])
  const handleChange = (name) => (e) => {
    const value = name === "image" ? e.target.files : e.target.value;
    setData({ ...data, [name]: value });
  };
  const handleSubmit = async () => {
    setIsLoading(true)
    if(isNumber(Number(data.price)) && isNumber(Number(data.saleprice))){
      try {
        let formData = new FormData();
        formData.append("image", data.image[0]);
        formData.append("image", data.image[1]);
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("category", data.category);
        formData.append("price", Number(data.price));
        formData.append("saleprice", Number(data.saleprice));
  
        const res = await publicRequest.post(`/products`,
          formData,
          {
            headers: { token : `Bearer ${currentUser.accessToken}`}
           } 
        );
        toast.success(res.data.message)
        getProducts()
        setIsLoading(false)
        setIsAdd(!isAdd)
      } catch (error) {
        toast.error("Error")
        setIsLoading(false)
      }
    }
    else{
      toast.error("Giá cả phải là số!!")
      setIsLoading(false)
    }
  };
  // console.log(data)
  return (
    <div>

        {Object.values(editProduct).length === 0 && !isAdd && <div className="list--products">
          <Button onclick = {()=> setIsAdd(!isAdd)}>+</Button>
          <Table
            headData={customerTableHead}
            renderHead={(item, index) => renderHead(item, index)}
            bodyData={products}
            renderBody={(item, index) => renderBody(item, index)}
          />
        </div>}
        {
          Object.values(editProduct).length === 0 && isAdd && 
        <div className='container addproduct'>
          <Input type="text" placeholder='Tên sản Phẩm' onChange={handleChange("title")} />
          <Input type="text" placeholder='Mô tả' onChange={handleChange("description")} />
          <select onChange={handleChange("category")}>
            {categories.length > 0 && categories.map((item, index) => (
              <option key={index} value={item._id} >{item.title}</option>
            ))}
          </select>

          <Input type="file" placeholder='image' onChange={handleChange("image")} multiple />
          <Input type="text" placeholder='Giá bán' onChange={handleChange("price")} />
          <Input type="text" placeholder='Giá gốc' onChange={handleChange("saleprice")} />

          {!isLoading && <Button onclick={handleSubmit}>Thêm</Button>}
          {isLoading && <Loading />}

        </div>
        }
        {
         Object.values(editProduct).length !== 0 && 
          <EditProduct products = {editProduct} onClick = {() =>{ 
            setEditProduct({})
            getProducts()
          
          }
          
          } />
        }


    </div>
  )
}

export default Products