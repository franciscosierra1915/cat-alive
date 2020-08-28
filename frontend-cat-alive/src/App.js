import React, { Component } from 'react';
import CatList from './components/CatList'
import Nav from './components/Nav'


export default class App extends Component {

  constructor() {
    super();
    this.state = {
      token: '',
      cats: [],
      location: ''
    }
  }

  async getCats() {
      await fetch("https://api.petfinder.com/v2/oauth2/token", {
      body: "grant_type=client_credentials&client_id=JKzCDRiinh1KUoKprth3Gg59iZLgtPYIz8IuuiMqn1RsJe9nkp&client_secret=iKq555MkoHFDCEHXdY5Vh4B1XmxAOT7ry0OgeBti",
      headers: { "Content-Type": "application/x-www-form-urlencoded"},
      method: "POST"})
      .then(res => res.json())
      .then(data => this.setState({token: data.access_token}))
      await fetch(`https://api.petfinder.com/v2/animals?type=cat&page=2&location=${this.state.location}`, {headers: { Authorization: `Bearer ${this.state.token}`}})
      .then(r => r.json())
      .then(data => this.setState({cats: data.animals}))
      console.log(this.state.cats[0].photos[0].full)
  }

  search = (location) => {
    this.setState({location: location})
    this.getCats()
  } 

  render() {
    return (
      <div>
        <Nav search={this.search}/>
        <CatList cats={this.state.cats}/>
      </div>
    )
  }
}


