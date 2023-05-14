import React, { useContext, useEffect, useState } from 'react'
import styles from './Cart.module.css'
import axios from 'axios'
import cartEmpty from '../../images/empty0.avif'
import { CartContext } from '../../context/CartContextProvider'
import { Link } from 'react-router-dom'

export default function Cart() {

  let { getCart, updateProductCount, deleteProduct, deleteAllProduct, loading, totalPrise, numberCart, settotalPrise } = useContext(CartContext)
  const [cart, setcart] = useState([])
  const [cartId, setcartId] = useState(null)

  async function getMyCart() {
    let res = await getCart()
    if (res.name === "AxiosError") {
      setcart(null)
      settotalPrise(0)

    } else {
      setcart(res.data.data.products);
      setcartId(res.data.data._id)
    }
  }
  console.log(cartId);
  async function updateCount(x, y) {
    let { data } = await updateProductCount(x, y)
    setcart(data.data.products);
  }

  async function deleteItem(x) {
    let { data } = await deleteProduct(x)
    setcart(data.data.products);
  }

  async function deleteMyCart() {
    await deleteAllProduct()
    setcart(null)
  }



  useEffect(() => {
    getMyCart()
  }, [])

  return <>
    <div className='row container mx-auto my-5 py-5'>
      {loading ? <div className='col-12 text-center my-5 py-5'>
        <i className='fa fa-spin fa-spinner fa-3x text-main'></i>
      </div> : <>
        {cart == null || numberCart == 0 ? <div className='w-100 text-center my-5 '>
          <img src={cartEmpty} alt="" className='w-50 ' />
          <div>
            <Link to={'/'} className='btn btn-outline-info w-75'>Shop Now</Link>
          </div>
        </div> : <>
          <Link to={'CreateCash/' + cartId} className='btn btn-outline-success my-3'>Create Cash</Link>
          <button onClick={deleteMyCart} className='btn btn-outline-danger'>clear cart</button>
          <div className='col-md-12 text-center py-3'><h3>{totalPrise} EGP</h3></div>
        </>}

        {cart?.map((item) => {
          return <div key={item.product._id} className='row align-items-center justify-content-center overflow-hidden my-3 shadow-lg bg-light p-3 rounded'>
            <div className='col-lg-3  text-center'>
              <img src={item.product.imageCover} className='w-50' alt="" />
            </div>
            <div className='col-lg-7 text-lg-start text-center px-2 py-3'>

              <span className='text-main font-sm fw-bold'>{item?.product?.category?.name}</span>
              <h3 className='fw-bolder h6'>{item.product.title.split(' ').slice(0, 2).join(' ')}</h3>
              <span className='text-muted d-block'>{item.price * item.count} EGP</span>

              <span>
                <i className='fa fa-star rating-color'></i>
                {item.product.ratingsAverage}
              </span>





            </div>
            <div className="col-lg-2">
              <div className='row'>
                <button onClick={() => updateCount(item.product._id, item.count + 1)} className='btn btn-sm btn-outline-success  col-4'>+</button>
                <div className=' col-4 text-center  text-main  py-1 px-3 my-2'>{item.count} count</div>
                <button onClick={() => {
                  if (item.count === 1) {
                    deleteItem(item.product._id)
                  } else {
                    updateCount(item.product._id, item.count - 1)
                  }
                }} className='btn-outline-success btn btn-sm col-4 '>-</button>
                <button onClick={() => deleteItem(item.product._id)} className='btn  btn-outline-danger w-100 my-2'>remove</button>

              </div>


            </div>

          </div>

        }
        )}
      </>}
    </div>
  </>
}
