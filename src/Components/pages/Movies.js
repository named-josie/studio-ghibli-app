import React, { Component } from 'react'
import { Dropdown } from '../../Dropdown'
export default class Movies extends Component {
    constructor() {
        super()
        this.state = {
          collection: [],
          value: '',
        }
      }
      componentDidMount() {
        fetch('https://ghibliapi.herokuapp.com/films/')
          .then((response) => response.json())
          .then((res) => this.setState({ collection: res }))
      }
      onChange = (event) => {
        this.setState({ value: event.target.value })
      }
      render() {
        return (
          <div className="movies">
            <h2>Select a Movie</h2>
            <Dropdown
              name={this.state.title}
              options={this.state.collection}
              onChange={this.onChange}
            />
          </div>
        )
      }
    }