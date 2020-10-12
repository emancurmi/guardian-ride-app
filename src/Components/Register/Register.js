import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import './Register.css';
import config from '../../config';
import engine from '../../engine';
import { bake_cookie, read_cookie } from 'sfcookies';

export default class Register extends Component {

    constructor(props) {

        super(props);

        this.state = {
            config: config,
            userid: '',
            userphone: '',
            userpin: '',
            username: '',
            error: null,
            isLoading: true,
            redirect: false
        }
    }

    addUser = user => {
        this.setState({
            userid: user.userid,
            userphone: user.userphone,
            userpin: user.userpin,
            username: user.username,
            redirect: true
        })
        bake_cookie(config.cookie_key, engine.encrypt(this.state.userid.toString()));
        this.renderRedirect();
    }


    renderRedirect = () => {
        if (read_cookie(config.cookie_key).length !== 0) {
            return <Redirect to='/SignedIn/' />
        }
    }

    handleSubmit = e => {

        e.preventDefault();

        const { username, userphone } = e.target;

        const user = {
            username: username.value,
            userphone: userphone.value,
            userpin: Math.random().toString().substr(2, 4)
        }

        this.setState({ error: null })

        fetch(this.state.config.API_ENDPOINT + 'user/', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${this.state.config.API_TOKEN}`
            }
        })

            .then(res => {
                if (!res.ok) {
                    return res.json().then(error => Promise.reject(error));
                }
                return res.json();
            })

            .then(data => {
                username.value = '';
                userphone.value = '';
                this.addUser(data);
            })

            .catch(error => {
                console.error(error);
                this.setState({ error })
            })
    }

    render() {
        return (
            <div>
                {this.renderRedirect()}
                <h1>Register</h1>
                <form onSubmit={this.handleSubmit} >
                    <input type="Text" id="username" name="username" placeholder="Name" pattern="[A-Za-z]+" title="User name should be made up of Capital and small letters Only" required /><br />
                    <input type="Text" id="userphone" name="userphone" placeholder="Phone number" title="Enter Phone Number" required /><br />
                    <button id="btnSubmit" className="blue" type="submit">Register</button>
                </form>
            </div>
        )
    }
}