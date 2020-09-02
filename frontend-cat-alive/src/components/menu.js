import React from 'react';
import { Link } from "react-router-dom";
import Login from '../components/login-from-menu'
import "./menu.scss";

export default class MenuButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
        on: false
        }
    }
    onClickHandler() {
        this.setState({ on: !this.state.on });
    }

    handleLogOut = () => (
        fetch('http://localhost:3000/logout', {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(() => this.props.logout())
    )
    render() {
        
        return (
        <div className={"menu-button " + (this.state.on ? 'on' : '')}>
            <div className="menu-button--toggle" onClick={this.onClickHandler.bind(this)}>Menu</div>
            <ul className="menu-button--list">
        {this.props.currentUser ? <Link to={`/profile`} style={{ textDecoration: 'none' }}><li className='menu-item'>Profile</li></Link> : <li className='menu-item'>{<Login currentUser={this.props.currentUser} getSignIn={this.props.getSignIn} logout={this.props.logout}/>}</li>}
            <li className='menu-item' onClick={this.handleLogOut}>Logout</li>
            </ul>
        </div>);
    }

}