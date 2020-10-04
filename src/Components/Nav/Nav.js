import React, { Component } from 'react';
import './Nav.css';

export default class Nav extends Component {
    render() {
        return (
            <nav>
                <div className="menu-icon">
                    <i className="fa fa-bars fa-2x"></i>
                </div>
                <div className="logo">
                    <img src="logo.png" height="50px" />Guardian Ride
               </div>
                <div className="menu">
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/">About</a></li>
                        <li><a href="/">Blog</a></li>
                        <li><a href="/">Contact</a></li>
                    </ul>
                </div>
            </nav>
        )
    }
}