import React from 'react';
// import { Link } from 'react-router-dom';
import './home.css';

export default function Home() {
  return (
    <div className='home-page'>
      <h1 className='home-title'>Welcome to GhibliApp</h1>
      {/* <Link to='/about' ></Link> */}
      <img
        className='home-logo'
        src='https://66.media.tumblr.com/15924a6484e81c67167bc04287917ba9/tumblr_mfoibvy2v41rfjowdo1_500.gif'
        alt='ghibli'
      ></img>
    </div>
  );
}
