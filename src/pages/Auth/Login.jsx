import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb'
import Helmet from '../../components/Helmet'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { publicRequest } from '../../services/requesMethods';
import { loginFailure, loginSuccess, loginStart } from '../../redux/userRedux';
import Loading from '../../components/Loading'
const Login = () => {
  let navigate = useNavigate();
  const {currentUser, isFetching } = useSelector((state) => state.user);
  const [data, setData] = useState({
    username: "", password: ""
  })
  useEffect(() => {
    if (currentUser !== null) {
        navigate('/')
      }
  })
  const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};
  const dispatch = useDispatch()
  const handleClick = async (e) => {
    e.preventDefault();
    dispatch(loginStart())
    try{
      const res = await publicRequest.post("/auth/login/", data)
      toast.success("Đăng nhập thành công")
      dispatch(loginSuccess(res.data))

    }catch(err){
      toast.error("Tên tài khoản hoặc mật khẩu không chính xác")
      dispatch(loginFailure())
    }
  
  }

 
  return (
    <Helmet title='Đăng nhập'>
      <Breadcrumb title = {"Đăng nhập"} />
      <div className="form--content">
        <div className="container">
          <form action="">
            <div className="form--title">
              <h1>Đăng Nhập</h1>
            </div>
            <div className="form--input">
              <Input type="text" placeholder='Tên Đăng Nhập' name = 'username' onChange={handleChange} />
            </div>
            <div className="form--input">
              <Input type = {"password"} placeholder = {"Mật khẩu"} name = 'password' onChange={handleChange}  />
            </div>
            <div className="login--footer">
              <Link to = "/auth/forgotpassword">Quên mật khẩu</Link>
            </div>
            <div className="form-submit">
             {isFetching && <Loading />}
             {!isFetching && <Button disabled = {isFetching} onclick= {handleClick} >Đăng nhập</Button>}
              
              {/* <button className = "btn" disabled = {isFetching} onclick = {handleClick}>Login</button> */}
            </div>
            
            <div className="form-note">
              <span>Bạn chưa có tài khoản? </span>
              <Link to = "/auth/register" >Đăng ký ngay</Link>
            </div>
          </form>
          
        </div>
      </div>
    </Helmet>
  )
}

export default Login