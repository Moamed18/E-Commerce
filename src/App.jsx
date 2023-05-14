import React, { useEffect, useState } from 'react'
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Cart from './Components/Cart/Cart'
import Products from './Components/Products/Products'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import Categories from './Components/Categories/Categories'
import Brands from './Components/Brands/Brands'
import Login from './Components/Login/Login'
import SignUp from './Components/SignUp/SignUp'
import NotFound from './Components/NotFound/NotFound'
import jwtDecode from 'jwt-decode'
import ProtactecdRoute from './Components/ProtactecdRoute/ProtactecdRoute'
import ProductByCategory from './Components/ProductByCategory/ProductByCategory'
import ProductByBrands from './Components/ProductByBrands/ProductByBrands'
import CartContextProvider from './context/CartContextProvider'
import ProductContextProvider from './context/ProductContextProvider';
import CategoryContextProvider from './context/CategoryContextProvider';
import BrandsContextProvider from './context/BrandsContextProvider';
import AuthenticationContextProvider from './context/AuthenticationContextProvider';
import axios from 'axios';
import CreateCash from './Components/CreateCash/CreateCash';
import MyOrders from './Components/MyOrders/MyOrders';


export default function App() {
  let headers = {
    token: localStorage.getItem('userToken')
  }
  const [userData, setUserData] = useState(null)
  function saveData() {
    setUserData(jwtDecode(localStorage.getItem('userToken')))
    fisrtLookCart()

  }
  const [numberCart, setnumberCart] = useState(0)

  async function fisrtLookCart() {
    let res=await axios('https://route-ecommerce.onrender.com/api/v1/cart',{
      headers:headers
    })
    if(res.name === "AxiosError"){
      setnumberCart(0)


    }else{
      setnumberCart(res.data.numOfCartItems)

    }
    

  }

  useEffect(() => {
    if (localStorage.getItem('userToken') != null) {
      saveData()
    }
  }, [])

  let routes = createHashRouter([
    {
      path: '', element: <Layout />, children: [
        { index: true, element: <ProtactecdRoute><Home /></ProtactecdRoute> },
        { path: 'Cart', element: <ProtactecdRoute><Cart /></ProtactecdRoute> },
        { path: 'Products', element: <ProtactecdRoute><Products /></ProtactecdRoute> },
        { path: 'ProductDetails/:id', element: <ProtactecdRoute><ProductDetails /></ProtactecdRoute> },
        { path: 'Categories', element: <ProtactecdRoute><Categories /></ProtactecdRoute> },
        { path: 'ProductByCategory/:id', element: <ProtactecdRoute><ProductByCategory /></ProtactecdRoute> },
        { path: 'ProductByBrands/:id', element: <ProtactecdRoute><ProductByBrands /></ProtactecdRoute> },
        { path: 'Brands', element: <ProtactecdRoute><Brands /></ProtactecdRoute> },
        { path: 'MyOrders', element: <ProtactecdRoute><MyOrders /></ProtactecdRoute> },
        { path: '/cart/CreateCash/:id', element: <ProtactecdRoute><CreateCash /></ProtactecdRoute> },

        { path: 'Login', element: <Login/> },
        { path: 'SignUp', element: <SignUp /> },
        { path: '*', element: <ProtactecdRoute><NotFound /></ProtactecdRoute> }

      ]
    }
  ])

  return <>
    <AuthenticationContextProvider saveData={saveData} userData={userData} setUserData={setUserData} >
      <ProductContextProvider>
        <CategoryContextProvider>
          <BrandsContextProvider>
            <CartContextProvider setnumberCart={setnumberCart} numberCart={numberCart} >
              <Toaster toastOptions={{
                duration: 3000
              }} />
              <RouterProvider router={routes}></RouterProvider>
            </CartContextProvider>
          </BrandsContextProvider>
        </CategoryContextProvider>
      </ProductContextProvider>
    </AuthenticationContextProvider>
  </>
}
