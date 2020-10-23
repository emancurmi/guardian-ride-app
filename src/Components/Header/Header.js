import React, { Component } from 'react';
import config from '../../config';
import './Header.css';

export default class Header extends Component {
    render() {
        return (
            <div>
                {console.log(config.API_ENDPOINT)}
            </div>
        )
    }
}