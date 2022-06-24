import React from 'react';

export const Dropdown = (props) => (
  <div className='form-group'>
    <strong>{props.title}</strong>
    <select
      className='movie-titles'
      name='{props.title}'
      onChange={props.onChange}
    >
      <option defaultValue>Select {props.title}</option>
      {props.options.map((item, index) => (
        <option key={index} value={item.id}>
          {item.title}
        </option>
      ))}
    </select>
  </div>
);
