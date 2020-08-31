import React, { useState, useEffect } from 'react';
import { AnimatePresence } from "framer-motion";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Redirect } from 'react-router-dom';
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

function App() {
  let history = useHistory();
  
  const [token, setToken] = useState('');
  const [cats, setCats] = useState('');
  const [location, setLocation] = useState('');
  const [clickedCat, setClickecCat] = useState('')

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
      // debugger
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



    return (
      <div>
        <Header redirectHome={redirectHome}/>
        <Route
          render={({ location }) => (
            <AnimatePresence initial={false} exitBeforeEnter>
              <Switch location={location} key={location.pathname}>
                <Route exact path='/' render={() => <Home imageDetails={imageDetails} />}/>
                <Route exact path='/cat-alive' render={() => <Model imageDetails={imageDetails} getZip={e => getZip(e)}/>}/>
                <Route exact path='/cat-list' render={() => <CatList cats={cats} redirectHome={redirectHome} displaySingleCat={displaySingleCat}/>}/>
                <Route exact path='/single-cat' render={() => <SingleCat cat={clickedCat}/>}/>
              </Switch>
            </AnimatePresence>
          )}
        />
      </div>
    );

}
export default App;

