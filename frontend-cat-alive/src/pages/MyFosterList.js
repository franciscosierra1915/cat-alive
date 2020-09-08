import React, { useState, useEffect, useRef } from "react";
import "./MyCatList.scss";
import { Link } from "react-router-dom";
import {
  staggerText,
  staggerReveal,
  fadeInUp,
  handleHover,
  handleHoverExit,
  handleCityReturn,
  handleCity,
  staggerRevealClose
} from "../components/Animations";

import noPhoto from '../images/no-photo-available.png';
import { motion, useViewportScroll, useTransform } from "framer-motion";

import useWindowSize from "../hooks/useWindowSize";

const transition = { duration: 1.4, ease: [0.6, 0.01, -0.05, 0.9] };

function FosterList(props) {

  //Hook to grab window size
  const size = useWindowSize();

  // Ref for parent div and scrolling div
  const CatList = useRef();
  const scrollContainer = useRef();

  // Configs
  const data = {
    ease: 0.1,
    current: 0,
    previous: 0,
    rounded: 0
  };

  // Run scrollrender once page is loaded.
  useEffect(() => {requestAnimationFrame(() => skewScrolling())}, []);

  //set the height of the body.
  useEffect(() => {
    setBodyHeight();
  }, [size.height]);

  //Set the height of the body to the height of the scrolling div
  const setBodyHeight = () => {
    document.body.style.height = `${
      scrollContainer.current.getBoundingClientRect().height
    }px`;
  };

  // Scrolling
  const skewScrolling = () => {
    if (scrollContainer.current === null) {
      cancelAnimationFrame(() => skewScrolling())
    } else {
          //Set Current to the scroll position amount
    data.current = window.scrollY;
    // Set Previous to the scroll previous position
    data.previous += (data.current - data.previous) * data.ease;
    // Set rounded to
    data.rounded = Math.round(data.previous * 100) / 100;

    // Difference between
    const difference = data.current - data.rounded;
    const acceleration = difference / size.width;
    const velocity = +acceleration;
    const skew = velocity * 7.5;

    //Assign skew and smooth scrolling to the scroll container
    scrollContainer.current.style.transform = `translate3d(0, -${data.rounded}px, 0) skewY(${skew}deg)`;

    //loop vai raf
    requestAnimationFrame(() => {skewScrolling()});
    }
  };

  return (
    <motion.div
    className='single'
    initial='initial'
    animate='animate'
    exit={{ opacity: 0 }}
    transition={transition}>
      <motion.div
      exit={{ opacity: 0 }}
      transition={transition}
       ref={CatList} 
       className="CatList">
        <motion.div 
        exit={{ opacity: 0 }}
        transition={transition}
        className="scroll"
        ref={scrollContainer}>
          {props.cats ? props.cats.map((cat, index) => (
            <>
              <div key={cat.id} className="img-container">
              <img src={cat.photo ? cat.photo : noPhoto} alt={`cat ${index}`}/>
              </div>
              <h2 
              onMouseEnter={e => handleHover(e)}
              onMouseOut={e => handleHoverExit(e)}
              onClick={() => props.displayMySingleCat(cat)}>
              {cat.name}
              </h2>
            </>
          )) : null}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default FosterList;
