import axios from 'axios'
import React, { createContext, useState } from 'react'

import * as Yup from 'yup'
import { useFormik } from 'formik'

export let AuthenticationContext = createContext()
export default function AuthenticationContextProvider(props) {

    let { saveData, userData, setUserData } = props
    const [loading, setloading] = useState(false)


    //signup


    const [SignDone, setSignDone] = useState(false)
    const [messageErr, setmessageErr] = useState('')

    async function handelSignup(values) {
        setloading(true)
        let { data } = await axios.post('https://route-ecommerce-app.vercel.app/api/v1/auth/signup', values).catch((err) => {
            setmessageErr(`${err.response.data.message}`)
            setloading(false)
        })
        if (data.message === 'success') {

            setloading(false)
            setSignDone(true)
        }
    }
    let validationSchema = Yup.object({
        name: Yup.string().required('name is required').min(3, 'name min is 3').max(10, 'name max is 10'),
        email: Yup.string().required('email is required').email('email is invalid'),
        password: Yup.string().required('password is required').matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Minimum eight characters, at least one letter and one number'),
        rePassword: Yup.string().required('rePassword is required').oneOf([Yup.ref('password')], "rePassword and password dosenot match"),
        phone: Yup.string().required('phone is required').matches(/^01[0125][0-9]{8}$/, 'phone must be egyption phone number')

    })
    let formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            rePassword: '',
            phone: ''
        },
        validationSchema
        ,
        onSubmit: handelSignup
    })

    //   login
    const [LoginDone, setLoginDone] = useState(false)
    const [messageErr2, setmessageErr2] = useState('')

    async function handelLogin(values) {
        setloading(true)
        let { data } = await axios.post('https://route-ecommerce-app.vercel.app/api/v1/auth/signin', values).catch((err) => {
            setmessageErr2(`${err.response.data.message}`)
            setloading(false)
        })
        if (data.message === 'success') {
            localStorage.setItem('userToken', data.token)
            saveData()
            setloading(false)
            setLoginDone(true)


        }
    }

    let validationSchema2 = Yup.object({
        email: Yup.string().required('email is required').email('email is invalid'),
        password: Yup.string().required('pass is required').matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Minimum eight characters, at least one letter and one number'),
    })

    let formik2 = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema2,
        onSubmit: handelLogin

    })

    return (
        <AuthenticationContext.Provider value={{ formik, messageErr, SignDone, userData, setUserData, formik2, messageErr2, loading, LoginDone }}>
            {props.children}
        </AuthenticationContext.Provider>
    )
}
