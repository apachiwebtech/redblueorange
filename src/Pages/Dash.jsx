import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import banner from '../assets/img/banner1.png'
import banner2 from '../assets/img/banner2.png'
import banner3 from '../assets/img/banner3.png'
import { Link } from 'react-router-dom';
const Dash = () => {

    const responsive = {

        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1,
            slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    };

    return (
        <div>
            <section id="hero" class="d-flex align-items-center">
                <div class="container-fluid" data-aos="zoom-out" data-aos-delay="100">
                    <div id="carouselExampleIndicators" class="carousel slide">

                        {/* <div class="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div> */}

                        <div class="carousel-inner">

                            <Carousel infinite={true} responsive={responsive} arrows={false} showDots={true}>
                                <div class="carousel-item active">
                                    <img src={banner} class="d-block w-100" alt="..." />
                                    <div class="carousel-caption d-none d-md-block">
                                        <div class="d-flex">
                                            <a href="#about" class="btn-get-started scrollto">Uniforms</a>
                                        </div>
                                        <h1>Brand <br />focused modern <br />school <br />uniforms</h1>
                                    </div>
                                </div>
                                <div class="carousel-item active">
                                    <img src={banner} class="d-block w-100" alt="..." />
                                    <div class="carousel-caption d-none d-md-block">
                                        <div class="d-flex">
                                            <a href="#about" class="btn-get-started scrollto">Uniforms</a>
                                        </div>
                                        <h1>Brand <br />focused modern <br />school <br />uniforms</h1>
                                    </div>
                                </div>


                            </Carousel>
                        </div>

                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>

                    </div>
                </div>
            </section>
            <div className='text-center'>
               <Link to="/login"><button className='btn btn-success'>Parent Login</button></Link>
            </div>
        </div>
    )
}

export default Dash