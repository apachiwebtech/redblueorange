import React from 'react'
import { useNavigate } from 'react-router-dom'

const Footer = () => {

  return (
    <div  style={{ width: "100%", position: "fixed", bottom: "0px", background: "#fff" }}>
      <div className='d-flex text-danger justify-content-end mx-3' style={{ cursor: "pointer" }}>
        <p>Logout</p>
        <i class="bi bi-box-arrow-right mx-2"></i>
      </div>
    </div>
  )
}

export default Footer