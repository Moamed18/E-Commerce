import axios from 'axios'
import React, { createContext, useState } from 'react'

export let ProductContext = createContext()
export default function ProductContextProvider(props) {



    const [product, setproduct] = useState([])
    const [loading, setloading] = useState(false)
  
    async function getProducts() {
      setloading(true)
      let{data}=await axios('https://route-ecommerce-app.vercel.app/api/v1/products')
      setproduct(data.data);
      setloading(false)  
    }
    async function getProductsByCate(id) {
        setloading(true)
        let{data}=await axios(`https://route-ecommerce-app.vercel.app/api/v1/products?category[in][]=${id}`)
        setproduct(data.data);
        setloading(false)
    
        
      }
      async function getProductsByBrand(id) {
        setloading(true)
        let{data}=await axios(`https://route-ecommerce-app.vercel.app/api/v1/products?brand=${id}`)
        setproduct(data.data);
        setloading(false)
    
        
      }


      const [productInfo, setproductInfo] = useState({})


      async function getProductInfo(id) {
        setloading(true)
        let {data}=await axios(`https://route-ecommerce-app.vercel.app/api/v1/products/${id}`)
        setproductInfo(data.data)
        setloading(false)
        
      }


    return (
        <ProductContext.Provider value={{getProducts,product,loading ,getProductsByCate,getProductsByBrand,getProductInfo,productInfo}}>
            {props.children}
        </ProductContext.Provider>
    )
}
