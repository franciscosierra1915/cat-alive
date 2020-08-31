import React, { useState, useEffect } from 'react';
import { AnimatePresence } from "framer-motion";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useHistory } from "react-router";
//Pages
import Home from "./pages/home";
import Model from "./pages/model";
import CatList from './pages/CatList'
import SingleCat from './pages/SingleCat'
//components
import Header from "./components/header";
//Styles
import "./App.scss";

let sameUser

function App() {
  let history = useHistory();
  
  const [token, setToken] = useState('');
  const [cats, setCats] = useState('');
  const [location, setLocation] = useState('');
  const [clickedCat, setClickecCat] = useState('')
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    let sameUser
    if (currentUser !== sameUser) {
    fetch('http://localhost:3000/currentuser', {
      credentials: 'include'
    })
    .then(res => res.json())
    .then(user => {
      sameUser = user
      setCurrentUser(user)})}
  }, []);

  const signIn = (e) => {
    let objectConfig = {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: e.target.name.value,
        email: e.target.email.value,
        password: e.target.password.value
      })
    }
    fetch('http://localhost:3000/login', objectConfig)
    .then(res => res.json())
    .then(user => {
      setCurrentUser(user)
    })
  }

 
  useEffect(() => {
    async function fetchToken() {
      let response = await fetch("https://api.petfinder.com/v2/oauth2/token", {
        body: "grant_type=client_credentials&client_id=jMnaf5a9J9EDqQVK6V7QelV93MshQsfwB2yNLCvGj1ZeSIL90R&client_secret=lRPuPyBzCKqR6juid6hAR8EEIwUReytjrHxHUs87",
        headers: { "Content-Type": "application/x-www-form-urlencoded"},
        method: "POST"});
        response = await response.json()
        setToken(response.access_token)
    }
    fetchToken()
  },[])

  useEffect(() => {
    async function fetchCats() {
      let response = await fetch(`https://api.petfinder.com/v2/animals?type=cat&page=2&location=${location}`, {headers: { Authorization: `Bearer ${token}`}});
      response = await response.json()
      setCats(response.animals)
      history.push('/cat-list')
    }
    fetchCats();

  }, [location])

  const getZip = (zip) => {
    setLocation(zip)
  }

  const imageDetails = {
    width: 524,
    height: 650,
  };

  const redirectHome = () => {
    history.push('/')
  }

  const displaySingleCat = (clickedCat) => {
    setClickecCat(clickedCat);
    history.push('/single-cat')
  }

  const adoptCat = (catToBeAdopted) => {
    if (currentUser !== null) {
      let objectConfig = {
        credentials: 'include',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            petfinder_id: catToBeAdopted.id,
            name: catToBeAdopted.name,
            age: catToBeAdopted.age,
            description: catToBeAdopted.description,
            status: catToBeAdopted.status,
            size: catToBeAdopted.size,
            gender: catToBeAdopted.gender,
            petfinder_url: catToBeAdopted.url,
            shelter_id: 1,
            vet_id: null,
            user_id: currentUser.id
        })
    }
    fetch('http://localhost:3000/cats', objectConfig)
    .then(res => res.json())
    .then(newAdoptedCat => console.log(newAdoptedCat))
    } else {
      console.log('not here yet')
    }
  }

    return (
      <div>
        <Header redirectHome={redirectHome}/>
        <Route
          render={({ location }) => (
            <AnimatePresence initial={false} exitBeforeEnter>
              <Switch location={location} key={location.pathname}>
                <Route exact path='/' render={() => <Home imageDetails={imageDetails} currentUser={currentUser} getSignIn={e => signIn(e)} logout={() => setCurrentUser(null)}/>}/>
                <Route exact path='/cat-alive' render={() => <Model currentUser={currentUser} imageDetails={imageDetails} getZip={e => getZip(e)}/>}/>
                <Route exact path='/cat-list' render={() => <CatList currentUser={currentUser} cats={cats} redirectHome={redirectHome} displaySingleCat={displaySingleCat}/>}/>
                <Route exact path='/single-cat' render={() => <SingleCat currentUser={currentUser} cat={clickedCat} adoptCat={adoptCat}/>}/>
              </Switch>
            </AnimatePresence>
          )}
        />
      </div>
    );

}
export default App;

