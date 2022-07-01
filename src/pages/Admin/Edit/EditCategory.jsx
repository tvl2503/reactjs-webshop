import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import Button from '../../../components/Button'
import {publicRequest } from '../../../services/requesMethods'
const EditCategory = (props) => {
    const category = props.category
    const [isLoading, setIsLoading] = useState(false)
    const { currentUser } = useSelector(state => state.user)
    const [data, setData] = useState({
        title: category.title,
      });

    const handleChange = (name) => (e) => {
        const value = e.target.value;
        setData({ ...data, [name]: value });
    };
    const handleSubmit = async () => {
        setIsLoading(true)
        try {
          const res = await publicRequest.put(`/categories/${category._id}`,
          {data: data},
          {
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
                    <input type = "text" defaultValue={category.title} onChange={handleChange("title")}  />
                    <Button onclick={handleSubmit}>Sửa</Button>
                </div>
        </div>
    )
}

export default EditCategory