import { userRequest, publicRequest } from "../requesMethods";
import { getProductsToCart,removeCart } from "../../redux/cart/cartSlice";
export const addtoCart = async (dispatch, product) => {
    try {
        const res = await publicRequest.post("/carts", {products: product}, {
            headers: {token: `Bearer ${localStorage.getItem('token')}`}
        }
    
        )
        dispatch(getProductsToCart(res.data)) 
    } catch (err) {
        console.log(err)
    }
}
export const gettoCart = async (dispatch) => {
    try{
        const res = await publicRequest.get(`/carts/`, {
            headers: {token: `Bearer ${localStorage.getItem('token')}`}
        })
        dispatch(getProductsToCart(res.data))
    }catch(err){
        dispatch(removeCart());
    }
}
export const updateProductById = async (dispatch, idProduct, type) => {
    try{
        const res = await publicRequest.put(`/carts/${idProduct}`,{type: type}, {
            headers: {token: `Bearer ${localStorage.getItem('token')}`}
        })
        dispatch(getProductsToCart(res.data))
    }catch(err){
        console.log(err)
    }
}