import React, { Component } from 'react';
import config from '../../config';
import './Nav.css';
import { read_cookie } from 'sfcookies';
import { Link } from 'react-router-dom';

export default class Nav extends Component {
    render() {
        return (
            
            <nav>
                <div className="menu-icon">
                    <i className="fa fa-bars fa-2x"></i>
                </div>
                <div className="logo">
                    <Link to="/"><img src="logo.png" alt="logo" height="50px" />Guardian Ride</Link>
               </div>
                <div className="menu">
                    <ul>
                        {
                        //<li><a href="/">Home</a></li>
                        //<li><a href="/">About</a></li>
                        //<li><a href="/">Blog</a></li>
                        //<li><a href="/">Contact</a></li>
                        }
                        {(read_cookie(config.cookie_key).length !== 0) ? <li><Link to="/SignedIn">Dashboard</Link></li> : ""}
                        {(read_cookie(config.cookie_key).length !== 0) ? <li><Link to="/Profile">Profile</Link></li> : ""}
                        {(read_cookie(config.cookie_key).length !== 0) ? <li><Link to="/SignOut" >Log Out</Link></li> : <li><Link to="/SignUp">Log In</Link></li>}
                    </ul>
                </div>
            </nav>
        )
    }
}