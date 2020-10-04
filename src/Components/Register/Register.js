import React, { Component } from 'react';
import './Register.css';

export default class Register extends Component {
    render() {
        return (
            <div>
                <h1>Register</h1>
                <form>
                    <input type="Text" placeholder="Phonenumber" />
                    <br />
                    <button className="blue" onClick={() => this.nextPath('/SignUp')}>Register</button>
                </form>
            </div>
            )
    }
}