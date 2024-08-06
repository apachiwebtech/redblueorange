import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import black from '../assets/img/black.jpg'
import axios from 'axios'
import { BASE_URL, IMG_URL } from '../Utils/baseurl'
import black1 from '../assets/img/black1.jpg'
import Drawer from 'react-modern-drawer'
import border from '../assets/img/border.jpg'
import 'react-modern-drawer/dist/index.css'
import standing from '../assets/img/standing.jpg'
import email from '../assets/img/email.jpg'
import wishlist from '../assets/img/wishlist.jpg'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tabs from '@mui/material/Tabs';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Logout } from '@mui/icons-material'
import Footer from '../Layout/Footer'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const Shop = () => {
    const [product, setProduct] = useState([])
    const [detail, setDetail] = useState({})
    const [size, setSize] = useState([])
    const [color, setColor] = useState([])
    const [count, setCount] = useState(1)
    const [price, setPrice] = useState('')
    const [open, setOpen] = React.useState(false);
    const [error, setError] = useState({})

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };




    const [value, setValue] = useState({
        userid: localStorage.getItem("userid"),
        orderid: localStorage.getItem("orderid") || 0,
        schoolid: localStorage.getItem("schoolid"),
        proqty: count,
        prosize: "",
        procolor: "",
        accesskey: "7411189f74e25c6b2f135182edfc7030"
    })

    const validateForm = () => {
        let isValid = true
        const newErrors = {}


        if (!value.prosize) {
            isValid = false;
            newErrors.size = "Please select size"
        }
        if (!value.procolor) {
            isValid = false;
            newErrors.color = "Please select color"
        }


        setError(newErrors)
        return isValid
    }


    const [values, setValues] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValues(newValue);
    };


    async function getlisting() {
        const data = {
            schoolid: localStorage.getItem("schoolid"),
            standard: "",
            gender: "",
            accesskey: "7411189f74e25c6b2f135182edfc7030"
        }

        axios.post(`${BASE_URL}/app/apis/productlist`, data)
            .then((res) => {
                console.log(res.data.products)
                setProduct(res.data.products)
            })

    }

    useEffect(() => {
        getlisting()
    }, [])


    const [isOpen, setIsOpen] = useState(false)
    const toggleDrawer = (id) => {
        setIsOpen((prevState) => !prevState)
        setSize([])

        const data = {
            productid: id,
            accesskey: "7411189f74e25c6b2f135182edfc7030"
        }

        axios.post(`${BASE_URL}/app/apis/productdetails`, data)
            .then((res) => {
                console.log(res.data)
                setDetail(res.data)
            })


        //    *******************api for size 
        const data1 = {
            productid: id,
            accesskey: "7411189f74e25c6b2f135182edfc7030"
        }

        axios.post(`${BASE_URL}/app/apis/sizelist`, data1)
            .then((res) => {
                console.log(res.data)
                setSize(res.data.sizelist)
            })

        //  ********************** api for color


        const data2 = {
            productid: id,
            accesskey: "7411189f74e25c6b2f135182edfc7030"
        }

        axios.post(`${BASE_URL}/app/apis/colourlist`, data2)
            .then((res) => {

                setColor(res.data.colourlist)
            })
    }




    const closebutton = () => {
        setIsOpen((prevState) => !prevState)
        setDetail([])
        setSize([])
        setColor([])
        setPrice('')
        setValue({})
        setCount(1)
        setError({})
    }



    const onhandlesubmit = (e) => {
        e.preventDefault()



        if (validateForm()) {
            toast("Product added!");

            const data2 = {
                userid: localStorage.getItem("userid"),
                orderid:  localStorage.getItem("orderid") || 0,
                schoolid:  localStorage.getItem("schoolid"),
                productid: detail.id,
                proqty: count,
                prosize: value.prosize,
                procolor: value.procolor,
                devicetype: "android",
                orderfrom: "app",
                accesskey: "7411189f74e25c6b2f135182edfc7030"
            }

            axios.post(`${BASE_URL}/app/apis/addtocart`, data2)
                .then((res) => {
                    localStorage.setItem("orderid", res.data.orderid)
              
                })
        }

    }


    const onhadlechange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))


    }
    const onhadlechange2 = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))

        const price = size.filter((item) => (item.sizeid == e.target.value)).map((item) => item.sizeprice)

        setPrice(price)

        console.log(price ,"******")

    }



    return (
        <div className='p-2'>
            <ToastContainer theme="dark" />
            <div class="row shopnewproduct">
                {product.map((item) => {
                    return (
                        <div class="col-md-6 col-6" onClick={() => toggleDrawer(item.id)}>
                            <Link to=''><img src={`${IMG_URL}/${item.imagelink}`} alt='' />
                                {item.title}</Link>
                            <p> Price  Rs. {item.price1}-{item.price2}</p>
                        </div>
                    )

                })}


            </div>

            <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction='right'
                className='bla bla bla'
                style={{ width: "100%", overflowY: "scroll" }}
            >

                <div>
                    <div className='back-btn' onClick={() => closebutton()} >
                        <i class="bi bi-arrow-left-circle-fill"></i>
                    </div>
                    <div class="row">
                        <div class="spdimg"><img src={`${IMG_URL}/${detail.imagelink}`} alt='' /></div>
                    </div>

                    <Box sx={{ width: '100%', typography: 'body1' }}>
                        <TabContext value={values}>
                            <Box sx={{ borderBottom: 1, width: "100%", borderColor: 'divider', color: "black" }}>
                                <TabList textColor="#fff" indicatorColor="secondary" onChange={handleChange} aria-label="lab API tabs example">
                                    <Tab label="DETAILS" value="1" />
                                    <Tab label="DESCRIPTION" value="2" />
                                    <Tab label="CARE INSTRUCTION" value="3" />
                                </TabList>
                            </Box>
                            <TabPanel value="1">
                                <div class="row spdetail ">
                                    <div class="shorttext">
                                        <h3>{detail.title}</h3>
                                        <p style={{ marginBottom: "0px" }}> {detail.code}</p>
                                        <img src={border} width="100%" alt='' />
                                    </div>



                                </div>

                                <div class="row size">
                                    <div class="row mb-4">
                                        <div class="col-md-4 col-6">
                                            <label class="mb-2 sizetitle">Size</label>
                                            <select class="form-select border border-secondary" name='prosize' onChange={onhadlechange2} style={{ height: "35px;" }}>
                                                <option selected>Select Size</option>
                                                {size.map((item) => {
                                                    return (
                                                        <option value={item.sizeid}>{item.sizename}</option>
                                                    )
                                                })}


                                            </select>
                                            {error.size && <span className='text-danger'>{error.size}</span>}
                                        </div>

                                        <div class="col-md-4 col-6">
                                            <label class="mb-2">colour</label>
                                            <select class="form-select border border-secondary" name='procolor' onChange={onhadlechange} style={{ height: "35px" }}>
                                                <option>Select Colour</option>
                                                {color.map((item) => {
                                                    return (
                                                        <option value={item.colourid}>{item.colourname}</option>

                                                    )
                                                })}

                                            </select>
                                            {error.color && <span className='text-danger'>{error.color}</span>}
                                        </div>
                                        <p class="view">For More Details View <span onClick={handleClickOpen}>Size Chart</span></p>
                                        <p style={{ color: "#C51D2A" , fontWeight:"600" }}> Rs. {price || detail.price}</p>
                                        <img src={border} width="100%" alt='' />



                                        <BootstrapDialog
                                            onClose={handleClose}
                                            aria-labelledby="customized-dialog-title"
                                            open={open}
                                        >

                                            <IconButton
                                                aria-label="close"
                                                onClick={handleClose}
                                                sx={{
                                                    position: 'absolute',
                                                    right: 8,
                                                    top: 8,
                                                    color: (theme) => theme.palette.grey[500],
                                                }}
                                            >
                                                {/* <CloseIcon /> */}
                                                <p style={{ fontSize: "18px", fontWeight: "600", color: "red" }}>X</p>
                                            </IconButton>
                                            <DialogContent dividers>
                                                <img style={{ width: "100%" }} src={`${IMG_URL}/${detail.sizechart}`} alt="" />
                                            </DialogContent>

                                        </BootstrapDialog>


                                        <div class="row mb-4" style={{ alignItems: "end" }}>

                                            <div class="col-md-6 col-6">
                                                <label class="mb-2 sizetitle">Quantity</label>
                                                <div className='d-flex qty-btn'>
                                                    <button onClick={() => {
                                                        if (count > 1) {
                                                            setCount(count - 1)

                                                        }
                                                    }}>-</button>
                                                    <input style={{ paddingLeft: "9px" }} type='text' value={count || 0} />
                                                    <button onClick={() => setCount(count + 1)}>+</button>
                                                </div>

                                            </div>

                                            <form onSubmit={onhandlesubmit} class="col-md-6 col-6">
                                                <button type='submit' class="btn btn-danger">Add to bag</button>
                                                {/* <button href="#" class="btn btn-warning shadow-0"> Buy now </button> */}
                                                {/* <a href="#" class="" style={{ textDecoration: "none;" }}><img src={email} alt='' />
                                                <img src={standing} alt='' /> </a>
                                            <img src={wishlist} alt='' /> */}
                                            </form>


                                        </div>




                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel value="2">
                                <span style={{ fontSize: "13px" }} dangerouslySetInnerHTML={{ __html: detail.description }}></span>
                            </TabPanel>
                            <TabPanel value="3">
                                <span dangerouslySetInnerHTML={{ __html: detail.instructions }}></span>
                            </TabPanel>
                        </TabContext>
                    </Box>




                </div>
            </Drawer>

        </div>
    )
}

export default Shop