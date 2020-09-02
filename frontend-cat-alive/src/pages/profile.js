import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ProgressiveImage from "react-progressive-image";


const transition = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] };



const Profile = ({ imageDetails, image }) => {

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
                <Link to={`/`}>
                  <ProgressiveImage
                    src={require("../images/man-and-cat.jpg")}
                    placeholder={require("../images/man-and-cat.jpg")}>
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
              <Link to={`/my-cat-list`} style={{ textDecoration: 'none', color: '#21496c' }}><div className='title'>My cats</div></Link>
              <div className='location'>
                <span>My vets</span>
                {/* <span>My shleters</span> */}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </main>
  </>
);
}
export default Profile;
