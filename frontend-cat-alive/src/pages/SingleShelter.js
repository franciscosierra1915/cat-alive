import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import noPhoto from '../images/no-photo-available-small.png';
import axios from "axios";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import emailIcon from '../images/email.png';
import facebookIcon from '../images/facebook-icon.png';
import websiteIcon from '../images/website-icon.png';
import phoneIcon from '../images/phone-icon.png';
import addressIcon from '../images/address-icon-2.png';
import instagramIcon from '../images/instagram.png';
import twitterIcon from '../images/twitter.png';
import youtubeIcon from '../images/youtube.png';


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

const SingleShelter = ({shelter}) => {

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries,
  });

  const shelterAddress = shelter.address.postcode;
  const [shelterLat, setShelterLat] = useState('');
  const [shelterLng, setShelterLng] = useState('');

  useEffect(() => {

    axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
      params:{
        address:shelterAddress,
        key: process.env.REACT_APP_GOOGLE_API_KEY,
      }
    })
    .then(function(response){
      setShelterLat(response.data.results[0].geometry.location.lat)
      setShelterLng(response.data.results[0].geometry.location.lng)
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
            {shelter.photos.length !== 0 ? 
              <motion.img
              className='single-cat-img-tag'
              key={shelter.photos[0].full}
              src={shelter.photos[0].full}
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
              <Link to='/shelters-list'><div className='go-back'>Back to list</div></Link>
              </motion.div>
            <motion.h1 className='single-shelter-name' variants={fadeInUp}>{shelter.name}</motion.h1>
            <motion.div variants={fadeInUp}>
              <span className='category'>{shelter.phone ? <div><img src={phoneIcon} alt="emailIcon" className='phone-icon'/><div className='phone-info'>{shelter.phone}</div></div> : null}</span>
            </motion.div>
            <motion.p variants={fadeInUp}>{shelter.mission_statement ? shelter.mission_statement : `No Mission Statement` }</motion.p>
            <motion.div variants={fadeInUp} className='qty-price'>
              <span className='price'>{shelter.email ? <div><img src={emailIcon} alt="emailIcon" className='email-icon'/>{shelter.email}</div> : null}</span>
              <span className='contact-cat'><img src={addressIcon} alt="emailIcon" className='address-icon'/>{shelter.address.address1}, {shelter.address.city}, {shelter.address.state}</span>
            </motion.div>
            <GoogleMap
              id="map"
              mapContainerStyle={mapContainerStyle}
              zoom={15}
              center={{ lat: shelterLat ? shelterLat : null, lng: shelterLng ? shelterLng : null}}>
                <Marker position={{ lat: shelterLat ? shelterLat : null, lng: shelterLng ? shelterLng : null}}/>
            </GoogleMap>
            <motion.div variants={fadeInUp} className='additonals'>
              <span>{shelter.social_media.facebook ? <a href='#' className='facebook-icon'><img src={facebookIcon} alt="facebookIcon" className='facebook-icon' onClick={()=> window.open(`${shelter.social_media.facebook}`, "_blank")}/></a> : null}</span>
              <span>{shelter.social_media.instagram ? <a href='#' className='facebook-icon'><img src={instagramIcon} alt="facebookIcon" className='facebook-icon' onClick={()=> window.open(`${shelter.social_media.instagram}`, "_blank")}/></a> : null}</span>
              <span>{shelter.social_media.twitter ? <a href='#' className='facebook-icon'><img src={twitterIcon} alt="facebookIcon" className='facebook-icon' onClick={()=> window.open(`${shelter.social_media.twitter}`, "_blank")}/></a> : null}</span>
              <span>{shelter.social_media.youtube ? <a href='#' className='facebook-icon'><img src={youtubeIcon} alt="facebookIcon" className='facebook-icon' onClick={()=> window.open(`${shelter.social_media.youtube}`, "_blank")}/></a> : null}</span>
              <span>{shelter.website ? <a href='#'><img src={websiteIcon} alt="websiteIcon" className='website-icon' onClick={()=> window.open(`${shelter.website}`, "_blank")}/></a> : null}</span>
            </motion.div>
            <motion.div variants={fadeInUp} className='btn-row'>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  </motion.div>
);
}

export default SingleShelter;
