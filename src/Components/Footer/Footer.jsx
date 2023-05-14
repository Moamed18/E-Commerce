import React from 'react'
import styles from './Footer.module.css'
export default function Footer() {
  return <>
  <div className='bg-light p-3 '>
    <div className='container'>
      
    <h2 className='my-2'>Get the FreashChart app </h2>
    <p className='text-muted'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis, modi?</p>
    <div className='row my-3'>
    <div className='col-md-9'>
    <input type="email"  placeholder='Email' className='form-control form-control-sm w-100'/>

    </div>
    <div className="col-md-3">
      <button className='btn btn-sm my-md-0 my-3 bg-main text-white w-100'>Share App Link</button>
      </div>  
      </div>
    </div>
      
  </div>
  </>
}
