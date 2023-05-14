import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

import styles from './Layout.module.css'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return <>


    <div className="fixed-top">


      <Navbar />
    </div>


    <Outlet></Outlet>

    <Footer />





  </>
}
