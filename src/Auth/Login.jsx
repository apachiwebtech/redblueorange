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
      emailid: value.emailid,
      password: hashpass,
      accesskey: value.accesskey
    }

    axios.post(`${BASE_URL}/app/apis/login`, data)
      .then((res) => {
        console.log(res)

        if (res.data && res.data.school) {
          localStorage.setItem("schoolid", res.data.school)
          localStorage.setItem("branch", res.data.branch)
          localStorage.setItem("userid", res.data.loginuserid)

          navigate('/shop')
        }
      })
  }


  const handlechange = (e) => {
    setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }


  return (
    <>
      <div className="login-outer" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="login-card" style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', padding: '2rem 1.5rem', maxWidth: '370px', width: '100%' }}>
          <div className="img d-flex align-items-center justify-content-center" style={{ justifyContent: 'center', display: 'flex', marginBottom: '1.5rem' }}>
            <img src={user} alt='' style={{ width: '70px', height: '70px', borderRadius: '50%', border: '2px solid #eee', background: '#f7f7f7', objectFit: 'cover' }} />
          </div>
          <h3 className="text-center mb-3" style={{ fontWeight: 700, marginBottom: '1.5rem', textAlign: 'center' }}>Welcome</h3>
          <form action="" method="POST" className="log" onSubmit={handlesubmit}>
            <input
              type="text"
              placeholder="Email ID / Mobile No"
              name="emailid"
              onChange={handlechange}
              className="input-field email"
              style={{ color: '#000', background: '#fff', border: '1px solid #d1d9e6', borderRadius: '8px', padding: '0.75rem 1rem', marginBottom: '1rem', width: '100%', fontSize: '1rem' }}
              autoComplete="username"
            />
            <input
              type="password"
              placeholder="Password"
              name='password'
              onChange={handlechange}
              className="input-field email"
              style={{ color: '#000', background: '#fff', border: '1px solid #d1d9e6', borderRadius: '8px', padding: '0.75rem 1rem', marginBottom: '1rem', width: '100%', fontSize: '1rem' }}
              autoComplete="current-password"
            />
            <div className="form-check terms" style={{ marginBottom: '1.2rem', display: 'flex', alignItems: 'center' }}>
              <input type="checkbox" className="form-check-input" id="rememberMe" style={{ marginRight: '0.5rem' }} />
              <label className="form-check-label accept" htmlFor="rememberMe" style={{ fontSize: '0.95rem' }}>
                I accept the Terms and Condition &amp; Privacy Policy
              </label>
            </div>
            <button type="submit" className="login-button" style={{ width: '100%', border: 'none', borderRadius: '8px', padding: '0.75rem', fontWeight: 600, fontSize: '1.1rem', marginBottom: '1rem' }}>
              Login
            </button>
            <div style={{ textAlign: 'right', marginTop: '0.5rem' }}>
              <a href="#" className="logwith" style={{ fontSize: '0.95rem', textDecoration: 'underline' }}>Login with OTP</a>
            </div>
            <div className="row newhead" style={{ marginTop: '1.5rem' }}>
              <div className="col-md-12" style={{ padding: '0px', textAlign: 'center' }}>
                <span style={{ fontSize: '0.95rem' }}>New to Red Blue Orange? <a href="#" style={{ textDecoration: 'underline' }}>Signup</a></span>
                <br />
                <a href="#" className="forgot" style={{ fontSize: '0.95rem', textDecoration: 'underline' }}>Forgot Password?</a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>


  )
}

export default Login
