import React, { useEffect, useState } from 'react'
import { useSelector} from 'react-redux'
import Input from '../../components/Input'
import { publicRequest, userRequest } from '../../services/requesMethods'
import Button from '../../components/Button'
import Table from '../../components/Table'
import { toast } from 'react-toastify'
import EditCategory from './Edit/EditCategory'

const customerTableHead = [
  '',
  'Tên Danh Mục',
  'Sửa',
  'Xóa'
]
const renderHead = (item, index) => <th key={index}>{item}</th>


const Categories = () => {

  const deleteProduct = async (id) => {
    try{
      const res = await publicRequest.delete(`/categories/${id}`,
      {
        headers: { token : `Bearer ${currentUser.accessToken}`}
       } 
      );
      getCategory()
      toast.success(res.data)
    }catch(err){
      toast.error("Không thể xóa danh mục!")
    }
  }
    const renderBody = (item, index) => (
      <tr key={index}>
          <td>{index + 1}</td>
          <td>{item.title}</td>
          <td onClick={() => setEditCategory(item)}>Sửa</td>
          <td onClick={() => deleteProduct(item._id)} ><i className="fal fa-times"></i></td>
      </tr>
    )
    const [categories, setCategories] = useState([])
    const { currentUser } = useSelector(state => state.user)
    const [category, setCategory] = useState('')
    const [editCategory, setEditCategory] = useState({})
    const [isAdd, setIsAdd] = useState(false)
    const getCategory = async () => {
    try {
      const res = await publicRequest.get("/categories", )
      setCategories(res.data)
    } catch (error) {
      alert("Looxi")
    }
  }
    useEffect(() => {
    getCategory()
    }, [])
  const handleOnchange = (e) => { 
    setCategory(e.target.value)
  }
  const handleOnClick  = async () => {
    try{ 
      const res = await publicRequest.post("/categories", {title: category},
      {
        headers: { token : `Bearer ${currentUser.accessToken}`}
       } 
      )
       toast.success("Thêm thành công")
       setIsAdd(!isAdd)
       getCategory()
    }catch(err){
      toast.error("Error")
      console.log(err);
    }
  }
    // 
  return (
    <div className='container categories'>
     
     {Object.values(editCategory).length === 0 &&  !isAdd &&
        <div className="categories-list">
        <Button onclick = {()=> setIsAdd(!isAdd)}>+</Button>
        <Table 
            headData={customerTableHead}
            renderHead={(item, index) => renderHead(item, index)}
            bodyData={categories}
            renderBody={(item, index) => renderBody(item, index)}
      />
        </div> 
      }
      {
         Object.values(editCategory).length === 0 &&   isAdd && 
        <div className="categories-add">
          <Input placeholder = "Danh mục sản phẩm" type = "text" onChange = {handleOnchange} />
          <Button onclick={handleOnClick} >Thêm</Button>
        </div>
      }
      {
         Object.values(editCategory).length !== 0 && 
          <EditCategory category = {editCategory} onClick = {() =>{ 
            setEditCategory({})
            getCategory()
          
          }
          
          } />
        }

    </div>
  )
}

export default Categories