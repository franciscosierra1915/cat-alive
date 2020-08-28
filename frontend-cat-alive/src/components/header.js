import React from "react";
import { Link } from "react-router-dom";
import logo from '../images/logo-cat-alive.png';
const Header = (props) => {
  return (
    <header>
      <div className='container'>
        <div className='row space-between'>
          <div className='logo'>
          <img className='logo-img' src={logo} alt="logo" onClick={() => props.redirectHome()}/>
          </div>
          <div className='menu'>Menu</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
