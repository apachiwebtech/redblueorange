import React, { useEffect, useState } from 'react'
import cartborder from '../assets/img/cartborder.png'
import axios from 'axios'
import { BASE_URL, IMG_URL } from '../Utils/baseurl'
import { Link, useNavigate } from 'react-router-dom'
import Loader from './Loader'

const Cart = () => {
    const [prodata, setData] = useState([])
    const [loader, setLoader] = useState(true)
    const [count, setCount] = useState(0)
    const [quantities, setQuantities] = useState({});
    const [emptycart, setEmptycart] = useState([])
    const [detail, setDetails] = useState([])
    async function getcartproductdata() {
        const data = {
            orderid: localStorage.getItem("orderid"),
            accesskey: "7411189f74e25c6b2f135182edfc7030"

        }

        axios.post(`${BASE_URL}/app/apis/cartlist`, data)
            .then((res) => {
                console.log(res.data)
                setLoader(false)
                if (res.data.cartlist) {
                    setData(res.data.cartlist)
                } else {
                    setData([])
                    setEmptycart(res.data.message)
                }

            })
    }

    async function getcartdetails() {
        const data = {
            orderid: localStorage.getItem("orderid"),
            accesskey: "7411189f74e25c6b2f135182edfc7030"

        }

        axios.post(`${BASE_URL}/app/apis/cartdetails`, data)
            .then((res) => {
                console.log(res.data)
                setDetails(res.data)
            })
    }

    const handleIncrease = (itemId) => {

        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [itemId]: (prevQuantities[itemId] || 0) + 1
        }));

        let pqty;

        if (quantities[itemId] == null) {
            pqty = 1
        } else {
            pqty = quantities[itemId] + 1
        }



        const data = {
            cartid: itemId,
            proqty: pqty,
            orderid: localStorage.getItem("orderid"),
            accesskey: "7411189f74e25c6b2f135182edfc7030"
        }

        axios.post(`${BASE_URL}/app/apis/cartqtyupdate`, data)
            .then((res) => {
                getcartdetails()
            })

    };

    const handleDecrease = (itemId) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [itemId]: Math.max((prevQuantities[itemId] || 1) - 1, 1)
        }));


        let proqty;

        if (quantities[itemId] == 1) {
            proqty = quantities[itemId]
        } else if (quantities[itemId] == null) {
            proqty = 1
        } else {
            proqty = quantities[itemId] - 1

        }


        const data = {
            cartid: itemId,
            proqty: proqty,
            orderid: localStorage.getItem("orderid"),
            accesskey: "7411189f74e25c6b2f135182edfc7030"


        }

        axios.post(`${BASE_URL}/app/apis/cartqtyupdate`, data)
            .then((res) => {
                getcartdetails()
            })



    };


    useEffect(() => {
        getcartproductdata()
        getcartdetails()
    }, [])

    useEffect(() => {

    }, [])



    const handledelete = (id) => {
        const data = {
            cartid: id,
            accesskey: "7411189f74e25c6b2f135182edfc7030"

        }

        axios.post(`${BASE_URL}/app/apis/deletecartproduct`, data)
            .then((res) => {
                getcartproductdata()
                getcartdetails()
            })
    }

    const clearcart = () => {

        const data = {
            orderid: localStorage.getItem("orderid"),
            accesskey: "7411189f74e25c6b2f135182edfc7030"

        }

        axios.post(`${BASE_URL}/app/apis/emptycart`, data)
            .then((res) => {

                getcartproductdata()
                getcartdetails()
            })
    }


const Navigate = useNavigate()


    return (
        <div className='p-3'>
            {loader && <Loader />}

            <div >
                <i class="bi bi-arrow-left-circle-fill" style={{fontSize:"27px"}} onClick={()=>Navigate(-1)}></i>
            </div>

            {prodata.length !== 0 &&
                <div class="row bgwhite">

                    <div class="col-7">
                        {/* <p class="Deliver">Deliver To <br /> mumbai-400 060</p> */}
                        <i class="bi bi-cart3" style={{ color: "#C51D2A", fontSize: "26px" }}></i><b>Product({detail.cartcount || 0})</b>
                    </div>
                    <div class="col-5">
                        {/* <p class="changeadd" href="#">Change</p> */}
                    </div>
                    <img src={cartborder} alt='' />
                    <div class="">
                        <div class="row bgwhite">



                            <div class="col-md-12 col-12 cart">
                                {prodata.map((item) => {



                                    return (
                                        <div class="titleproduct">
                                            <div className='text-right' onClick={() => handledelete(item.cartid)}>
                                                <i class="bi bi-trash3" style={{ fontSize: "20px", paddingRight: "10px", color: "red", cursor: "pointer" }}></i>
                                            </div>

                                            <img src={`${IMG_URL}/${item.frontimage}`} width="100px" alt='' />

                                            <h4>{item.productname}</h4>
                                            <p>Price<span>₹ {item.productprice}</span></p>
                                            <div class="Quantityone">
                                                <label class="mb-2 d-block">Quantity</label>
                                                &nbsp;&nbsp;
                                                <div class="form-outline">
                                                    <div className='d-flex qty-btn2'>
                                                        <button onClick={() => {

                                                            handleDecrease(item.cartid)

                                                        }}>-</button>

                                                        <input style={{ paddingLeft: "10px" }} type='text' value={quantities[item.cartid] || item.pqty} />

                                                        <button onClick={() => {

                                                            handleIncrease(item.cartid, item.pqty)

                                                        }}>+</button>
                                                    </div>
                                                </div>

                                                &nbsp;&nbsp;
                                                <label class="mb-2 d-block">Size</label>
                                                <div class="form-outline">
                                                    <input type="number" id="typeNumber" value={item.size} class="form-control" />
                                                </div>
                                            </div>

                                        </div>

                                    )
                                })}



                            </div>

                            <img src={cartborder} alt='' />
                            {/* <div class="listingwish">
                            <h4>
                                <p class="wishlist"><img src={wishlist} alt='' />Save to Wishlist</p>
                                Remove
                            </h4>
                        </div> */}
                            <div className='listingwish' onClick={() => clearcart()}><p className='wishlist' style={{ color: "#C51D2A", fontWeight: "500" }}>Clear All</p></div>
                            <img src={cartborder} alt='' />

                        </div>
                    </div>

                    <div class="col-md-12 cartSidebarSummary">
                        <div class="rounded-3 ">
                            <div class="py-2 px-xl-2 cartSummary">
                                {/* <input type="coupons" class="form-control coupons" id="coupons" placeholder="check for coupons" /> */}
                                <ul class="list-unstyled fs-sm pb-2 border-bottom">
                                    <li class="d-flex justify-content-between align-items-center">
                                        <span class="me-2">sub Total:</span>
                                        <span class="text-end">₹ {detail.subtotal || 0}</span>
                                    </li>

                                </ul>
                                {/* <h4>You will save ₹ 150 on this order</h4> */}
                                <h3>Total ₹ {detail.grandtotal || 0}</h3>
                                <Link to="/checkout" class="btn btn-primary btn-shadow d-block w-100 mt-4">
                                    <span class="lnr lnr-arrow-right fs-lg me-2"></span>Checkout
                                </Link>

                            </div>
                        </div>
                    </div>
                </div>}


            {prodata.length == 0 && <div className='text-center' >
                <h2>Your Cart is Empty!</h2>
                <Link to='/shop' className='mt-3'>
                    <button style={{ background: "#c02026", color: "#fff" }} className='btn btn-md '>Continue Shopping</button>
                </Link>

            </div>}
        </div >
    )
}

export default Cart