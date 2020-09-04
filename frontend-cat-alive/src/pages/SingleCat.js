import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import noPhoto from '../images/no-photo-available-small.png';
import LoginForAccess from '../components/login-for-access';
import axios from "axios";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";

let easing = [0.6, -0.05, 0.01, 0.99];

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.05
    }
  }
};

const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0,
    transition: { duration: 0.6, ease: easing }
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing
    }
  }
};

const libraries = ["places"];
const mapContainerStyle = {
  height: "30vh",
  width: "30vw",
};

const SingleCat = ({currentUser, cat, adoptCat, getSignIn, logout}) => {

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAhLNb9-FifzWU0NWbWJ21iUNrp7pM9yXo',
    libraries,
  });

  // const [catAddress, setcatAddress] = useState(cat.contact.address.address1);
  const catAddress = cat.contact.address.address1;
  const [catLat, setCatLat] = useState('');
  const [catLng, setCatLng] = useState('');

  useEffect(() => {

    axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
      params:{
        address:catAddress,
        key: 'AIzaSyAhLNb9-FifzWU0NWbWJ21iUNrp7pM9yXo',
      }
    })
    .then(function(response){
      setCatLat(response.data.results[0].geometry.location.lat)
      setCatLng(response.data.results[0].geometry.location.lng)
      console.log(response)
    })
    .catch(function(error){
      console.log(error)
    })
  }, [])

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return(
  <motion.div initial='initial' animate='animate' exit={{ opacity: 0 }}>
    <div className='fullscreen'>
      <div className='product'>
        <motion.div
          className='single-cat-img-div'
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}>
            {cat.photos.length !== 0 ? 
              <motion.img
              className='single-cat-img-tag'
              key={cat.photos[0].full}
              src={cat.photos[0].full}
              animate={{ x: 0, opacity: 1 }}
              initial={{ x: 200, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.2 }}
              />
            :
            <motion.img
              key={noPhoto}
              src={noPhoto}
              animate={{ x: 0, opacity: 1 }}
              initial={{ x: 200, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.2 }}
              />
            }
        </motion.div>
        <div className='product-details'>
          <motion.div variants={stagger} className='inner'>
            <Link to='/cat-list'>
              <motion.div variants={fadeInUp}>
                <div className='go-back'>Back to list</div>
              </motion.div>
            </Link>
            <motion.div variants={fadeInUp}>
              <span className='category'>{cat.age ? `Age: ${cat.age}` : null}</span>
            </motion.div>
            <motion.h1 className='single-cat-name' variants={fadeInUp}>{cat.name}</motion.h1>
            <motion.p variants={fadeInUp}>{cat.description ? cat.description : `No description` }</motion.p>
            <motion.div variants={fadeInUp} className='additonals'>
              <span>{cat.gender ? `Gender: ${cat.gender}` : null}</span>
              <span>{cat.size ? `Size: ${cat.size}` : null}</span>
            </motion.div>
            <motion.div variants={fadeInUp} className='qty-price'>
              <span className='price'>{cat.status ? `Status: ${cat.status}` : null}</span>
            </motion.div>
            <GoogleMap
              id="map"
              mapContainerStyle={mapContainerStyle}
              zoom={15}
              center={{ lat: catLat ? catLat : null, lng: catLng ? catLng : null}}>
                <Marker position={{ lat: catLat ? catLat : null, lng: catLng ? catLng : null}}/>
            </GoogleMap>
            <motion.div variants={fadeInUp} className='btn-row'>
              <button className='add-to-cart' onClick={() => adoptCat(cat)}>{currentUser ? `Adopt` : <LoginForAccess getSignIn={getSignIn} currentUser={currentUser} logout={logout}/>}</button>
              <button className='subscribe'>Foster</button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  </motion.div>
);
}

export default SingleCat;
