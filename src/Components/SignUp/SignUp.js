import React, { Component } from 'react';
import './SignUp.css';
import Register from '../Register/Register';
import Login from '../Login/Login';
import config from '../../config';
import { read_cookie } from 'sfcookies';
import { Redirect } from 'react-router-dom'

export default class SignUp extends Component {
    renderRedirect = () => {
        if (read_cookie(config.cookie_key).length !== 0) {
            return <Redirect to='/SignedIn/' />
        }
    }


    render() {
        return (

            <div className="column center">
                {this.renderRedirect()}
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
