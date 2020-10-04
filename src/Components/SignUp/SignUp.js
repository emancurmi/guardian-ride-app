import React, { Component } from 'react';
import './SignUp.css';
import Register from '../Register/Register';
import Login from '../Login/Login';

export default class SignUp extends Component {
    render() {
        return (
            <div className="column center">
                <div className="linear-dark">
                    <div className="row center">
                        <div className="col-2">
                                <Login />

                        </div>
                        <div className="col-2">
                                <Register />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
