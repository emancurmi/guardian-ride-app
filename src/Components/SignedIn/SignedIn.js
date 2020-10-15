import React, { Component } from 'react';
import moment from 'moment';
import Bar from '../Bar/Bar';
import './SignedIn.css';
import config from '../../config';
import engine from '../../engine';
import AddDrinkBtn from '../AddDrinkBtn/AddDrinkBtn';
import CallGuardianBtn from '../CallGuardianBtn/CallGuardianBtn';
import Loader from '../Loader/Loader';
import { read_cookie } from 'sfcookies';

export default class SignedIn extends Component {

    constructor(props) {

        super(props);
        if (read_cookie(config.cookie_key).length === 0) {
            props.history.push('/signup');
        }

        this.state = {
            config: config,
            userid: engine.decrypt(read_cookie(config.cookie_key)),
            userData: {
                userid: '',
                username: '',
                userphone: '',
                userpin: ''
            },
            selecteddrink: -1,
            dataDrinkUserIds: [],
            error: null,
            isLoading: false
        }
    }

    

    componentDidMount() {
        try {
            this.fetchuser();
            this.fetchfavouritedrinks();
            console.log(this.state.dataDrinkUserIds);
        }
        catch (e) { console.log(e) }
    }

    setUserData = data => {
        this.setState({
            userData: data,
            error: null,
            isLoading: false
        })
    }

    setDataDrinkUserIds = data => {
        this.setState({
            dataDrinkUserIds: data,
            error: null,
            isLoading: false
        })
    }

    fetchuser = () => {
        fetch(this.state.config.API_ENDPOINT + 'user/' + this.state.userid, {
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
                this.setUserData(data);
            })

            .catch(error => {
                console.error(error)
                this.setState({ error })
            })
    }

    fetchfavouritedrinks = () => {
        fetch(this.state.config.API_ENDPOINT + 'user_drink/?userid=' + this.state.userData.userid, {
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
                console.log(data);
                this.setDataDrinkUserIds(data);
                console.log(this.state.dataDrinkUserIds);
            })

            .catch(error => {
                console.error(error)
                this.setState({ error })
            })
    }

    calculateconsumtion = () => {
        let drinksid = [];
        let start = moment().subtract({ 'hours': 4, 'minutes': 0 }).format('MM-DD-YY HH:mm:ss Z');
        let end = moment().format('MM-DD-YY HH:mm:ss Z');

        let consumtion = 0;
        //fetch drinks by user in the last 4 hours.

        fetch(this.state.config.API_ENDPOINT + 'user_drink/?userid=' + this.state.userData.userid + '&start=' + start + '&end=' + end , {
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

            //add drinkid from data to drinksid
            .then(data => {
                this.drinksid = data.drinkid;
            })

            .catch(error => {
                console.error(error)
                this.setState({ error })
            })

        //foreach drink in dinkid
        drinksid.forEach(user_drink => {

            fetch(this.state.config.API_ENDPOINT + 'drink/' + user_drink.drinkid, {
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
                //add dinking value
                .then(data => {
                    this.consumtion += data.drinkalcoholvalue
                })

        })

        return consumtion;
    }

    renderDrinkButton = () => {
        let consumtion = this.calculateconsumtion();

        if (consumtion <= 10) {
            return <AddDrinkBtn drinkid={this.state.selecteddrink} />
        }
        else {
            return <CallGuardianBtn />
        }
    }

    render() {

        if (this.state.isLoading) {
            return (
                <Loader loadingtype={"Favourite Drinks"} />
            );
        }


        return (
            <div className="column center">
                <div className="linear-dark">
                    <div className="row center">
                        <div className="col-1">
                            <h1>Welcome {this.state.userData.username}</h1>
                        </div>
                    </div>
                </div>
                <Bar dataDrinkUserIds={this.state.dataDrinkUserIds} />
                {this.renderDrinkButton()}
            </div>
        )
    }
}	
