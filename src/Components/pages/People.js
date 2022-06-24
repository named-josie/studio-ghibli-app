import React from 'react';

import './people.css';

export default function People() {
  return (
    <div>
      <h1>Search for a Person</h1>

      <input type='text' placeholder='Search'></input>
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
