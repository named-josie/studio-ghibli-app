import React from 'react';
import './people.css';

class People extends React.Component {
  constructor() {
    super();
    this.state = {
      characters: [],
      userInput: '',
      located_Character: [],
    };
  }
  
  componentDidMount() {
    fetch('https://ghibliapi.herokuapp.com/people')
      .then((response) => response.json())
      .then((res) => this.setState({  characters: res }));
  }


  handleUserInput = (event) => {
    this.setState({
      userInput: event.target.value,
    });
  };
  formSubmit = (event) => {
    event.preventDefault();
    let { characters, userInput } = this.state;
    let searched = characters.find(
      (person) => person.name.toLowerCase() === userInput.toLowerCase(),
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
        <h1>Search for a Person</h1>
        <form onSubmit={this.formSubmit}>
          <input
            onChange={this.handleUserInput}
            type='text'
            placeholder='✨Search for a character✨'
          />
          <button type='submit'>Enter</button>
        </form>
        <div>
          {located_Character ? (
            <div className='charactersDetails'>
              <p>
                Name: {located_Character.name}
              </p>
              <p>
                 Age: {located_Character.age}
              </p>
              <p>
                Gender: {located_Character.gander}
              </p>
              <p>
                Hair Color: {located_Character.hair_color}
              </p>
              <p>
               Eye Color:{located_Character.eye_color}
              </p>
             
           
            </div>
          ) : (
            <h3>Not Found!</h3>
          )}
        </div>
      </div>
    );
  }
}
export default People;
