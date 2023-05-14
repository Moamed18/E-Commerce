import React, { useEffect, useState } from 'react'
import styles from './MyOrders.module.css'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import cartEmpty2 from '../../images/empty0.avif'
import { Link } from 'react-router-dom'


export default function MyOrders() {
const [orders, setorders] = useState([])
const [loading, setloading] = useState(false)
let {id}=jwtDecode(localStorage.getItem('userToken'))
async function getMyOrders() {
  setloading(true)
  let res=await axios(`https://route-ecommerce-app.vercel.app/api/v1/orders/user/${id}`)
  
  setorders(res.data)
  
  setloading(false)
  console.log(res.data);
}
useEffect(() => {

  getMyOrders()

}, [])



  return <>
  <div className='my-5 py-3'>
  {loading ? <div className='col-12 text-center my-5 py-5'>
        <i className='fa fa-spin fa-spinner fa-3x text-main'></i>
      </div> :<>
      
      {orders.length === 0 ? <div className='container  text-center '>
          <img src={cartEmpty2} alt="" className='w-50' />
          <div>
            <Link to={'/'} className='btn btn-info w-100'>Shop Now</Link>
          </div>
        </div>:
        <>
         {orders.map((ele,index)=>{
          return <div className='w-75 row mx-auto  py-3 px-2 rounded my-5 shadow justify-content-center align-items-center'>
               <div className="col-lg-6 text-center text-lg-start">
               <h3 className='fw-lighter text-muted fs-4'>Order : <span className='text-main fs-6'> {index+1}</span></h3>
                <h3 className='fw-lighter text-muted fs-4'>total Price : <span className='text-main fs-6'>{ele.totalOrderPrice} EGP</span></h3>
                <h3 className='fw-lighter text-muted fs-4'>order created at : <span  className='text-main fs-6'> {ele.createdAt}</span></h3>
                <h3 className='fw-lighter text-muted fs-4'>Payment type : <span className='text-main fs-6'>{ele.paymentMethodType}</span></h3>
               </div>
               <div className="col-lg-6 my-4">
               <div className='row'>
                {ele.cartItems.map((item)=>{
                  return <div className="col-4 text-center mx-auto ">
                   <div>
                   <img src={item.product.imageCover} className='w-50 rounded shadow' alt="" />
                    <p className='fw-bolder h6 pt-1 '>{item.product.title.split(' ').slice(0, 2).join(' ')}</p>
                    <span className='text-main'>{item.price} EGP</span>
                    <p className='text-main'>Quantity: {item.count}</p>
                   </div>
                  </div>
                })}
               </div>
               </div>
          </div>
                })}
                </>
              

}

     
 
      
      </>}
  </div>
  </>
}
