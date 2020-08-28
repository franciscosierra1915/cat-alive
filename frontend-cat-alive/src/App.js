import React, { useState, useEffect } from 'react';
import { AnimatePresence } from "framer-motion";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//Pages
import Home from "./pages/home";
import Model from "./pages/model";
//components
import Header from "./components/header";
//Styles
import "./App.scss";

function App() {

  const [token, setToken] = useState('');
  const [cats, setCats] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    async function fetchToken() {
      let response = await fetch("https://api.petfinder.com/v2/oauth2/token", {
        body: "grant_type=client_credentials&client_id=JKzCDRiinh1KUoKprth3Gg59iZLgtPYIz8IuuiMqn1RsJe9nkp&client_secret=iKq555MkoHFDCEHXdY5Vh4B1XmxAOT7ry0OgeBti",
        headers: { "Content-Type": "application/x-www-form-urlencoded"},
        method: "POST"});
        response = await response.json()
        setToken(response.access_token)
    }
    fetchToken()
  },[])

  useEffect(() => {
    async function fetchCats() {
      let response = await fetch(`https://api.petfinder.com/v2/animals?type=cat&page=2&location=77449`, {headers: { Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJKS3pDRFJpaW5oMUtVb0twcnRoM0dnNTlpWkxndFBZSXo4SXV1aU1xbjFSc0plOW5rcCIsImp0aSI6ImYyZmE2MzlhYmI0NDcxN2YxZDU4ZTIxOWYyMGQ3M2Y3NzFhNzc1OGQwZmU5MjYwNDc0NDE1YTI2OTgzZGViMmFlYzA4Y2JiMGVlMGQ0M2UxIiwiaWF0IjoxNTk4NjEyNzE4LCJuYmYiOjE1OTg2MTI3MTgsImV4cCI6MTU5ODYxNjMxOCwic3ViIjoiIiwic2NvcGVzIjpbXX0.nLkPJ3FbaVyMxTViqAf_LtFq0kN77JjnHPbCgPuJhxj5lomn32a2ZZ1oboeW6OOZ2rRZI-1JerAmsziTc8qpNqVdYGWIgAjzC2HxhCjaUZZI-V_NDbuyhAVzkhI4IlSixQuLR_I-KF4kl4qYyDzi4jGIZ3h5CSPNJ6NO4rbu3UWcPkZIS4WhH8AFSynK4F7REAubmiRJ6ydkPCGKp1U_CSjuSXnMbMLYNqsxGzsrA_PdtTTyV0zTusbz4IjqLjAScrbQ-G3u4e91cvGsqHTypRlqANchP4918KQDUbDSE-jqLoC97WiNUVF_20xrASnH_lSKnjAHMo5t1x_ZCeGokA`}});
      response = await response.json()
      setCats(response.animals)
    }
    fetchCats();
  }, [])

    const imageDetails = {
      width: 524,
      height: 650,
    };
    return (
      <Router>
        <Header />
        <Route
          render={({ location }) => (
            <AnimatePresence initial={false} exitBeforeEnter>
              <Switch location={location} key={location.pathname}>
                <Route exact path='/' render={() => <Home imageDetails={imageDetails} />}/>
                <Route exact path='/cat-alive' render={() => <Model imageDetails={imageDetails} />}/>
              </Switch>
            </AnimatePresence>
          )}
        />
      </Router>
    );

}

export default App;
