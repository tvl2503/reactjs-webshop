import React from 'react'
import { Link } from 'react-router-dom'
import Grid from '../Grid'
import "./Footer.scss";
import paypal from '../../assets/svg/paypal-svgrepo-com.svg'
import visa from "../../assets/svg/visa-svgrepo-com.svg"
import mastercard from "../../assets/svg/mastercard-svgrepo-com.svg"
import discover from "../../assets/svg/discover-svgrepo-com.svg"
const logo = "https://res.cloudinary.com/fef/image/upload/v1649643019/banner/Linh_1_dbo3ie.png";

const Footer = () => {
    const useful = [
        {
            display: 'About Us',
            path: '/about-us'
        },
        {
            display: 'FAQ',
            path: '/about-us'
        },
        {
            display: 'Location',
            path: '/about-us'
        },
        {
            display: 'Affiliates',
            path: '/about-us'
        },
        {
            display: 'Contact',
            path: '/contact'
        },
    ]
    const myAccount = [
        {
            display: "My Account",
            path: '/my-account'
        },
        {
            display: "Discount",
            path: '/my-account'
        },
        {
            display: "Returns",
            path: '/my-account'
        },
        {
            display: "Orders History",
            path: '/my-account'
        },
        {
            display: "Order Tracking",
            path: '/my-account'
        },
    ]
    return (
        <div className='footer'>
            <div className="container">
                <div className="footer__top">

                    <Grid col={4} mdCol={2} smCol={1}  >
                        <div>
                            <div className="footer__top__title">
                                Contact Info
                            </div>
                            <div className="footer__content">
                                <p><i class="far fa-map-marker-alt"></i> Ngõ 68, Triều Khúc, Thanh Trì, Hà Nội</p>
                                <p><i class="far fa-envelope"></i> volinhh1804@gmail.com</p>
                                <p><i class="fal fa-phone"></i> 0392280138</p>
                            </div>
                        </div>
                        <div>
                            <div className="footer__top__title">
                                Useful Links
                            </div>
                            <div className="footer__top__content">
                                {useful.map((item, index) => (
                                    <p key={index}>
                                        <Link to={item.path}>{item.display}</Link>
                                    </p>
                                ))}
                            </div>
                        </div>
                        <div>
                            <div className="footer__top__title">
                                My Account
                            </div>
                            <div className="footer__top__content">
                                {myAccount.map((item, index) => (
                                    <p key={index}>
                                        <Link to={item.path}>{item.display}</Link>
                                    </p>
                                ))}
                            </div>
                        </div>
                        <div className="footer__top__about">
                            <p>
                                <Link to="/">
                                    <img src={logo} className="footer__top__logo" alt="" />
                                </Link>
                            </p>
                            <p>
                                Hướng đến mục tiêu mang lại niềm vui ăn mặc với mỗi ngày cho hàng triệu người tiêu dùng Việt.
                            </p>
                            <p>
                                <ul className="footer__top__social">
                                    <li>
                                        <Link to="\\facebook.com/volinh250301">
                                            <i className="fab fa-facebook"></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/">
                                            <i className="fab fa-youtube"></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/">
                                            <i className="fab fa-instagram"></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/">
                                            <i className="fab fa-google-plus-g"></i>
                                        </Link>
                                    </li>
                                </ul>
                            </p>
                        </div>
                    </Grid>
                </div>
                <div className="footer__bottom">

                        <div className="footer__bottom__text">
                            Copyright © 2022. Build with by Trần Võ Linh

                        </div>
                        <div className="footer__bottom__payment">
                            <ul className="footer__payment">
                                <li className="footer__payment__icon">
                                    <Link to ="/" >
                                    <img src={visa} alt="" />
                                    </Link>
                                </li>
                                <li className="footer__payment__icon">
                                    <Link to ="/" >
                                    <img src={mastercard} alt="" />
                                    </Link>
                                </li>
                                <li className="footer__payment__icon">
                                    <Link to ="/" >
                                    <img src={discover} alt="" />
                                    </Link>
                                </li>
                                <li className="footer__payment__icon">
                                    <Link to ="/" >
                                    <img src={paypal} alt="" />
                                    </Link>
                                </li>
                            </ul>
                        </div>       
                </div>
            </div>
        </div>
    )
}

export default Footer