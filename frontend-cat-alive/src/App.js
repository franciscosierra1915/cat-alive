import React, { useState, useEffect } from 'react';
import { AnimatePresence } from "framer-motion";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useHistory } from "react-router";
//Pages
import Home from "./pages/home";
import Profile from "./pages/profile";
import Model from "./pages/model";
import CatList from './pages/CatList';
import MyCatList from './pages/MyCatList';
import MyFosterList from './pages/MyFosterList';
import SingleCat from './pages/SingleCat';
import SingleShelter from './pages/SingleShelter';
import MySingleCat from './pages/MySingleCat';
//components
import Header from "./components/header";
import SearchOrganizations from './components/searchOrganizations';
import Hamburger from './components/Hamburger';

//Styles
import "./App.scss";

const petfinderAPIKEY = process.env.REACT_APP_PETFINDER_API_KEY;
const petfinderAPISECRET = process.env.REACT_APP_PETFINDER_SECRET;

function App() {
  let history = useHistory();
  
  const [token, setToken] = useState('');
  const [cats, setCats] = useState('');
  const [location, setLocation] = useState('');
  const [shelterLocation, setShelterLocation] = useState('');
  const [shelters, setShelters] = useState('');
  const [clickedSingleCat, setClickedCat] = useState('');
  const [clickedSingleShelter, setClickedShelter] = useState('');
  const [userCats, setUserCats] = useState('')
  const [currentUser, setCurrentUser] = useState(null);

  console.log(cats)


  const signIn = (e) => {
    let objectConfig = {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: e.target.name.value,
        password: e.target.password.value
      })
    }
    fetch('http://localhost:3000/login', objectConfig)
    .then(res => res.json())
    .then(user => {
      setCurrentUser(user)
    })
  }

  const Signup = (e) => {
    let objectConfig = {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: {
          name: e.target.name.value,
          email: e.target.email.value,
          password: e.target.password.value,
          foster: true, 
          adopter: false
        }
      })
    }
    fetch('http://localhost:3000/users', objectConfig)
    .then(res => res.json())
    .then(user => setCurrentUser(user))
  }

  useEffect(() => {
    fetch('http://localhost:3000/currentuser', {
      credentials: 'include'
    })
    .then(res => res.json())
    .then(user => {
      setCurrentUser(user)
    })
  }, []);

  useEffect(() => {
    fetch('http://localhost:3000/currentuser', {
      credentials: 'include'
    })
    .then(res => res.json())
    .then(user => {setUserCats(user.cats)})
  }, [currentUser]);

 
  useEffect(() => {
    async function fetchToken() {
      let response = await fetch("https://api.petfinder.com/v2/oauth2/token", {
        body: `grant_type=client_credentials&client_id=${petfinderAPIKEY}&client_secret=${petfinderAPISECRET}`,
        headers: { "Content-Type": "application/x-www-form-urlencoded"},
        method: "POST"});
        response = await response.json()
        setToken(response.access_token)
    }
    fetchToken()
  },[])

  useEffect(() => {
    async function fetchCats() {
      let response = await fetch(`https://api.petfinder.com/v2/animals?type=cat&page=2&location=${location}&distance=40`, {headers: { Authorization: `Bearer ${token}`}});
      response = await response.json()
      setCats(response.animals)
      history.push('/cat-list')
    }
    fetchCats();

  }, [location])

  useEffect(() => {
    async function fetchShelter() {
      let response = await fetch(`https://api.petfinder.com/v2/organizations?location=${shelterLocation}&limit=5`, {headers: { Authorization: `Bearer ${token}`}});
      response = await response.json()
      console.log(response)
      setShelters(response.organizations)
      history.push('/shelters-list')
    }
    fetchShelter();

  }, [shelterLocation])

  const getZip = (zip) => {
    setLocation(zip)
  }
  const getShelterZip = (zip) => {
    setShelterLocation(zip)
  }

  const imageDetails = {
    width: 524,
    height: 650,
  };

  const redirectHome = () => {
    history.push('/')
  }

  const displaySingleCat = (clickedCat) => {
    setClickedCat(clickedCat);
    history.push('/single-cat')
  }

  const displaySingleShelter = (clickedShelter) => {
    setClickedShelter(clickedShelter);
    history.push('/single-shelter')
  }
  const displayMySingleCat = (clickedCat) => {
    setClickedCat(clickedCat);
    history.push('/my-single-cat')
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
            photo: catToBeAdopted.photos[0].full,
            age: catToBeAdopted.age,
            description: catToBeAdopted.description,
            status: catToBeAdopted.status,
            size: catToBeAdopted.size,
            gender: catToBeAdopted.gender,
            petfinder_url: catToBeAdopted.url,
            fostered: false, 
            adopted: true,
            shelter_id: 1,
            vet_id: 1,
            user_id: currentUser.id
        })
    }
    fetch('http://localhost:3000/cats', objectConfig)
    .then(res => res.json())
    .then(newAdoptedCat => setUserCats(userCats => [...userCats, newAdoptedCat]))
    history.push('/my-cat-list')
    } else {
      console.log('Sorry, please sign in')
    }
  }

  const fosterCat = (catToBeAdopted) => {
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
            photo: catToBeAdopted.photos[0].full,
            age: catToBeAdopted.age,
            description: catToBeAdopted.description,
            status: catToBeAdopted.status,
            size: catToBeAdopted.size,
            gender: catToBeAdopted.gender,
            petfinder_url: catToBeAdopted.url,
            fostered: true, 
            adopted: false,
            shelter_id: 1,
            vet_id: 1,
            user_id: currentUser.id
        })
    }
    fetch('http://localhost:3000/cats', objectConfig)
    .then(res => res.json())
    .then(newAdoptedCat => setUserCats(userCats => [...userCats, newAdoptedCat]))
    history.push('/my-foster-list')
    } else {
      console.log('Sorry, please sign in')
    }
  }

    return (
      <div>
        <Header redirectHome={redirectHome} currentUser={currentUser} getSignIn={e => signIn(e)} logout={() => setCurrentUser(null)} Signup={e => Signup(e)}/>
        <Route
          render={({ location }) => (
            <AnimatePresence initial={false} exitBeforeEnter>
              <Switch location={location} key={location.pathname}>
                <Route exact path='/' render={() => <Home imageDetails={imageDetails} currentUser={currentUser} getSignIn={e => signIn(e)} Signup={e => Signup(e)} logout={() => setCurrentUser(null)}/>}/>
                <Route exact path='/profile' render={() => <Profile imageDetails={imageDetails}/>}/>
                <Route exact path='/cat-alive' render={() => <Model currentUser={currentUser} imageDetails={imageDetails} getZip={e => getZip(e)}/>}/>
                <Route exact path='/cat-list' render={() => <CatList currentUser={currentUser} cats={cats} redirectHome={redirectHome} displaySingleCat={displaySingleCat}/>}/>
                <Route exact path='/my-cat-list' render={() => <MyCatList currentUser={currentUser} cats={userCats ? userCats.filter((cat) => cat.adopted) : null} redirectHome={redirectHome} displayMySingleCat={displayMySingleCat}/>}/>
                <Route exact path='/my-foster-list' render={() => <MyFosterList currentUser={currentUser} cats={userCats ? userCats.filter((cat) => cat.fostered) : null} redirectHome={redirectHome} displayMySingleCat={displayMySingleCat}/>}/>
                <Route exact path='/single-cat' render={() => <SingleCat currentUser={currentUser} cat={clickedSingleCat} adoptCat={adoptCat} fosterCat={fosterCat} getSignIn={e => signIn(e)} logout={() => setCurrentUser(null)}/>}/>
                <Route exact path='/my-single-cat' render={() => <MySingleCat currentUser={currentUser} cat={clickedSingleCat} />}/>
                <Route exact path='/search-organizations' render={() => <SearchOrganizations getShelterZip={e => getShelterZip(e)}/>}/>
                <Route exact path='/shelters-list' render={() => <Hamburger redirectHome={redirectHome} shelters={shelters} displaySingleShelter={displaySingleShelter} />}/>
                <Route exact path='/single-shelter' render={() => <SingleShelter shelter={clickedSingleShelter}/>}/>
              </Switch>
            </AnimatePresence>
          )}
        />
      </div>
    );

}
export default App;

