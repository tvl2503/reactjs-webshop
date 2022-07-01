import React from 'react'
import {
    Routes,
    Route,
} from "react-router-dom";
import Home from "../pages/Home"
import Products from "../pages/Products"
import Product from "../pages/Product"
import { ABOUT_US, CART, 
    CHECKOUT, 
    CONTACT, 
    FORTGOTPASSWORD, 
    HOME_PAGE, 
    LOGIN_PAGE, 
    NOTFOUND, 
    PRODUCTS, 
    REGISTER_PAGE, 
    RESETPASSWORD } from '../constants/routes';
import Contact from '../pages/Contact';
import Cart from '../pages/Cart';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import NotFound from '../pages/NotFound';
import ForgotPassWord from '../pages/Auth/ForgotPassWord';
import ResetPassword from '../pages/Auth/ResetPassword';
import Checkout from '../pages/Checkout';
import About from '../pages/About';
import Admin from '../pages/Admin/Admin'
import OrderSucces from '../pages/OrderSucces';
const Layout = () => {
    return (
        <Routes>

            <Route path={HOME_PAGE} element={<Home />} />
            <Route index element={<Home />} />
            <Route path={PRODUCTS}  >
                <Route index = {true} element={<Products />} />
                <Route path=":id" element={<Product />} />
            </Route>
            <Route path={CONTACT} element={<Contact />} />
            <Route path={ABOUT_US} element={<About/>} />
        
            <Route path ="other" >
                <Route index = {true} element = {<NotFound /> } />
                <Route path={CART} element={<Cart />} />
                <Route path={CHECKOUT} element={<Checkout />} />
                <Route path={"order-success"} element={<OrderSucces />} />
            </Route>
            <Route path="auth">
                <Route index = {true} element = {<NotFound /> } />
                <Route path={LOGIN_PAGE} element={<Login />} />
                <Route path={REGISTER_PAGE} element={<Register />} />
                <Route path= {FORTGOTPASSWORD} element={<ForgotPassWord />} />
                <Route path = {RESETPASSWORD} element ={<ResetPassword />} />
            </Route>
            <Route path ="admin" element = {<Admin /> } />
            <Route path={NOTFOUND} element = {<NotFound /> } />

        </Routes>
    )
}

export default Layout