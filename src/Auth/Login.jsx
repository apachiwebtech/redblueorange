import axios from 'axios'
import React, { useState } from 'react'
import { BASE_URL } from '../Utils/baseurl'
import md5 from 'js-md5'
import user from '../assets/img/user.png'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const [value, setValue] = useState({
        emailid: "",
        password: "",
        accesskey: "7411189f74e25c6b2f135182edfc7030"

    })

    const navigate = useNavigate()

    const handlesubmit = (e) => {
        e.preventDefault()

        const hashpass = md5(value.password)

        const data = {
          emailid : value.emailid,
          password: hashpass,
          accesskey: value.accesskey
        }

        axios.post(`${BASE_URL}/app/apis/login`,data)
        .then((res)=>{
            console.log(res)

            if(res.data && res.data.school){
                localStorage.setItem("schoolid",res.data.school )
                localStorage.setItem("branch",res.data.branch )
                localStorage.setItem("userid",res.data.loginuserid )

               navigate('/shop')
            }            
        })
    }


    const handlechange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }


    return (

        <>
        
        {/* <div>
            <form onSubmit={handlesubmit}>
                <div>
                    <label htmlFor="">email</label>
                    <input type="text" name="emailid" onChange={handlechange} />

                </div>
                <div>
                    <label htmlFor="">Password</label>
                    <input type="password" name='password' onChange={handlechange} />

                </div>
                <input type="submit" name='submit'  />
            </form>
        </div> */}


        <div class="row">
    <div class="topheader" ><a href="#" style={{paddingLeft :"10px"}}> Login</a>
    </div>
        <div class="container">
            <form action="" method="POST" class="log" onSubmit={handlesubmit}>
                <div class="row signin">
                    <div class="col-md-6 col-lg-4 login-form">
                        <div class="img d-flex align-items-center justify-content-center">
                            <img src={user} alt='' />
                        </div>
                            <h3 class="text-center mb-0">Welcome</h3>

                            <input type="text" placeholder="Email ID / Mobile No" name="emailid" onChange={handlechange} class="input-field email" style={{color: "#000;"}}  />

                            <input type="password" placeholder="Password" name='password' onChange={handlechange}class="input-field email" style={{color: "#000;"}}  />

                            <div class="form-check terms">
                                <input type="checkbox" class="form-check-input" id="rememberMe" />
                                <label class="form-check-label accept" for="rememberMe">I accept the Terms and Condition &
                                Privacy Policy</label>
                            </div>
                           <button type="submit" class="login-button" >Login</button>
                            {/* <div style={{textAlign: "right"}}>
                                <a href="#" class="logwith">login with otp</a>
                            </div>  */}
                            <div class="row newhead">
                                <div class="col-md-12" style={{padding: "0px"}}>
                                    {/* <p>New to Red Blue Orange ? <a
                                            href="register.html">Signup</a>
                                    </p> */}
                                    {/* <a href="#" class="forgot">forgot Password</a> */}
                                </div>
                                
                            </div> 
                    </div>
                </div>
            </form>
        </div>
</div>
        </>


    )
}

export default Login