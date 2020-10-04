import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import './Home.css';

export default class Home extends Component {

    nextPath(path) {
        this.props.history.push(path)
    }

    render() {
        return (
           <div className="column center">
                <div className="linear-dark">
                    <div className="row center">
                        <div className="col-2">
                            <img src="logo.png" style={{"width":"100%"}} />
                        </div>
                        <div className="col-2">
                            <div className="column">
                                <div className="col-1">
                                    <h1>Guardian Ride</h1>
                                    <div className="row center spacebetween">
                                        <button className="clear">About Us</button>
                                        <button className="blue" onClick={() => this.nextPath('/SignUp') }>Sign Up</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="dark">
                    <div className="row content">
                        <div className="col-3">
                            <h4>Our Idea</h4>
                            <p>A new smart way and responsible to get home. Saving lives and creating an easier way of our customers to contact someone to pick them up if they're unable to drive</p>
                        </div>
                        <div className="col-3">
                            <h4>Statistics</h4>
                            <p></p>
                        </div>
                        <div className="col-3">
                            <h4>Saved Button Clicked</h4>
                            <p></p>
                            <button className="blue">Sign Up</button>
                        </div>
                    </div>
                </div>
                <div className="breaker"></div>
                <div className="light">
                    <div className="column content">
                        <div className="row center">
                        <h1 className="col-1">Idea</h1>
                        <h4 className="col-1">Why Choosing Guardian Ride?</h4>
                            </div>
                            <div className="row">
                        <p className="col-2">Guardian Ride is an app based on the requirement of the user knowing the driver in person or through a firend our drivers are not anyone of the street, our drivers are the ones you choose to pick you up.</p>
                        <p className="col-2">As the app is still in its initial phases we still advise you to use responsibly and always check whos is the driving.</p>
                        </div>
                    </div>
                </div>
                <div className="dark">
                    <div className="column content">
                        <div className="row center">
                            <h1 className="col-1">The Developer</h1>
                            <h4 className="col-1">Experience & Know-How</h4>
                        </div>
                        <div className="row">

                        </div>
                    </div>
                </div>
                <div className="breaker"></div>
                <div className="light">
                    <div className="column content">
                        <div className="row center">
                            <h1 className="col-1">Idea</h1>
                            <h4 className="col-1">Why Choosing Guardian Ride?</h4>
                        </div>
                        <div className="row">
                            <p className="col-2">Guardian Ride is an app based on the requirement of the user knowing the driver in person or through a firend our drivers are not anyone of the street, our drivers are the ones you choose to pick you up.</p>
                            <p className="col-2">As the app is still in its initial phases we still advise you to use responsibly and always check whos is the driving.</p>
                        </div>
                    </div>
                </div>
                <div className="white">
                    <div className="column content">
                        <div className="row center">
                            <h1 className="col-1">Idea</h1>
                            <h4 className="col-1">Why Choosing Guardian Ride?</h4>
                        </div>
                        <div className="row">
                            <p className="col-2">Guardian Ride is an app based on the requirement of the user knowing the driver in person or through a firend our drivers are not anyone of the street, our drivers are the ones you choose to pick you up.</p>
                            <p className="col-2">As the app is still in its initial phases we still advise you to use responsibly and always check whos is the driving.</p>
                        </div>
                    </div>
                </div>
           </div>
        )
    }
}