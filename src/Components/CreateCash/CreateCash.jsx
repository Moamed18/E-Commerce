import React, { useState } from 'react'
import styles from './CreateCash.module.css'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useContext } from 'react'
import { CartContext } from '../../context/CartContextProvider'

export default function CreateCash() {
  let{setnumberCart}=useContext(CartContext)
let navigate =useNavigate()
let{id}=useParams()
const [loading, setloading] = useState(false)

let headers = {
  token: localStorage.getItem('userToken')
}

 async function handleCash(values) {
  setloading(true)
    let {data}=await axios.post(`https://route-ecommerce-app.vercel.app/api/v1/orders/${id}`,{values},{headers})
    console.log(data);
    if (data.status === "success") {
      navigate('/MyOrders')
      setloading(false)
      setnumberCart(0)
    }
  }

  let validationSchema = Yup.object({
    details: Yup.string().required('details is required'),
    phone: Yup.string().required('phone is required').matches(/^01[0125][0-9]{8}$/, 'phone must be egyption phone number'),
    city: Yup.string().required('city is required')

  })

  let formik = useFormik({
    initialValues:{
      shippingAddress:{
          details: "",
          phone: "",
          city: ""
          }
  }
  ,
  onSubmit:handleCash,
  validationSchema
  })
  return <>
  <div className='container my-5 py-5'>
  <form onSubmit={formik.handleSubmit} className='w-100 my-5 mx-auto my-5 shadow-lg p-4 rounded-4 bg-secondary-subtle  text-center'>


    
<label htmlFor="details">details :</label>
<input className='form-control mb-2' type="text" name='details' id='details' value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur} />
{formik.errors.details && formik.touched.details ? <div className='alert alert-danger'>{formik.errors.details}</div> : null}


<label htmlFor="phone">phone :</label>
<input className='form-control mb-2' type="tel" name='phone' id='phone' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} />
{formik.errors.phone && formik.touched.phone ? <div className='alert alert-danger'>{formik.errors.phone}</div> : null}

<label htmlFor="city">city :</label>
<input className='form-control mb-2' type="text" name='city' id='city' value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} />
{formik.errors.city && formik.touched.city ? <div className='alert alert-danger'>{formik.errors.city}</div> : null}


{loading ?
  <button type='button' className='btn bg-main text-white my-2 mx-auto'><i className='fa fa-spinner fa-spin'></i></button>
  : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn mx-auto bg-main text-white my-2'>Submet</button>
}  </form>
  </div>
</>
}
