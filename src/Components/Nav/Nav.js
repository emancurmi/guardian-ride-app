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
                    <Link to="/"><img src="logo.png" alt="Mobile Logo Image" height="50px" /></Link>
                    {(read_cookie(config.cookie_key).length !== 0) ? <Link to="/SignedIn"><i className="fa fa-tachometer" aria-hidden="true"></i></Link> : ""}
                    {(read_cookie(config.cookie_key).length !== 0) ? <Link to="/Profile"><i className="fa fa-user" aria-hidden="true"></i></Link> : ""}
                    {(read_cookie(config.cookie_key).length !== 0) ? <Link to="/SignOut" ><i className="fa fa-sign-out" aria-hidden="true"></i></Link> : <Link to="/SignUp"><i className="fa fa-sign-in" aria-hidden="true"></i></Link>}
                </div>
                <div className="logo">
                    <Link to="/"><img src="logo.png" alt="Desktop Logo Image" height="50px" /></Link>
               </div>
                <div className="menu">
                    <ul>
                        {(read_cookie(config.cookie_key).length !== 0) ? <li><Link to="/SignedIn"><i className="fa fa-tachometer" aria-hidden="true"></i>Dashboard</Link></li> : ""}
                        {(read_cookie(config.cookie_key).length !== 0) ? <li><Link to="/Profile"><i className="fa fa-user" aria-hidden="true"></i>Profile</Link></li> : ""}
                        {(read_cookie(config.cookie_key).length !== 0) ? <li><Link to="/SignOut" ><i className="fa fa-sign-out" aria-hidden="true"></i>Log Out</Link></li> : <li><Link to="/SignUp"><i className="fa fa-sign-in" aria-hidden="true"></i>Log In</Link></li>}
                    </ul>
                </div>
            </nav>
        )
    }
}