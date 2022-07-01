import React, { useState } from 'react'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { SectionTitle } from '../../components/Section'
import Helmet from '../../components/Helmet'
import Breadcrumb from '../../components/Breadcrumb'
import { isValidEmail } from '../../utils/input'
import { toast } from 'react-toastify';
import { publicRequest } from '../../services/requesMethods'
import Loading from '../../components/Loading'
const ForgotPassWord = () => {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState(false)
    const [loading, setLoading] = useState(false)
    const handleChange = (e) => {
        setEmail(e.target.value)
    }
    const handleClick = async () => {
        setLoading(true)
        if(!isValidEmail(email)){
            setLoading(false)
            toast.error("Vui lòng nhập lại email!!")
            setEmail('')
        }
        else{
            try{
                const res = await publicRequest.post("/resetpassword", {email: email})
                setLoading(false)
                setMessage(true)
            }catch(err){
                setLoading(false)
                if (
                    err.response &&
                    err.response.status >= 400 &&
                    err.response.status <= 500
                ){
                    console.log(err);
                    toast.error(err.response.data.message)
                }
            }
        }
    }
  return (
      <Helmet title = "Quên mật khẩu" >
        <Breadcrumb title ="Quên mật khẩu" />  
        <div className='container '>
           {!message &&
           <div className="forgotpassword">
                <SectionTitle >Quên mật khẩu</SectionTitle>
                <Input type = "email" placeholder ="Nhập email"   onChange ={handleChange} />
                {!loading && <Button onclick={handleClick} >Quên mật khẩu</Button>}
                {loading && <Loading /> }
            </div>
           } 
           {message && 
            <div className="message-forgot">
                <SectionTitle >Vui lòng truy cập vào email để xác nhận</SectionTitle>
            </div>
           }
           
            
        </div>
      </Helmet>
  )
}

export default ForgotPassWord