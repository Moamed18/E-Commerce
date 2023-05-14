import axios from 'axios'
import React, { createContext, useState } from 'react'
export let CategoryContext=createContext()

export default function CategoryContextProvider(props) {

    const [categories, setcategories] = useState([])
    const [loading, setloading] = useState(false)
    
      
    async function getCategories() {
      setloading(true)
      let{data}=await axios('https://route-ecommerce-app.vercel.app/api/v1/categories')
      setcategories(data.data);
      setloading(false)
    }


  return (
    <CategoryContext.Provider value={{categories,loading,getCategories}}>
{props.children}
    </CategoryContext.Provider>
  )
}
