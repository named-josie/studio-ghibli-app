import React from 'react';
import './people.css';

export default class People extends React.Component {
  constructor() {
    super();
    this.state = {
      characters: [],
      user_Input: '',
      located_Character: [],
    };
  }

  componentDidMount() {
    fetch('https://ghibliapi.herokuapp.com/people')
      .then((response) => response.json())
      .then((res) => this.setState({ characters: res }));
  }

  handleUserInput = (event) => {
    this.setState({
      user_Input: event.target.value,
    });
  };
  formSubmit = (event) => {
    event.preventDefault();
    let { characters, user_Input } = this.state;
    let searched = characters.find(
      (person) => person.name.toLowerCase() === user_Input.toLowerCase(),
    );
    this.setState({
      located_Character: searched,
    });
    event.target.reset();
  };
  render() {
    let { located_Character } = this.state;
    return (
      <div className='people'>
        <h1 className='title-people'>✨Search for a Person✨</h1>
        <form onSubmit={this.formSubmit}>
          <div className='input-container'>
            <input
              onChange={this.handleUserInput}
              type='text'
              placeholder='Search for a character'
            />
            <button className='input-button' type='submit'>
              Enter
            </button>
          </div>
        </form>
        <div>
          {located_Character ? (
            <div className='charactersDetails'>
              <p className='char'>Name: {located_Character.name}</p>
              <p className='char'>Age: {located_Character.age}</p>
              <p className='char'>Gender: {located_Character.gender}</p>
              <p className='char'>Hair Color: {located_Character.hair_color}</p>
              <p className='char'>Eye Color: {located_Character.eye_color}</p>
            </div>
          ) : (
            <h3 className='not-found'>Not Found!</h3>
          )}
        </div>
        <img
          className='people-logo'
          src='https://64.media.tumblr.com/b7159bbeedbb97f1e555a8c8bdd639fc/tumblr_mtti2mJNHC1shdhdjo1_500.gifv'
          alt=''
        ></img>
      </div>
    );
  }
}
