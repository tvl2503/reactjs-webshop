
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Breadcrumb from '../../components/Breadcrumb'
import Button from '../../components/Button'
import Helmet from '../../components/Helmet'
import Input from '../../components/Input'
import { publicRequest } from '../../services/requesMethods'
import NotFound from '../NotFound'
import { toast } from 'react-toastify';

 const ResetPassword = () => {
     const [validUrl, setValidUrl] = useState(false);
     const [pass, setPass] = useState({
         password: '',
         confirmpassword: ''
     })
     const param = useParams();
     const url = `/resetpassword/${param.id}/${param.token}`;
     const handleOnChange = ({currentTarget: input}) =>{
         setPass({...pass, [input.name]: input.value}) 
     }
     useEffect(() => {
         const verifyUrl = async () => {
             try{
                await publicRequest.get(url);
                 setValidUrl(true);
             }catch(error){
                 setValidUrl(false)
             }
         }
         verifyUrl()
     }, [param, url])
     const handleOnClick = async (e) => {
         e.preventDefault();
         try{
            const res = await publicRequest.post(url, {password: pass.password})
            toast.success(res.data.message);
    
            window.location = "/auth/login"
         }catch(error){
            if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			){
                console.log(error);
                toast.error(error.response.data.message)
            }
         }
     }
  return (
    <Helmet title = "Reset password" >
        <Breadcrumb title = "Đổi mật khẩu" />
        {validUrl && <div className="container">
            <div className="resetpassword">
                <Input type = "password" onChange = {handleOnChange} name = "password" placeholder = "Nhập mật khẩu mới" />
                <Input type = "password" onChange = {handleOnChange} name = "confirmpassword" placeholder = "Nhập lại mật khẩu mới" />
                <Button onclick = {handleOnClick}>Đổi mật khẩu</Button>
            </div>
        </div>}
        {!validUrl && <NotFound />}
    </Helmet>
  )
}

export default ResetPassword