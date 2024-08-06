import React from 'react'
import logo from '../assets/img/logo.png'
import { Link } from 'react-router-dom'
const Header2 = () => {
    return (
        <div>
            <div class="row" id="header">
                <div class="col-md-12"><h1 class="logo"><Link class="logo"><img src={logo} alt="" /></Link></h1>
                
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

export default Header2