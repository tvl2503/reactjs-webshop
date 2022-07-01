import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import Button from '../../../components/Button'
import { publicRequest, userRequest } from '../../../services/requesMethods'
const EditProduct = (props) => {
    const product = props.products
    const [isLoading, setIsLoading] = useState(false)
    const { currentUser } = useSelector(state => state.user)
    const [categories, setCategories] = useState([])
    const [data, setData] = useState({
        title: product.title,
        description: product.description,
        category: product.category._id,
        price: product.price,
        saleprice: product.saleprice
      });
    const getCategory = async () => {
        try {
          const res = await publicRequest.get("/categories")
          setCategories(res.data)
          setData({ ...data, category: res.data[0]._id });
        } catch (error) {
          alert("Looxi")
        }
      }
      const handleChange = (name) => (e) => {
        const value = e.target.value;
        setData({ ...data, [name]: value });
      };
      useEffect(() => {
        getCategory()
      
      }, [])
    
      const handleSubmit = async () => {
        setIsLoading(true)
        console.log(data);
        try {
          const res = await publicRequest.put(`/products/${product._id}`,
          {data: data}, {
            headers: { token : `Bearer ${currentUser.accessToken}`}
           }
        );
          toast.success("Sửa sản phẩm thành công")
          props.onClick()
        } catch (error) {
          toast.error("Đã có lỗi xảy ra")
          setIsLoading(false)
        }
      };
    return (
        <div className='container'>
                <div className="edit">
                    <input type = "text" defaultValue={product.title} onChange={handleChange("title")}  />
                    <input type = "text" defaultValue={product.description} onChange={handleChange("description")}   />
                  
                    <select  onChange={handleChange("category")}>
                        {categories.length > 0 && categories.map((item, index) => (
                        <option key={index} value={item._id} >{item.title}</option>
                        ))}
                    </select>
                    <input type = "text" defaultValue={product.price} onChange={handleChange("price")}  />
                    <input type = "text" defaultValue={product.saleprice} onChange={handleChange("saleprice")}  />
                    <Button onclick={handleSubmit}>Sửa</Button>
                </div>
        </div>
    )
}

export default EditProduct