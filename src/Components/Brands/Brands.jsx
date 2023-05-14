import React, { useContext, useEffect, useState } from 'react'
import styles from './Brands.module.css'
import { Link } from 'react-router-dom'
import { BrandsContext } from '../../context/BrandsContextProvider'


export default function Brands() {
  let{brands,loading,getbrands}=useContext(BrandsContext)
  useEffect(() => {
    
    getbrands()
  }, [])


  return <>
  


  <div className='row container mx-auto g-3 my-5'>
  <h2 className='text-center mt-5 fw-bolder '>Brands</h2>

    {loading?<div className='col-12 text-center my-5 py-5'>
          <i className='fa fa-spin fa-spinner fa-3x text-main'></i>
        </div>:brands?.map((brand)=>{
      return <div key={brand._id} className='col-md-4 col-lg-3 col-6 ' >
        <Link to={'/ProductByBrands/'+brand._id}>
        <div className=' '>
            <img src={brand.image} className='w-100 rounded-circle' alt="" height={300} />
            <h3 className='h5 text-main text-center py-2 fw-bolder'>{brand.name}</h3>
        </div>
        </Link>
      </div>
    })}
    
  </div>



  </>
}
