import React from 'react'
import Contact from '../../pages/Contact'
import Home from '../../pages/Home'
import Products from '../../pages/Products'
import About from '../../pages/About'
import Cart from '../../pages/Cart'
import { 
  HOME_PAGE, 
  ABOUT_US, 
  PRODUCT,
  PRODUCTS, 
  CONTACT, 
  CART, 
  LOGIN_PAGE, 
  REGISTER_PAGE,
  NOTFOUND,
  CHECKOUT,
  ADDPRODUCT,
  FORTGOTPASSWORD,
  RESETPASSWORD,
  CATEGORIES} from '../../constants/routes'
import Login from '../../pages/Auth/Login'
import Register from '../../pages/Auth/Register'
import Product from '../../pages/Product'
import NotFound from '../../pages/NotFound'
import Checkout from '../../pages/Checkout'

import ForgotPassWord from '../../pages/Auth/ForgotPassWord'
import ResetPassword from '../../pages/Auth/ResetPassword'
import Categories from '../../pages/Admin/Categories'
const Layout = [
  {
    path: HOME_PAGE,
    element : <Home/>
  },
  {
    path: PRODUCTS ,
    element :<Products/>
  },
  {
    path: PRODUCT ,
    element :<Product/>
  },
  {
    path: ABOUT_US ,
    element :<About/>
  },
  {
    path: CONTACT ,
    element :<Contact/>
  },
  {
      path: CART,
      element: <Cart />
  },
  {
    path: LOGIN_PAGE,
      element: <Login />
  },
  {
    path: REGISTER_PAGE,
    element: <Register />
  },
  {
    path: NOTFOUND,
    element: <NotFound />
  },

  {
    path: CHECKOUT,
    element: <Checkout />
  },
  {
    path: FORTGOTPASSWORD,
    element: <ForgotPassWord />
  },
  {
    path: RESETPASSWORD,
    element: <ResetPassword />
  },
  {
    path: CATEGORIES,
    element: <Categories />
  }

]

export default Layout