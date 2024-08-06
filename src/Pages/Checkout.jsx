import React, { useEffect, useState } from 'react'
import cartborder from '../assets/img/cartborder.png'
import black from '../assets/img/black.jpg'
import truck from '../assets/img/truck.png'
import safe from '../assets/img/safe.png'
import whatsapp from '../assets/img/whatsapp.png'
import { Delete, DeleteForever, ExpandLess, ExpandMore } from '@mui/icons-material'
import { Collapse } from '@mui/material';
import axios from 'axios'
import { BASE_URL, IMG_URL } from '../Utils/baseurl'
import pay from '../assets/img/online-payment.png'
import { useNavigate } from 'react-router-dom'


const Checkout = () => {
    const [detail2, setDetails2] = useState([])
    const [detail, setDetails] = useState([])
    const [prodata, setData] = useState([])
    const [count, setCount] = useState(0)
    const [child, setChild] = useState([])
    const [Instruction, setInstruction] = useState('')
    const [quantities, setQuantities] = useState({});
    const [error, setError] = useState({})
    const [childid , setChildid] = useState('')
    const [openStates, setOpenStates] = useState({
        upi: true,
        Debit: false,
        netbank: false,
        child: false,

        // Add more menu items as needed
    });

    const validateForm = () => {
        let isValid = true
        const newErrors = {}


        if (!childid) {
            isValid = false;
            newErrors.child = "Please select Child"
        }



        setError(newErrors)
        return isValid
    }

    const handleToggle = (itemName) => {
        setOpenStates((prevState) => {
            // If the clicked item is already true, toggle it to false
            if (prevState[itemName]) {
                return {
                    ...prevState,
                    [itemName]: false
                };
            } else {
                // Create a new state object where all items are set to false
                const newState = Object.fromEntries(Object.keys(prevState).map(key => [key, false]));
                // Set the clicked item to true
                newState[itemName] = true;
                return newState;
            }
        });
    };

    async function getschooldetails() {
        const data = {
            schoolid: localStorage.getItem("schoolid"),
            branchid: localStorage.getItem("branch"),
            accesskey: "7411189f74e25c6b2f135182edfc7030"
        }


        axios.post(`${BASE_URL}/app/apis/schoolbranch`, data)
            .then((res) => {

                setDetails2(res.data)
            })
    }
    async function getchildlist() {
        const data = {
            mobileno: "9619353074",
            accesskey: "7411189f74e25c6b2f135182edfc7030"
        }



        axios.post(`${BASE_URL}/app/apis/childlist`, data)
            .then((res) => {

                setChild(res.data.childlist)
            })
    }


    useEffect(() => {
        getschooldetails()
        getchildlist()
    }, [])


    async function getcartproductdata() {
        const data = {
            orderid: localStorage.getItem("orderid"),
            accesskey: "7411189f74e25c6b2f135182edfc7030"

        }

        axios.post(`${BASE_URL}/app/apis/cartlist`, data)
            .then((res) => {

                if (res.data.cartlist) {
                    setData(res.data.cartlist)
                } else {
                    setData([])
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


    const handlechange = (e) => {
        localStorage.setItem("childid", e.target.value)

        setChildid(e.target.value)
    }


    const navigate = useNavigate()

    const onproceed = () => {

        if (validateForm()) {

            const data = {
                orderid: localStorage.getItem("orderid"),
                userid: localStorage.getItem("userid"),
                childid: localStorage.getItem("childid"),
                schoolid: localStorage.getItem("schoolid"),
                paymenttype: "1",
                addressid: localStorage.getItem("branch"),
                deliveryid: "2",
                instruction: Instruction,
                accesskey: "7411189f74e25c6b2f135182edfc7030"

            }


            axios.post(`${BASE_URL}/app/apis/placeorder`, data)
                .then((res) => {

                    if (res.data) {
                        // localStorage.removeItem("orderid")
                        localStorage.removeItem("childid")
                        navigate('/success')
                    }
                })

        }

    }

    const Navigate = useNavigate()


    return (
        <div className='p-3'>
             <div >
                <i class="bi bi-arrow-left-circle-fill" style={{fontSize:"27px"}} onClick={()=>Navigate(-1)}></i>
            </div>

            
            <div class="row bgwhite">
                <div >

                    <div className='pay-meth my-2'>
                        <div className='d-flex justify-content-between' onClick={() => handleToggle('upi')}>
                            <p>Address</p>
                            {openStates.upi ? <ExpandLess className='mx-1' /> : <ExpandMore className='mx-1' />}
                        </div>
                        <Collapse in={openStates.upi} timeout="auto" unmountOnExit>
                            <div className='py-1'>
                                <p style={{ fontWeight: "500", marginBottom: "0px" }}> Address :-</p>
                                <div className='card border-danger p-2'>
                                    <span>{detail2.fullname}</span>
                                    <span>{detail2.address},{detail2.city}-{detail.pincode},{detail2.state}</span>
                                </div>
                            </div>

                            <button onClick={() => {
                                handleToggle('netbank')
                            }} className='btn btn-sm btn-danger rounded mt-2'>Next</button>
                        </Collapse>
                    </div>
                    <div className='pay-meth my-2'>
                        <div className='d-flex justify-content-between' onClick={() => handleToggle('netbank')}>
                            <p>Payment Type</p>
                            {openStates.netbank ? <ExpandLess className='mx-1' /> : <ExpandMore className='mx-1' />}
                        </div>

                        <Collapse in={openStates.netbank} timeout="auto" unmountOnExit>

                            <div className=' border-danger p-2 row'>
                                <div class="row align-items-center">
                                    <div className='col-md-4 col-4'>
                                        <img src={pay} style={{ width: "100px" }} alt="" />
                                    </div>
                                    <div className='col-md-6 col-6'>
                                        <h5>Online Payment</h5>
                                    </div>



                                </div>

                            </div>

                            <button onClick={() => {
                                handleToggle('child')
                            }} className='btn btn-sm btn-danger rounded mt-2'>Next</button>

                        </Collapse>
                    </div>




                    <div className='pay-meth my-2'>
                        <div className='d-flex justify-content-between' onClick={() => handleToggle('child')}>
                            <p>Select Child</p>
                            {openStates.child ? <ExpandLess className='mx-1' /> : <ExpandMore className='mx-1' />}
                        </div>

                        <Collapse in={openStates.child} timeout="auto" unmountOnExit>

                            <div>
                                <div class="">
                                    {/* <label class="mb-2 sizetitle">Select Child</label> */}
                                    <select class="form-select border border-secondary" name='prosize' style={{ height: "35px;", width: "100%" }} onChange={(e) => handlechange(e)} >
                                        <option selected>Select Child</option>
                                        {child.map((item) => {
                                            return (
                                                <option value={item.childid}>{item.firstname}</option>
                                            )
                                        })}


                                    </select>
                                    
                                </div>

                                <div class="form-floating mt-2">
                                    <textarea class="form-control" onChange={(e) => setInstruction(e.target.value)} placeholder="Leave a comment here" id="floatingTextarea2" style={{ height: "100px" }}></textarea>
                                    <label for="floatingTextarea2">Instruction</label>
                                </div>
                            </div>




                            <button onClick={() => {
                                handleToggle('Debit')
                            }} className='btn btn-sm btn-danger rounded mt-2'>Proceed to Payment</button>
                        </Collapse>
                    </div>

                    <div className='pay-meth my-2'>
                        <div className='d-flex justify-content-between' onClick={() => handleToggle('Debit')}>
                            <p>Order Overview</p>
                            {openStates.Debit ? <ExpandLess className='mx-1' /> : <ExpandMore className='mx-1' />}
                        </div>

                        <Collapse in={openStates.Debit} timeout="auto" unmountOnExit>
                            <div class="row bgwhite">

                                <div class="col-7">
                                    {/* <p class="Deliver">Deliver To <br /> mumbai-400 060</p> */}
                                    <i class="bi bi-cart3" style={{ color: "#C51D2A", fontSize: "26px" }}></i><span>Product({detail.cartcount || 0})</span>
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

                                                                    <input style={{ paddingLeft: "5px" }} type='text' value={quantities[item.cartid] || item.pqty} />

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
                                        <div className='listingwish' onClick={() => clearcart()}><p className='wishlist'>Clear wishlist</p></div>
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

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button onClick={onproceed} class="btn btn-primary btn-shadow d-block w-100 mt-4">
                                    <span class="lnr lnr-arrow-right fs-lg me-2"></span>Proceed to Payment
                                </button>

                            </div>
                                {error.child && <span className='text-danger'>{error.child}</span>}

                        </Collapse>
                    </div>




                </div>




            </div>
        </div>
    )
}

export default Checkout