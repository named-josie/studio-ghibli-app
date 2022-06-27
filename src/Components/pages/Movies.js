import React from 'react';
import './movies.css';
export default class Movies extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      titleSelected: '',
    };
  }
  componentDidMount() {
    fetch('https://ghibliapi.herokuapp.com/films/')
      .then((response) => response.json())
      .then((res) => this.setState({ movies: res }));
  }
  onChange = (event) => {
    this.setState({ titleSelected: event.target.value });
  };

  render() {
    let { movies, titleSelected } = this.state;

    const movieTitle = movies.map((movie) => {
      return <option key={movie.id}>{movie.title}</option>;
    });

    let selected = movies.find((movie) => movie.title === titleSelected);

    return (
      <div className='movies'>
        <h1 className='title-movie'>✨Select a Movie✨</h1>

        <select className='dropdown' onChange={this.onChange}>
          <option></option>
          {movieTitle}
        </select>
        <div>
          {selected ? (
            <div className='selected'>
              <div className='selected-title'>
                <h2 className='movie-title'>{selected.title}</h2>
                <p className='original-title'>
                  {' '}
                  <strong>Original Title:</strong>{' '}
                  {selected.original_title_romanised}
                </p>
              </div>
              <div className='movie-info'>
                <img className='movie-image' src={selected.image} alt=''></img>
                <p className='description'>
                  <h3 className='movie-release'>
                    Release Date: {selected.release_date}
                  </h3>
                  Description: {selected.description}
                </p>
              </div>
            </div>
          ) : null}
        </div>
        <img
          className='movie-logo'
          src='https://i.gifer.com/1VBI.gif'
          alt=''
        ></img>
      </div>
    );
  }
}
