import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

export let CartContext = createContext()
export default function CartContextProvider(props) {
  let { numberCart, setnumberCart } = props


  const [totalPrise, settotalPrise] = useState(0)

  const [loading, setloading] = useState(false)

  let headers = {
    token: localStorage.getItem('userToken')
  }

  async function addToCart(x) {
    return await axios.post('https://route-ecommerce-app.vercel.app/api/v1/cart',
      {
        productId: x
      },
      {
        headers: headers
      }).then((res) => {
        setnumberCart(res.data.numOfCartItems)
        toast.success(res.data.message)
      }).catch((err) => {
        toast.error("error")
      })
  }



  function getCart() {
    setloading(true)
    return axios('https://route-ecommerce-app.vercel.app/api/v1/cart', {
      headers: headers
    }).then((res) => {
      settotalPrise(res.data.data.totalCartPrice)
      setloading(false)
      return res
    }).catch((err) => {
      setloading(false)
      return err
    })


  }

  function updateProductCount(x, count) {
    return axios.put(`https://route-ecommerce-app.vercel.app/api/v1/cart/${x}`,
      {
        count: count
      },
      {
        headers: headers
      }).then((res) => {
        settotalPrise(res.data.data.totalCartPrice)
        toast.success("proudct count updated")
        return res
      }).catch((err) => {
        toast.error("error")
      })
  }

  function deleteProduct(x) {
    return axios.delete(`https://route-ecommerce-app.vercel.app/api/v1/cart/${x}`,
      {
        headers: headers
      }).then((res) => {
        setnumberCart(res.data.numOfCartItems)
        settotalPrise(res.data.data.totalCartPrice)

        toast.success("proudct is  deleted")
        return res
      }).catch((err) => {
        toast.error("error")
      })
  }

  function deleteAllProduct() {
    return axios.delete(`https://route-ecommerce-app.vercel.app/api/v1/cart`,
      {
        headers: headers
      }).then((res) => {
        setnumberCart(0)
        settotalPrise(0)
        toast.success("proudcts are  deleted")
        return res
      }).catch((err) => {
        toast.error("error")
      })
  }

  async function getMyCart() {
    let res = await getCart()
    if (res.name === "AxiosError") {
      setnumberCart(0)
    } else {
      setnumberCart(res.data.numOfCartItems)
      settotalPrise(res.data.data.totalCartPrice)

    }
  }

  useEffect(() => {
    getMyCart()
  }, [])

  return (
    <CartContext.Provider value={{setnumberCart, addToCart, getCart, updateProductCount, deleteProduct, deleteAllProduct, loading, numberCart, getMyCart, totalPrise,settotalPrise }}>
      {props.children}
    </CartContext.Provider>
  )
}
