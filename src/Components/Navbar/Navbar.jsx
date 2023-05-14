import React, { useContext, useEffect, useState } from 'react'
import styles from './Navbar.module.css'
import logo from '../../images/freshcart-logo.svg'
import { Link } from 'react-router-dom'
import { AuthenticationContext } from '../../context/AuthenticationContextProvider'
import { CartContext } from '../../context/CartContextProvider'

export default function Navbar() {


  let { userData, setUserData } = useContext(AuthenticationContext)
 let {numberCart}=useContext(CartContext)
  console.log(userData);

  function logOut() {
    setUserData(null)
    localStorage.clear()
  }


  return <>
    <nav className="navbar navbar-expand-xl navbar-light bg-light  ">
      <div className="container">
        <a className="navbar-brand">
          <img src={logo} alt="" srcset="" />
        </a>
        <button className="navbar-toggler d-xl-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
          aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          {userData !== null ? <ul className="navbar-nav me-auto mt-2 mt-lg-0 ">

            <li className="nav-item">
              <Link className="nav-link" to={'/'}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={'Products'}>Products</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={'Categories'}>Categories</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={'Brands'}>Brands</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={'MyOrders'}>MyOrders</Link>
            </li>

           
           
            
          </ul> : null}
  <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
          <li className="nav-item">
                <a className='nav-link fw-bolder fs-3 '>{userData?.name ?userData.name: null}</a>
             </li>
             </ul>
          <ul className="navbar-nav ms-auto mt-2 mt-lg-0">

          


            <li className="nav-item d-flex align-items-center ">

              <i className='fab fa-facebook mx-2'></i>
              <i className='fab fa-twitter mx-2'></i>
              <i className='fab fa-instagram mx-2'></i>
              <i className='fab fa-tiktok mx-2'></i>
              <i className='fab fa-linkedin mx-2'></i>
              <i className='fab fa-youtube mx-2'></i>

            </li>

            {userData === null ? <>
              <li className="nav-item">
                <Link className="nav-link " to={'Login'}>Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={'SignUp'}>SignUp</Link>
              </li></> :<>
               <li className="nav-item">
               <Link className="nav-link" to={'Cart'}><button type="button" class="btn btn-primary position-relative">
               <i class="fa-solid fa-cart-shopping"></i>
                 <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                 {numberCart}
                   <span class="visually-hidden">unread messages</span>
                 </span>
               </button></Link>
             </li>
            
              <li className="nav-item">
              <Link className="nav-link " onClick={logOut} to={'Login'}>Logout</Link>
            </li></>}





          </ul>




        </div>
      </div>
    </nav>

  </>
}
