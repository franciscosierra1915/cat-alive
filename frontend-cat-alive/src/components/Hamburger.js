import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import './Hamburger.scss';
import {
  staggerText,
  staggerReveal,
  fadeInUp,
  handleHover,
  handleHoverExit,
  handleCityReturn,
  handleCity,
  staggerRevealClose
} from "./Animations";

import dallas from "../images/dallas.webp";
import austin from "../images/austin.webp";
import newyork from "../images/newyork.webp";
import sanfrancisco from "../images/sanfrancisco.webp";
import beijing from "../images/beijing.webp";

import noPhoto from '../images/no-photo-available.png';

const cities = [
  { name: "Dallas", image: dallas },
  { name: "Austin", image: austin },
  { name: "New York", image: newyork },
  { name: "San Francisco", image: sanfrancisco },
  { name: "Beijing", image: beijing }
];

const transition = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] };

const Hamburger = ({ redirectHome, shelters}) => {
  const [state, setState] = useState({
    initial: null,
    clicked: true,
  });
  const handleMenu = () => {
    redirectHome();
    if (state.clicked === true) {
      setState({
        clicked: !state.clicked,
      });
    } else if (state.clicked === false) {
      setState({
        clicked: !state.clicked,
      });
    }
  };
  // Create varibles of our dom nodes
  let menuLayer = useRef(null);
  let reveal1 = useRef(null);
  let reveal2 = useRef(null);
  let cityBackground = useRef(null);
  let line1 = useRef(null);
  let line2 = useRef(null);
  let line3 = useRef(null);
  let info = useRef(null);

  useEffect(() => {
    // If the menu is open and we click the menu button to close it.
    if (state.clicked === false) {
      // If menu is closed and we want to open it.

      staggerRevealClose(reveal2, reveal1);
      // Set menu to display none
      gsap.to(menuLayer, { duration: 1, css: { display: "none" } });
    } else if (
      state.clicked === true ||
      (state.clicked === true && state.initial === null)
    ) {
      // Set menu to display block
      gsap.to(menuLayer, { duration: 0, css: { display: "block" } });
      //Allow menu to have height of 100%
      gsap.to([reveal1, reveal2], {
        duration: 0,
        opacity: 1,
        height: "100%"
      });
      staggerReveal(reveal1, reveal2);
      fadeInUp(info);
      staggerText(line1, line2, line3);
    }
  }, [state]);

  return (
    <motion.div
    initial={{ opacity: 0 }}
    exit={{ opacity: 0 }}
    animate={{
      opacity: 1,
      transition: { transition }
    }}
    id='my-hamburger'>
      <div className="container">
        <div className="wrapper">
          <div className="inner-header">
            <div className="logo">
            </div>
            <div className="menu">
            </div>
          </div>
        </div>
      </div>
      <motion.div 
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { transition }
          }}
          className='container'>
          <div ref={el => (menuLayer = el)} className='hamburger-menu'>
          <div ref={el => (reveal1 = el)} className='menu-secondary-background-color'></div>
          <div ref={el => (reveal2 = el)} className='menu-layer'>
          <div ref={el => (cityBackground = el)} className='menu-city-background'></div>
              <div className='container'>
                <div className='wrapper'>
                  <div className='menu-links'>
                    <nav>
                      <ul onMouseEnter={e => handleHover(e)} onMouseOut={e => handleHoverExit(e)}>
                        <li onMouseEnter={() => handleCity(shelters[0].photos.length !== 0 ? shelters[0].photos[0].full : noPhoto, cityBackground)}
                            onMouseOut={() => handleCityReturn(cityBackground)}
                            ref={el => (line1 = el)}>
                            {shelters[0].name}
                        </li>
                        <li onMouseEnter={() => handleCity(shelters[1].photos.length !== 0 ? shelters[1].photos[0].full : noPhoto, cityBackground)}
                            onMouseOut={() => handleCityReturn(cityBackground)}
                            ref={el => (line2 = el)}>
                            {shelters[1].name}
                        </li>
                        <li onMouseEnter={() => handleCity(shelters[2].photos.length !== 0 ? shelters[2].photos[0].full : noPhoto, cityBackground)}
                            onMouseOut={() => handleCityReturn(cityBackground)}
                            ref={el => (line3 = el)}>
                            {shelters[2].name}
                        </li>
                        <li onMouseEnter={() => handleCity(shelters[3].photos.length !== 0 ? shelters[3].photos[0].full : noPhoto, cityBackground)}
                            onMouseOut={() => handleCityReturn(cityBackground)}>
                            {shelters[3].name}
                        </li>
                        <li onMouseEnter={() => handleCity(shelters[4].photos.length !== 0 ? shelters[4].photos[0].full : noPhoto, cityBackground)}
                            onMouseOut={() => handleCityReturn(cityBackground)}>
                            {shelters[4].name}
                        </li>
                      </ul>
                    </nav>
                    <div ref={el => (info = el)} className='info'>
                      <h3></h3>
                      <p>
                      </p>
                    </div>
                    <div className='locations'>
                      Our Locations:
                      {/* Returning the list of cities */}
                      {cities.map(el => (
                        <span
                          onClick={handleMenu}
                          key={el.name}
                          onMouseEnter={() => handleCity(el.image, cityBackground)}
                          onMouseOut={() => handleCityReturn(cityBackground)}>
                          {el.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </motion.div>
</motion.div>
  );
};

export default Hamburger;

