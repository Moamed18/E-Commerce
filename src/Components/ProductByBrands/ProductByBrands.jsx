import React, { useContext, useEffect, useState } from 'react'
import styles from './ProductByBrands.module.css'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { CartContext } from '../../context/CartContextProvider'
import { toast } from 'react-hot-toast'
import { ProductContext } from '../../context/ProductContextProvider'


export default function ProductByBrands(props) {
  let {id} =useParams()
  
  let{addToCart}=useContext(CartContext)
  let{getProductsByBrand,product,loading }=useContext(ProductContext)

  

  
  useEffect(() => {
    
    getProductsByBrand(id)
  }, [])
  
  return <>
  <div className='row container  mx-auto my-5'>
  <h2 className='text-center mt-5 fw-bolder '>Products</h2>

    {loading?<div className='col-12 text-center my-5 py-5'>
          <i className='fa fa-spin fa-spinner fa-3x text-main'></i>
        </div>:<>
        
        



























































































































































































        

        {product.map((item)=>{
    return <div key={item._id} className='col-md-3 col-lg-2 col-6  overflow-hidden'>
      
      <div className='product px-2 py-3'>
      <Link to={'/ProductDetails/'+item._id}>
        <img src={item.imageCover} className='w-100' alt="" />
        <span className='text-main font-sm fw-bold'>{item.category.name}</span>
        <h3 className='fw-bolder h6'>{item.title.split(' ').slice(0,2).join(' ')}</h3>
        <div className='d-flex justify-content-between'>
          <span className='text-muted'>{item.price} EGP</span>
          <span>
            <i className='fa fa-star rating-color'></i>
            {item.ratingsAverage}
          </span>
        </div>
        </Link>
        <button onClick={()=>addToCart(item._id)} className='btn bg-main w-100'>+ add</button>
      </div>
      
    </div>
    
})
        
}</>}
  
  </div>
  
  </>
}
