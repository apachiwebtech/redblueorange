import React, { useEffect, useState } from 'react'
import logo from '../assets/img/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL, IMG_URL } from '../Utils/baseurl'
const Header = () => {

    const [detail, setDetails] = useState([])
    const navigate = useNavigate()

    async function getlisting() {

        const data = {
            schoolid: localStorage.getItem('schoolid'),
            accesskey: "7411189f74e25c6b2f135182edfc7030"
        }

        axios.post(`${BASE_URL}/app/apis/schooldetails`, data)
            .then((res) => {
                setDetails(res.data)
                console.log(res.data)
            })

    }

    useEffect(() => {
        getlisting()
    }, [])




    return (
        <div>
            <div class="row" id="header">
                <div class="col-md-12">
                    <h1 class="logo">
                        {localStorage.getItem("userid") !== null && <Link to='#' style={{ borderRight: "1px solid red" }}><img src={`https://redbluorange.in/upload/school/` + detail.logo} alt="" /></Link>}
                        <Link to='#'><img src={logo} alt="" /></Link>
                    </h1>

                    <nav id="navbar" class="navbar">
                        <ul>
                            <li class="dropdown"><a href="#"><span>Category</span> <i class="bi bi-chevron-down"></i></a>
                                <ul>
                                    <li><a href="#">Category 1</a></li>
                                    <li><a href="#">Category 2</a></li>
                                    <li><a href="#">Category 3</a></li>
                                    <li><a href="#">Category 4</a></li>
                                </ul>
                            </li>
                            <li class="dropdown"><a href="#"><span>Brands</span> <i class="bi bi-chevron-down"></i></a>
                                <ul>
                                    <li><a href="#">Brands 1</a></li>
                                    <li><a href="#">Brands 2</a></li>
                                    <li><a href="#">Brands 3</a></li>
                                    <li><a href="#">Brands 4</a></li>
                                </ul>
                            </li>
                            <li class="dropdown"><a href="#"><span>School Kit</span> <i class="bi bi-chevron-down"></i></a>
                                <ul>
                                    <li><a href="#">Kit 1</a></li>
                                    <li><a href="#">Kit 2</a></li>
                                    <li><a href="#">Kit 3</a></li>
                                    <li><a href="#">Kit 4</a></li>
                                </ul>
                            </li>
                        </ul>
                        {/* <i class="bi bi-list mobile-nav-toggle"></i> */}

                        {localStorage.getItem("userid") !== null && <> <Link to="/cart" ><i class="bi bi-cart3" style={{ color: "#C51D2A", fontSize: "26px" }}></i></Link>     <i class="bi bi-box-arrow-right mx-2" style={{ cursor: "pointer", color: "#C51D2A", fontSize: "25px" }} onClick={() => {
                            const userConfirmed = window.confirm('Are you sure you want to proceed?');

                            if (userConfirmed) {
                                navigate('/')
                                localStorage.removeItem('schoolid')
                                localStorage.removeItem('userid')
                                localStorage.removeItem('branch')
                                localStorage.removeItem('orderid')
                            }


                        }}></i></>}

                    </nav>
                </div>


                {/* <div class="col-md-12" style={{marginTop: "10px"}}>
            <form class="form-inline d-flex justify-content-center md-form form-sm">
                <input class="form-control form-control-sm mr-3 " type="text" placeholder="Search here"
                aria-label="Search " />
                <i class="bi bi-search"></i>
            </form>
        </div> */}
            </div>
        </div>
    )
}

export default Header