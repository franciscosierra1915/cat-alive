import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import noPhoto from '../images/no-photo-available.png';

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

const SingleCat = props => (
  <motion.div initial='initial' animate='animate' exit={{ opacity: 0 }}>
    <div className='fullscreen'>
      <div className='product'>
        <motion.div
          className='single-cat-img-div'
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}>
            {props.cat.photos.length !== 0 ? 
              <motion.img
              className='single-cat-img-tag'
              key={props.cat.photos[0].full}
              src={props.cat.photos[0].full}
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
                <a className='go-back'>Back to list</a>
              </motion.div>
            </Link>
            <motion.div variants={fadeInUp}>
              <span className='category'>{props.cat.age ? `Age: ${props.cat.age}` : null}</span>
            </motion.div>
            <motion.h1 className='single-cat-name' variants={fadeInUp}>{props.cat.name}</motion.h1>
            <motion.p variants={fadeInUp}>{props.cat.description ? props.cat.description : `No description` }</motion.p>
            <motion.div variants={fadeInUp} className='additonals'>
              <span>{props.cat.gender ? `Gender: ${props.cat.gender}` : null}</span>
              <span>{props.cat.size ? `Size: ${props.cat.size}` : null}</span>
            </motion.div>
            <motion.div variants={fadeInUp} className='qty-price'>
              {/* <div className='qty'>
                <div className='minus'>-</div>
                <div className='amount'>1</div>
                <div className='add'>+</div>
              </div> */}
              <span className='price'>{props.cat.status ? `Status: ${props.cat.status}` : null}</span>
            </motion.div>
            <motion.div variants={fadeInUp} className='btn-row'>
              <button className='add-to-cart' onClick={() => props.adoptCat(props.cat)}>Adopt</button>
              <button className='subscribe'>Foster</button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  </motion.div>
);


export default SingleCat;
