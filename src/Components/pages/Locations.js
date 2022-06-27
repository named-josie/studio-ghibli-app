import React from 'react';
import './location.css';

export default class Locations extends React.Component {
  constructor() {
    super();
    this.state = {
      locations: [],
      display: false,
    };
  }

  componentDidMount() {
    fetch('https://ghibliapi.herokuapp.com/locations')
      .then((response) => response.json())
      .then((res) => this.setState({ locations: res }));
  }

  handle_for_location = () => {
    this.setState({
      display: !this.state.display,
    });
  };

  sort_by_Name = (data) => {
    let sorted_Results = data.sort((a, b) => {
      if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
      else if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
      return 0;
    });
    this.setState({ locations: sorted_Results });
  };

  sort_by_Climate = (data) => {
    let sorted_Results = data.sort((a, b) => {
      if (a.climate.toLowerCase() > b.climate.toLowerCase()) return 1;
      if (a.climate.toLowerCase() < b.climate.toLowerCase()) return -1;
      return 0;
    });
    this.setState({ locations: sorted_Results });
  };

  sort_by_Terrain = (data) => {
    let sorted_Results = data.sort((a, b) => {
      if (a.terrain.toLowerCase() > b.terrain.toLowerCase()) return 1;
      if (a.terrain.toLowerCase() < b.terrain.toLowerCase()) return -1;
      return 0;
    });
    this.setState({ locations: sorted_Results });
  };

  render() {
    let { locations, display } = this.state;

    let locations__Info = locations.map((location, index) => {
      return (
        <ul key={index} className='locations-part2'>
          <ul>
            <li style={{ color: '#8b3da0' }}>
              <span>Name: {location.name}</span>
            </li>
            <li style={{ color: '#7db1c3' }}>
              <span>Climate: {location.climate}</span>
            </li>
            <li style={{ color: '#96c668' }}>
              <span>Terrain: {location.terrain}</span>
            </li>
          </ul>
        </ul>
      );
    });

    return (
      <div className='locations'>
        <h1 className='location-title'>✨List of Locations✨</h1>
        {display ? (
          <div>
            <button
              className='locations-buttons'
              onClick={this.handle_for_location}
            >
              Hide Locations
            </button>
            <button
              className='locations-buttons'
              onClick={() => this.sort_by_Name(locations)}
            >
              Sort by Name
            </button>
            <button
              className='locations-buttons'
              onClick={() => this.sort_by_Climate(locations)}
            >
              Sort by Climate
            </button>
            <button
              className='locations-buttons'
              onClick={() => this.sort_by_Terrain(locations)}
            >
              Sort by Terrain
            </button>
          </div>
        ) : (
          <button
            className='locations-buttons'
            onClick={this.handle_for_location}
          >
            Show Locations
          </button>
        )}

        <ul className='locations_List'>
          {this.state.display ? locations__Info : null}
        </ul>
        <img
          className='people-logo'
          src='https://64.media.tumblr.com/03842137d459c4a0d7e31d70e6cd501a/tumblr_na9bv35Uj61rf1vfdo1_r3_500.gif'
          alt='ghibli'
        ></img>
      </div>
    );
  }
}
