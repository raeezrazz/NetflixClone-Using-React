import React from 'react'
import { useEffect, useRef } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import bell_icon from '../../assets/bell_icon.svg'
import caret_icon from '../../assets/caret_icon.svg'
import profile_img from '../../assets/profile_img.png'
import { logout } from '../../Firebase'
import search_icone from '../../assets/search_icon.svg'
const Navbar = () => {

  const navReff =useRef(null)

  useEffect(()=>{
    const handleScroll = ()=>{
      if(window.scrollY >= 80){
        navReff.current.classList.add('nav-dark');

      }else{
        navReff.current.classList.remove('nav-dark')
      }
    }

  window.addEventListener('scroll',handleScroll)
  return ()=>{
    window.removeEventListener('scroll',handleScroll)
  };
},[])


  return (
    <div ref={navReff} className='navbar'>
    
      <div className="navbar-left">
        <img src={logo} alt="" />
        <ul>
          <li>Home</li>
          <li>Tv Show</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse by Language</li>

        </ul>
      </div>
      <div className="navbar-right">
        <img src={search_icone} alt="" className='icons' />
        <p>Children</p>
        <img src={bell_icon} alt="" className='icons' />
        <div className="navbar-profile">
        <img src={profile_img} alt="" className='profile' />
        <img src={caret_icon} alt="" />
        <div className="dropdown">
          <p onClick={()=>{logout()}}>Sign Out of Netflix</p>
        </div>

        </div>
      </div>
    </div>
  )
}

export default Navbar
