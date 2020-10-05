import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import './Login.css';

export default class Login extends Component {

    nextPath(path) {
        this.props.history.push(path)
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <form>
                    <input type="Text" placeholder="Phonenumber" />
                    <br/>
                    <input type="Password" placeholder="Pin" />
                    <br />
                    <button className="blue" onClick={() => this.nextPath('/signedin')}>Login</button>
                </form>
            </div>
        )
    }
}