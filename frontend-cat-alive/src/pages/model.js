import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useViewportScroll, useTransform } from "framer-motion";
import styled from 'styled-components';
import { useHistory } from "react-router";


//Elements
import {Searchbar} from '../styles/elements'

//Icons
import searchIcon from '../svg/search.svg'

//Ease
const transition = { duration: 1.4, ease: [0.6, 0.01, -0.05, 0.9] };

const firstName = {

  animate: {
    transition: {
      delayChildren: 0.6,
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
};

const lastName = {

  animate: {
    transition: {
      delayChildren: 0.6,
      staggerChildren: 0.04,
      staggerDirection: 1,
    },
  },
};

const letter = {
  initial: {
    y: 400,
  },
  animate: {
    y: 0,
    transition: { duration: 1, ...transition },
  },
};

const Model = ({ imageDetails, getZip }) => {
  let history = useHistory();
  const { scrollYProgress } = useViewportScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  const [canScroll, setCanScroll] = useState(false);

  useEffect(() => {
    if (canScroll === false) {
      document.querySelector("body").classList.add("no-scroll");
    } else {
      document.querySelector("body").classList.remove("no-scroll");
    }
  }, [canScroll]);

  const handleSubmit = (e) => {
    e.preventDefault()
    let form = e.currentTarget 
    getZip(e.target.location.value)
    form.reset()
  }

  return (
    <motion.div
      onAnimationComplete={() => setCanScroll(true)}
      className='single'
      initial='initial'
      animate='animate'
      exit={{ opacity: 0 }}
      transition={transition}>
      <div className='container fluid'>
        <div className='row center top-row'>
          <div className='top'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { delay: 1.2, ...transition },
              }}
              className='details'>
              <div className='location'>
                <span>VETS &</span>
                <span>DOCTORS</span>
              </div>
              <Link to={`/search-organizations`} style={{ textDecoration: 'none', color: '#21496c' }}><div className='mua'>Shelters & Organizaitons</div></Link>
            </motion.div>
            <motion.div className='model'>
              <motion.span className='first' variants={firstName}>
                <motion.span variants={letter}>C</motion.span>
                <motion.span variants={letter}>a</motion.span>
                <motion.span variants={letter}>t</motion.span>
              </motion.span>
              <motion.span className='last' variants={lastName}>
                <motion.span variants={letter}>A</motion.span>
                <motion.span variants={letter}>l</motion.span>
                <motion.span variants={letter}>i</motion.span>
                <motion.span variants={letter}>v</motion.span>
                <motion.span variants={letter}>e</motion.span>
                <motion.span variants={letter}>!</motion.span>
              </motion.span>
            </motion.div>
          </div>
        </div>
        <div className='row bottom-row'>
          <div className='bottom'>
            <motion.div className='image-container-single'>
              <motion.div
                initial={{
                  y: "-50%",
                  width: imageDetails.width,
                  height: imageDetails.height,
                }}
                animate={{
                  y: 0,
                  width: "100%",
                  height: window.innerWidth > 1440 ? 800 : 400,
                  transition: { delay: 0.2, ...transition },
                }}
                className='thumbnail-single'>
                <motion.div
                  className='frame-single'
                  whileHover='hover'
                  transition={transition}>
                  <motion.img
                    src={require("../images/adopt-a-pet-2.png")}
                    alt='an image'
                    style={{ scale: scale }}
                    initial={{ scale: 1.1 }}
                    animate={{
                      transition: { delay: 0.2, ...transition },
                      y: window.innerWidth > 1440 ? -600 : -300,
                    }}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
      <div className='detailed-information'>
        <div className='container'>
          <div className='row'>
            <h2 className='title'>
              Save a live!
            </h2>
            <p>
            Cat Alive! is an online, searchable database of animals who need homes. 
            It is also a directory of nearly 11,000 animal shelters and adoption organizations across 
            the U.S., Canada and Mexico. Organizations maintain their own home pages and available-pet databases.
            </p>
          </div>
        </div>
      </div>
        <div className="row">
          <Searchbar>
          <div className='search-container'>
           <form onSubmit={e => handleSubmit(e)}>
           <img src={searchIcon} alt="searchIcon" className='search-icon'/>
           <input name="location" placeholder="Enter ZIP" type="text" className='input-text'/>
           <input type='submit'className='input-submit'/>
           </form>
           </div>
          </Searchbar>
        </div>
    </motion.div>
  );
};

export default Model;


