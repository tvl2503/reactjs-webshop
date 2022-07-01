import { publicRequest } from "./requesMethods";
let productsData = [];
const getProducts = async () => {
    try{
        const res = await publicRequest.get("/products")
        productsData =  res.data.productsList
    }
    catch(err){
    }
}
getProducts()
export  {productsData}