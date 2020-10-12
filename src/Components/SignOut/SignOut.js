import React, { Component } from 'react';
import { delete_cookie } from 'sfcookies';
import { Redirect } from 'react-router-dom';
import config from '../../config';

export default class SignOut extends Component {
    render() {
        return (
            <div>
                {
                    delete_cookie(config.cookie_key)
                }
                
                <Redirect to='/' />
            </div>
        )
    }
}