import axios from 'axios'
import React, { createContext, useState } from 'react'
export let BrandsContext =createContext()

export default function BrandsContextProvider(props) {

    const [brands, setbrands] = useState([])
  const [loading, setloading] = useState(false)

  async function getbrands() {
    setloading(true)
    let{data}=await axios('https://route-ecommerce-app.vercel.app/api/v1/brands')
    setbrands(data.data);
    setloading(false)
  }


  return (
   <BrandsContext.Provider value={{brands,loading,getbrands}}>
   {props.children}
   </BrandsContext.Provider>
  )
}
