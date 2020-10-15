import React, { Component } from 'react';
import './AddDrinkBtn.css';
import config from '../../config';
import engine from '../../engine';
import { read_cookie } from 'sfcookies';
import moment from 'moment';

export default class AddDrinkBtn extends Component {

    constructor(props) {


        super(props);
        if (read_cookie(config.cookie_key).length === 0) {
            props.history.push('/signup');
        }

        this.state = {
            config: config,
            userid: engine.decrypt(read_cookie(config.cookie_key)),
            drinkid: this.props.drinkid,
            error: null,
            isLoading: true,
        }
    }

    handleAddDrinkSubmit = e => {

        e.preventDefault();

        const drinkuserlink = {
            drinkid: this.state.drinkid,
            userid: this.state.userid,
            userdrinktime: moment().format('MM-DD-YY HH:mm:ss Z')//1602644590339
        }

        console.log(drinkuserlink);

        fetch(this.state.config.API_ENDPOINT + 'user_drink/', {
            method: 'POST',
            body: JSON.stringify(drinkuserlink),
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
                console.log(data);
            })

            .catch(error => {
                console.error(error);
                this.setState({ error })
            })
    }


    render() {
        return (
            <div className="light">
                <div className="column content">
                    <div className="row center">
                        <form onSubmit={this.handleAddDrinkSubmit}>
                            <button className="bigredbutton" type="submit">Add Drink</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}