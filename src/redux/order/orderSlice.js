import { createSlice } from "@reduxjs/toolkit";

export const orderSlice =  createSlice({
    name: 'cart',
    initialState: {
        order: []
        
    },
    reducers: {
        getProductsToOrder: (state, action) => {
            state.order = action.payload
        },
        removeOrder: (state) => {
        } 
    }
})
export const {getProductsToOrder, removeOrder} = orderSlice.actions
export default orderSlice.reducer