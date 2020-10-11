import React from 'react';
import { Component } from 'react';
import './Loader.css';

export default class Loader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loadingtype: props.loadingtype,
        }
    }

    render() {
        return (
            <header className="Loading">
                <h1>Loading {this.state.loadingtype}</h1>
            </header>
        );
    }
}


