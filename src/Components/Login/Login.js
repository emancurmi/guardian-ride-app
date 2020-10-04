import React, { Component } from 'react';
import './Login.css';
export default class Login extends Component {
    render() {
        return (
            <div>
                <h1>Login</h1>
                <form>
                    <input type="Text" placeholder="Phonenumber" />
                    <br/>
                    <input type="Password" placeholder="Pin" />
                    <br />
                    <button className="blue" onClick={() => this.nextPath('/SignUp')}>Login</button>
                </form>
            </div>
        )
    }
}