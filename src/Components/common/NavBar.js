import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

export default function NavBar() {
  return (
    <nav>
      <div className='Navbar'>
        <Link to='/'>
          {' '}
          <div>
            <img
              className='logo'
              src='https://data.whicdn.com/images/189257897/original.gif'
              alt='Studio Ghibli'
            ></img>
          </div>
        </Link>
        <Link to='/people'>
          <div className='linked'>People</div>
        </Link>
        <Link to='/movies'>
          <div className='linked'>Movies</div>
        </Link>
        <Link to='/locations'>
          <div className='linked' >Locations</div>
        </Link>
      </div>
    </nav>
  );
}
