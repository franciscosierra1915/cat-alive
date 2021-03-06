import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ProgressiveImage from "react-progressive-image";
import Login from '../components/login'
import LoginFoster from '../components/login-foster'

const transition = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] };



const Home = ({ imageDetails, image, currentUser, getSignIn, Signup, logout }) => {

  return(
  <>
    <main>
      <motion.div 
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { transition }
      }}
      className='container'>
        <div className='row center'>
          <div className='image-container'>
            <div
              className='thumbnail'
              ref={image}
              style={{
                width: imageDetails.width,
                height: imageDetails.height,
              }}>
              <div className='frame'>
                <Link to={`/cat-alive`}>
                  <ProgressiveImage
                    src={require("../images/adopt-a-pet-2.png")}
                    placeholder={require("../images/adopt-a-pet-2.png")}>
                    {(src) => (
                      <motion.img
                        src={src}
                        alt='cat-one'
                        whileHover={{ scale: 1.1 }}
                        transition={transition}
                      />
                    )}
                  </ProgressiveImage>
                </Link>
              </div>
            </div>
            <motion.div
              exit={{ opacity: 0 }}
              transition={transition}
              className='information'>
              <div className='title'>{currentUser ? <Link to={`/cat-alive`} style={{ textDecoration: 'none', color: '#21496c' }} >Adopt</Link> : <Login getSignIn={getSignIn}/>}</div>
              <div className='location'>
                <span id='foster-home'>{currentUser ? <Link to={`/cat-alive`} style={{ textDecoration: 'none', color: '#21496c' }} >Foster</Link> : <LoginFoster Signup={Signup}/>}</span>
                <span>Donate</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </main>
  </>
);
}
export default Home;
