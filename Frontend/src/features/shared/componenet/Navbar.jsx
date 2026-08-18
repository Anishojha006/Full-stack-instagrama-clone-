import React from 'react'
import '../nav.scss'
import { useNavigate } from 'react-router'

const Navbar = () => {
  const navigate  = useNavigate();
  return (
   <nav className='navbar'>
    <p>Insta</p>
    <button 
      onClick={
        ()=>{
   navigate('/create-post')
        }
      }
    className='button primary-button'>new post</button>
   </nav>
  )
}

export default Navbar