import React, { Component } from 'react';
import CatList from './CatList'


export default class App extends Component {

  constructor() {
    super();
    this.state = {
      token: '',
      cats: []
    }
  }

  async componentDidMount() {
      await fetch("https://api.petfinder.com/v2/oauth2/token", {
      body: "grant_type=client_credentials&client_id=JKzCDRiinh1KUoKprth3Gg59iZLgtPYIz8IuuiMqn1RsJe9nkp&client_secret=iKq555MkoHFDCEHXdY5Vh4B1XmxAOT7ry0OgeBti",
      headers: { "Content-Type": "application/x-www-form-urlencoded"},
      method: "POST"})
      .then(res => res.json())
      .then(data => this.setState({token: data.access_token}))
      await fetch("https://api.petfinder.com/v2/animals?type=dog&page=2", {headers: { Authorization: `Bearer ${this.state.token}`}})
      .then(r => r.json())
      .then(data => this.setState({cats: data.animals}))
  }

  render() {
    return (
      <div>
        <CatList cats={this.state.cats}/>
      </div>
    )
  }
}


