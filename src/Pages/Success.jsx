import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../Utils/baseurl'

const Success = () => {

    const [detail , setDetails] = useState([])

    async function getlisting() {

        const data = {
            orderid: localStorage.getItem('orderid'),
            accesskey: "7411189f74e25c6b2f135182edfc7030"
        }

        axios.post(`${BASE_URL}/app/apis/successorder`, data)
            .then((res) => {
                setDetails(res.data)
                console.log(res.data)
            })

    }

    useEffect(() => {
        getlisting()
    }, [])


    return (
        <div className='text-center mt-5'>
            <p>Hello <b>{detail.firstname} {detail.lastname} ,</b></p>
            <p>Thank you for shopping at Red Blue Orange. Your order <b>({detail.orderno})</b>  has been placed.</p>
             <Link to="/shop">
                <button onClick={() => {
                    localStorage.removeItem("orderid")
                }} style={{background :"#c02026" , color:"#fff"}} className='btn btn-md '>Continue Shopping</button>
             </Link>
        </div>
    )
}

export default Success