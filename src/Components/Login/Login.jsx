import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthenticationContext } from '../../context/AuthenticationContextProvider'

export default function Login() {
  let{formik2,messageErr2,loading,LoginDone}=useContext(AuthenticationContext)
  let navigate=useNavigate()
  if(LoginDone){
    navigate('/')

  }


  return <>
    <div className='container my-5 py-5'>
    <form onSubmit={formik2.handleSubmit} className='w-100 mx-auto  shadow-lg p-4 rounded-4 bg-secondary-subtle  text-center my-5'>

{messageErr2 !== '' ? <div className='alert alert-danger'>{messageErr2}</div> : null}


<label htmlFor="email">Email :</label>
<input className='form-control mb-2' type="email" name='email' id='email' value={formik2.values.email} onChange={formik2.handleChange} onBlur={formik2.handleBlur} />
{formik2.errors.email && formik2.touched.email ? <div className='alert alert-danger'>{formik2.errors.email}</div> : null}


<label htmlFor="password">Password :</label>
<input className='form-control mb-2' type="password" name='password' id='password' value={formik2.values.password} onChange={formik2.handleChange} onBlur={formik2.handleBlur} />
{formik2.errors.password && formik2.touched.password ? <div className='alert alert-danger'>{formik2.errors.password}</div> : null}


{loading ?
  <button type='button' className='btn bg-main text-white my-2 mx-auto'><i className='fa fa-spinner fa-spin'></i></button>
  : <button disabled={!(formik2.isValid && formik2.dirty)} type='submit' className='btn mx-auto bg-main text-white my-2'>Login</button>
}  </form>
    </div>
  </>
}
