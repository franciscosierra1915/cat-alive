import React, { Component } from 'react';

class Search extends Component {
  constructor() {
    super() 
    this.stage= {
      location: '',
    }
  }

  setLocation = (e) => this.setState({ location: e.target.value })

  // handleSubmit = (e) => {
  //   e.preventDefault()
  //   let form = e.currentTarget
  //   form.reset()
  // }

  render() {
    return (
      <div className="search-container">
        <form className="search">
          <input onChange={this.setLocation} type="text" name="location" placeholder="Entenr ZIP" className="input-text"/>
          <input type="submit" name="submit" value="Find Cats" className="input-submit"/>
        </form>
      </div>
    );
  }

}

export default Search;