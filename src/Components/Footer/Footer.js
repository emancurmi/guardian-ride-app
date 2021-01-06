import React, { Component } from 'react';
import './Footer.css';

export default class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <div className="dark">
                    <div className="row content">
                        <div className="column col-4">
                            <h6>Guardian Ride</h6>
                            <p>A new smart way and responsible to get home.</p>
                        </div>
                        <div className="column col-4 center">
                            <h6>News Letter Signup</h6>
                            <form>
                                <label for="email">E-mail: </label>
                                <input type="email" title="email" id="email" placeholder="E-mail" /><br />
                                <button className="blue">Sign Up</button>
                            </form>
                        </div>
                        <div className="column col-4 center">
                            <h6>Contact Us</h6>
                            <form>
                                <label for="name">Name: </label>
                                <input type="text" title="name" id="name" placeholder="Name" /><br />
                                <label for="contactemail">E-mail: </label>
                                <input type="email" title="contact_email" id="contactemail" placeholder="E-mail" /><br />
                                <label for="comment">Comment: </label>
                                <input type="text" title="comment" id="comment" placeholder="Comment" rows="5" /><br />
                                <button className="blue" onClick="/">Submit</button>
                            </form>
                        </div>
                        <div className="column col-4">
                            <h6>Address</h6>
                            <p>Guardian Ride Development<br />
                            10880 Malibu Point,<br />
                            Florida
                            </p>
                        </div>
                    </div>
                </div>
                <div className="dark">
                    <div className="row">
                        <div className="column col-1 center" >
                            <p>Designed & Developed by Eman Curmi &copy;
                        Copyright 2020</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}