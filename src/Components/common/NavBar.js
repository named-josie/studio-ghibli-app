import React from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'


export default function NavBar() {
  return (
   <nav>
  <div>
  <Link to="/" > <img className='logo' src='https://data.whicdn.com/images/189257897/original.gif' alt='Studio Ghibli' ></img></Link>
  <Link to="/people"><h3>People</h3></Link>
  <Link to="/movies"><h3>Movies</h3></Link>
  <Link to="/locations"><h3>Locations</h3></Link>
  </div>
    </nav>
  )
}


