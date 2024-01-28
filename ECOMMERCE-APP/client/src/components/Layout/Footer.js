import React from 'react'
import {Link} from "react-router-dom";
const Footer = () => {
  return (
    <div className='bg-dark text-light p-3'>
      <h1 className='text-center'>All Right Reserved &copy; Abodh Technology</h1>
      <p className="text-center mt-3">
        <Link className='ang' to="/about">About</Link>
        |
        <Link className='ang' to="/contact">Contact</Link>
        |
        <Link className='ang' to="/policy">Policy</Link>
      </p>
    </div>
  )
}

export default Footer
