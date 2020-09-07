import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import noPhoto from '../images/no-photo-available-small.png';


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

const MySingleCat = ({currentUser, cat}) => {

  return(
  <motion.div initial='initial' animate='animate' exit={{ opacity: 0 }}>
    <div className='fullscreen'>
      <div className='product'>
        <motion.div
          className='single-cat-img-div'
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}>
            {cat.photo ? 
              <motion.img
              className='single-cat-img-tag'
              key={cat.photo}
              src={cat.photo}
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
            <Link to='/my-cat-list' style={{ textDecoration: 'none', color: '#21496c' }}>
              <motion.div variants={fadeInUp}>
                <div id='go-back-profile'>Back to my cats</div>
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
          </motion.div>
        </div>
      </div>
    </div>
  </motion.div>
);
}

export default MySingleCat;
