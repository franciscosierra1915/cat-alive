import React from "react";
import logo from '../images/logo-cat-alive.png';
import MenuButton from './menu'
const Header = (props) => {
  return (
    <header>
      <div className='container'>
        <div className='row space-between'>
          <div className='logo'>
          <img className='logo-img' src={logo} alt="logo" onClick={() => props.redirectHome()}/>
          </div>
          <div className='menu'>{<MenuButton getSignIn={props.getSignIn} logout={props.logout} currentUser={props.currentUser} Signup={props.Signup} redirectHome={props.redirectHome}/>}</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
