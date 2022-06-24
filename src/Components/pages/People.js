import React from 'react';

import './people.css';

export default function People() {
  return (
    <div className='people'>
      <h1 className='title-page'>Search for a Person</h1>

      <input type='text' placeholder='✨Search here please✨'></input>
      <button className='search-button' id='submit-button' type='submit'>
        <img
          className='search-icon'
          src='https://static.thenounproject.com/png/3134345-200.png'
          alt='search'
        ></img>
      </button>
    </div>
  );
}
