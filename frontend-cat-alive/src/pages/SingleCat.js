import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import noPhoto from '../images/no-photo-available-small.png';
import LoginForAccess from '../components/login-for-access';
import axios from "axios";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import emailIcon from '../images/email.png'
import addressIcon from '../images/address-icon-2.png'


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
  height: "20vh",
  width: "40vw",
};

const SingleCat = ({currentUser, cat, adoptCat, getSignIn, logout, fosterCat}) => {

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries,
  });

  const catAddress = cat.contact.address.address1;
  const [catLat, setCatLat] = useState('');
  const [catLng, setCatLng] = useState('');

  useEffect(() => {

    axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
      params:{
        address:catAddress,
        key: process.env.REACT_APP_GOOGLE_API_KEY,
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
              <motion.div variants={fadeInUp}>
              <Link to='/cat-list'><div className='go-back'>Back to list</div></Link>
              </motion.div>
            <motion.h1 className='single-cat-name' variants={fadeInUp}>{cat.name}</motion.h1>
            <motion.div variants={fadeInUp}>
              <span className='category'>{cat.age ? `Age: ${cat.age}` : null}</span>
            </motion.div>
            <motion.p variants={fadeInUp}>{cat.description ? cat.description : `No description` }</motion.p>
            <motion.div variants={fadeInUp} className='additonals'>
              <span>{cat.gender ? `Gender: ${cat.gender}` : null}</span>
              <span>{cat.size ? `Size: ${cat.size}` : null}</span>
            </motion.div>
            <motion.div variants={fadeInUp} className='qty-price'>
              <span className='price'>{cat.contact.email ? <div><img src={emailIcon} alt="emailIcon" className='email-icon'/>{cat.contact.email}</div> : null}</span>
              <span className='contact-cat'><img src={addressIcon} alt="emailIcon" className='address-icon'/>{cat.contact.address.address1}, {cat.contact.address.city}, {cat.contact.address.state}</span>
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
              <button className='subscribe'onClick={() => fosterCat(cat)}>{currentUser ? `Foster` : <LoginForAccess getSignIn={getSignIn} currentUser={currentUser} logout={logout}/>}</button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  </motion.div>
);
}

export default SingleCat;
