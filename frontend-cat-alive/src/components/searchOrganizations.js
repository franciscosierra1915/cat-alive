import React from "react";
import { motion } from "framer-motion";
import {SearchOrg} from '../styles/elements';
import searchIcon from '../svg/search.svg';
import { useHistory } from "react-router";
import ProgressiveImage from "react-progressive-image";

const transition = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] };

const SearchOrganizations = ({image, getShelterZip}) => {

  const handleSubmit = (e) => {
    e.preventDefault()
    let form = e.currentTarget 
    getShelterZip(e.target.location.value)
    form.reset()
  }

  let history = useHistory();

  return(
  <>
    <main>
      <motion.div initial={{ opacity: 0 }} exit={{ opacity: 0 }} animate={{ opacity: 1, transition: { transition }}} className='container'>
        <motion.div className="row" initial={{ opacity: 0 }} exit={{ opacity: 0 }} animate={{ opacity: 1, transition: { transition }}}>
          <SearchOrg>
            <div className='search-container'>
              <form onSubmit={e => handleSubmit(e)}>
                <img src={searchIcon} alt="searchIcon" className='search-icon'/>
                  <input name="location" placeholder="Enter ZIP" type="text" className='input-text'/>
                <input type='submit'className='input-submit'/>
              </form>
            </div>
          </SearchOrg>
      </motion.div>
        <div className='row center'>
          <div className='image-container'>
          <div className='thumbnail' ref={image} style={{ width: 1100, height: 650, marginTop: -1350, borderRadius: 30 }}>
              <motion.div initial={{ opacity: 0 }} exit={{ opacity: 0 }} animate={{ opacity: 1, transition: { transition } }}className='frame'>
                  <ProgressiveImage src={require("../images/shelters2.png")} placeholder={require("../images/shelters2.png")}>
                    {(src) => (
                      <motion.img
                        src={src}
                        alt='cat-one'
                        whileHover={{ scale: 1.1 }}
                        transition={transition}
                      />
                    )}
                  </ProgressiveImage>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  </>
);
}
export default SearchOrganizations;
