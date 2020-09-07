import React from 'react';
import { Link } from "react-router-dom";
import Login from '../components/login-from-menu';
import LoginFoster from '../components/login-foster'
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

    handleLogOut = () => {
        if (this.props.currentUser === null) {
            alert('No user is currently logged in!');
            this.setState({ on: !this.state.on})
        } else {
            fetch('http://localhost:3000/logout', {
                credentials: 'include',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(() => this.props.logout())
            .then(this.setState({ on: !this.state.on}))
            .then(this.props.redirectHome())
        }
    }
    render() {
        
        return (
        <div className={"menu-button " + (this.state.on ? 'on' : '')}>
            <div className="menu-button--toggle" onClick={this.onClickHandler.bind(this)}>Menu</div>
            <ul className="menu-button--list">
            {this.props.currentUser ? 
            <Link to={`/profile`} style={{ textDecoration: 'none' }}><li className='menu-item'onClick={this.onClickHandler.bind(this)}>Profile</li></Link> 
            : 
            <li className='menu-item' onClick={this.onClickHandler.bind(this)}>{<Login getSignIn={this.props.getSignIn}/>}</li>
            }
            {this.props.currentUser ? 
            null
            :
            <li className='menu-item' onClick={this.onClickHandler.bind(this)}>{<LoginFoster Signup={this.props.Signup}/>}</li>
            }
            <li className='menu-item' onClick={this.handleLogOut}>Logout</li>
            </ul>
        </div>);
    }

}