import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import config from '../../config';
import engine from '../../engine';
import './Login.css';
import { bake_cookie, read_cookie } from 'sfcookies';

export default class Login extends Component {

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
        }
    }

    setUser = user => {
        this.setState({
            userid: user[0].userid,
            username: user[0].username,
            userpin: user[0].userpin,
            userphone: user[0].userphone,
            error: null,
            isLoading: false,
        })
        //console.log(user);
        bake_cookie(config.cookie_key, engine.encrypt(this.state.userid.toString()));
        this.props.handleLogIn();
        this.renderRedirect();
    }

    renderRedirect = () => {
        if (read_cookie(config.cookie_key).length !== 0) {
            return <Redirect to='/SignedIn/' />
        }
    }

    handleSubmit = e => {

        e.preventDefault();

        const { userphone, userpin } = e.target;

        const user = {
            userphone: userphone.value,
            userpin: userpin.value
        }

        this.setState({ error: null })

        fetch(this.state.config.API_ENDPOINT + 'user/?userphone=' + user.userphone + '&userpin=' + user.userpin, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${this.state.config.API_TOKEN}`
            }
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(error => Promise.reject(error))
                }
                return res.json()
            })

            .then(data => {
                //console.log(data.length);
                if (data.length !== 0) {
                    userphone.value = '';
                    userpin.value = '';
                    this.setUser(data);
                }
                else {
                    console.error("User not found!")
                    this.setState({ error: "User not found!" });
                }
            })

            .catch(error => {
                console.error(error)
                this.setState({ error })
            })
    }

    showerror = () => {
        if (this.state.error != null) {
            return (<p>{this.state.error}</p>);
        }
    }

    render() {
        return (
            <div>
                {this.renderRedirect()}
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit} >
                    <input type="number" id="userphone" name="userphone" placeholder="Phone number" title="Enter Phone Number" required /><br />
                    <input type="Password" id="userpin" name="userpin" placeholder="PIN number" title="Enter Pin Number" required /><br />
                    <button id="btnLoginSubmit" className="blue" type="submit">Sign In</button>
                </form>
                {this.showerror()}
            </div>
        )
    }
}