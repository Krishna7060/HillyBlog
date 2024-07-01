import React from 'react'
import logo from "../assets/logo.jpg"
function Logo({width='100px'}) {
  return (
    <div className='mt-6'>
      <div className='max-w-24 rounded-full '>
        <img className='w-16 rounded-xl' src={logo} alt="Logo" /></div>
      
    </div>
  )
}

export default Logo
