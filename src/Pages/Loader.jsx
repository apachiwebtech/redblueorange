import React from 'react'

const Loader = () => {
    return (
        <div style={{background :"#fff", height:"100vh" ,position:"fixed",width:"100%",zIndex:"5000" }} >
            <div class="spinner-border text-dark" style={{position :"absolute" , left :"47%", top:"50%",zIndex :"100"}} role="status">
                <span class="visually-hidden">Loading...</span>
            </div>

        </div>
    )
}

export default Loader