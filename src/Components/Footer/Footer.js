import React, { Component } from 'react';
import './Footer.css';

export default class Footer extends Component {
    render() {
        return (
            <footer className="row">
                <div className="col-3">Designed & Developed by Eman Curmi</div>
                <div className="col-3"></div>
                <div className="col-6">text col 6</div>
            </footer>
        )
    }
}