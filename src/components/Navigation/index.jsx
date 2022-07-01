import React, { useRef, useEffect } from 'react'
import { Link, useLocation, useNavigate, } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Button from '../Button';
import { logout } from '../../redux/userRedux';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { removeCart } from "../../redux/cart/cartSlice"
import { gettoCart } from '../../services/cart/cartApi';
import 'react-toastify/dist/ReactToastify.css';
const logo = "https://res.cloudinary.com/fef/image/upload/v1649643019/banner/Linh_1_dbo3ie.png";

const mainNav = [
    {
        display: 'Trang Chủ',
        path: '/'
    },
    {
        display: 'Sản Phẩm',
        path: '/products'
    },
    {
        display: 'Giới Thiệu',
        path: '/about-us'
    },
    {
        display: 'Liên Hệ',
        path: '/contact'
    }
]
const Navigation = (props) => {
    let navigate = useNavigate();
    const { currentUser } = useSelector(state => state.user)
    const headerRef = useRef(null)
    const dispatch = useDispatch();
    const menuLeft = useRef(null)
    const menuToggle = () => menuLeft.current.classList.toggle('active')
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (document.body.scrollTop > 67 || document.documentElement.scrollTop > 67) {
                headerRef.current.classList.add("shrink")
            }
            else {
                headerRef.current.classList.remove("shrink")
            }
        })
        if (currentUser) {
            localStorage.setItem('token', currentUser.accessToken);
            gettoCart(dispatch)
        }
        else {
            dispatch(removeCart())
        }
    }, [currentUser])
    const { quantity } = useSelector(state => state.cart)
    const { pathname } = useLocation()

    const activeNav = mainNav.findIndex(e => e.path === pathname)

    const handleLogout = (e) => {
        toast.success("Đăng xuất thành công")
        localStorage.removeItem('token');
        dispatch(logout())
        navigate('/auth/login')
    }
    return (
        <div className='header' ref={headerRef}>
            <div className="container">

                <div className="header__menu">

                    <div className="header__menu__mobile-toggle" onClick={menuToggle}>
                        <i className="far fa-bars"></i>
                    </div>
                    <div className="header__logo">
                        <Link to="/">
                            <img src={logo} alt="logo" />
                        </Link>
                    </div>
                    <div className="header__menu__left" ref={menuLeft} >
                        <div className="header__menu__left__close" onClick={menuToggle}>
                            <i className="far fa-angle-left"></i>
                        </div>
                        {currentUser &&

                            <div className="header__menu__left__user">
                                <Link to="/">Hi, {currentUser.username}</Link>
                                <p>Welcome back</p>
                            </div>

                        }
                        {
                            mainNav.map((item, index) => (
                                <div key={index}
                                    className={`header__menu__item  header__menu__left__item ${index === activeNav ? 'active' : ''} `}
                                    onClick={menuToggle} >
                                    <Link to={item.path}>
                                        <span>{item.display}</span>
                                    </Link>
                                </div>
                            ))
                        }
                        {!currentUser &&
                            <div className="auth-options" onClick={menuToggle}>
                                <p class="f-18 weight-600">Tài khoản của tôi</p>
                                <Link to="/auth/login"><Button className="btn-black">Đăng ký</Button></Link>
                                <Link to="/auth/register"><Button className="btn-outlined">Đăng nhập</Button></Link>
                            </div>
                        }
                        {/* {currentUser  &&
                         <div onClick={handleLogout} > <i class="fal fa-sign-out"></i>Đăng xuất</div>
                        
                        } */}
                    </div>
                    <div className="header__menu__right">
                        <div className="header__menu__item header__menu__right__item">
                            <i className="fal fa-search" onClick={props.onShowSearch} ></i>
                        </div>
                        <div className="header__menu__item header__menu__right__item">
                            <Link to="/other/cart">
                                <div className="header__menu__right__item__cart">

                                    <i className="fal fa-cart-plus"></i>
                                    {quantity > 0 &&
                                        <div className="header__menu__right__item__cart__quantity">
                                            {quantity}
                                        </div>
                                    }
                                </div>
                            </Link>
                        </div>
                        <div className="header__menu__item header__menu__right__item header__menu__right__user">
                            {currentUser === null && <Link to="/auth/login">Đăng nhập</Link>}
                            {currentUser &&
                                <div className='header__menu__right__user__item'>
                                    <div className="user">
                                        <img src={currentUser.img} alt="" />
                                    </div>
                                    <div className='user-list'>
                                        <Link to="/profile" className="user-list__item user-list__top">
                                            <div className="user-list__item__img">
                                                {/* <i class="fal fa-user"></i> */}
                                                <div className="avt">
                                                    <img src={currentUser.img} alt="" />
                                                </div>
                                            </div>
                                            <div className="user-list__item__title">
                                                <h3>{currentUser.username}</h3>
                                                <p>{currentUser.email}</p>
                                            </div>

                                        </Link>
                                        {currentUser.isAdmin &&
                                            <div>
                                                <div className="user-list__item">
                                                    <Link to="/admin">Quản lý</Link>

                                                </div>
                                               
                                            </div>


                                        }
                                        <div className="user-list__item">
                                            <Link to="/other/cart">Giỏ hàng của tôi</Link>
                                        </div>
                                        <div className="user-list__item" onClick={handleLogout}>
                                            <div > <i class="fal fa-sign-out"></i>Đăng xuất</div>
                                        </div>

                                    </div>

                                </div>
                            }
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}


export default Navigation