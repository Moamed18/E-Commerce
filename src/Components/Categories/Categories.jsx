import React, { useContext, useEffect, useState } from 'react'
import styles from './Categories.module.css'
import { Link } from 'react-router-dom'
import { CategoryContext } from '../../context/CategoryContextProvider'


export default function Categories() {

 let {categories,loading,getCategories}=useContext(CategoryContext)
  useEffect(() => {
    
    getCategories()
  }, [])


  return <>
  
  <div className='row container mx-auto g-3 my-5 '>
  <h2 className='text-center my-5 fw-bolder '>Categories</h2>

  {loading?<div className='col-12 text-center my-5 py-5'>
          <i className='fa fa-spin fa-spinner fa-3x text-main'></i>
        </div>:categories?.map((cate)=>{
      return <div key={cate._id} className='col-md-4 col-lg-3 col-6' >
        <Link to={'/ProductByCategory/'+cate._id}>
        <div className=''>
            <img src={cate.image} className='w-100 rounded-3 ' alt="" height={300} />
            <h3 className='h5 text-main text-center py-2 fw-bolder'>{cate.name}</h3>
        </div>
        </Link>
      </div>
    })}
  
    
  </div>



  </>
}
