import { createSlice } from "@reduxjs/toolkit";

export const cartSlice =  createSlice({
    name: 'cart',
    initialState: {
        products: [],
        quantity: 0,
        total: 0
    },
    reducers: {
        getProductsToCart: (state, action) => {
            state.products = action.payload.products
            state.quantity = action.payload.products.length
            state.total = action.payload.total
        },
        removeCart: (state) => {
            state.products = []
            state.quantity = 0
            state.total = 0
        } 
    }
})
export const {getProductsToCart, removeCart} = cartSlice.actions
export default cartSlice.reducer