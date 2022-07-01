import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Helmet from '../../components/Helmet'
import Breadcrumb from '../../components/Breadcrumb'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { publicRequest } from '../../services/requesMethods';
import { isValidEmail, isValidPassword, isValidLength } from '../../utils/input';
const Register = () => {
  let navigate = useNavigate();
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [fullname, setFullName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault()
    if(password !== confirmPassword){
      toast.error("Mật khẩu không khớp nhau!!")
    }
    else if(!isValidEmail(email)){
      toast.error("Email không đúng!!")
    }
    else if(!isValidPassword(password)){
      toast.error("Mật khẩu phải có ít nhất 6 ký tự!!")

    }
    else{

        try{
            await publicRequest.post("/auth/register", {username,fullname, email, password})
            toast.success("Đăng ký thành công")
            navigate("/auth/login")
        }catch(err){
            if(err.response.data.username)
              toast.error("Tên đăng nhập đã có")
            else if(err.response.data.email)
              toast.error("Email đã có")
        }
    }
  }
  return (
    <Helmet title = "Register">
      <Breadcrumb title = {"Đăng ký"} />
      <div className="form--content">
        <div className="container">
          <form action="">
            <div className="form--title">
              <h1>Đăng ký</h1>
            </div>
            <div className="form--input">
              <Input 
                type="text" 
                placeholder='Nhập tên tài khoản' 
                onChange = {(e) => setUsername(e.target.value) } 
                validateInput={(value) => isValidLength(value, 1)}
                message="Tên đăng nhập không được để trống"
                />
            </div>
            <div className="form--input">
              <Input type="email" placeholder='Nhập Họ tên'  onChange = {(e) => setFullName(e.target.value) }  />
            </div>
            <div className="form--input">
              <Input type="email" placeholder='Nhập email'  onChange = {(e) => setEmail(e.target.value) }  />
            </div>
            
            <div className="form--input">
              <Input type = {"password"} placeholder = {"Nhập mật khẩu"} onChange = {(e) => setPassword(e.target.value) } />
            </div>
            <div className="form--input">
              <Input type = {"password"} placeholder = {"Nhập lại mật khẩu"} onChange = {(e) => setConfirmPassword(e.target.value) } />
            </div>
            <div className="form-submit">
              <Button className = "btn" onclick={handleRegister}>Đăng ký</Button>
            </div>
            <div className="form-note">
              <span>Bạn đã có tài khoản? </span>
              <Link to = "/auth/login" >Đăng nhập ngay</Link>
            </div>
          </form>
          
        </div>
      </div>
    </Helmet>
  )
}

export default Register
