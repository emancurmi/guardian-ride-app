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
import Popup from '../Popup/Popup';

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
                userid: 0,
                username: '',
                userphone: '',
                userpin: ''
            },
            selectedDrinks: 1,
            dataDrinkUserIds: [],
            consumption: 0,
            error: null,
            isLoading: true,
            showPopup: false
        }
    }

    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }

    //check if component loaded
    componentDidMount() {
        try {
            this.calculateconsumtion();
            this.fetchuser();
            this.fetchfavouritedrinks();
            if (this.props.showPopup === true) { this.togglePopup.bind(this) }
        }
        catch (e) { console.log(e) }
    }

    //update state seleted drink 
    setselectedDrinks = data => {
        this.setState({
            selectedDrinks: data
        })
    }

    //update userinformation in state
    setUserData = data => {
        this.setState({
            userData: data,
            error: null,
        })
    }

    //update list of drinks in state
    setDataDrinkUserIds = data => {
        this.setState({
            dataDrinkUserIds: data,
            error: null,
        })
    }

    //update consumption data in state
    setCounsumption = consumption => {
        this.setState({
            consumption: consumption,
            error: null,
        })
    }

    //Update isLoading data in state
    setIsLoading = data => {
        this.setState({
            isLoading: data
        })
    }

    //fetch user api
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

    //fetch favourite drinks from api
    fetchfavouritedrinks = () => {
        fetch(this.state.config.API_ENDPOINT + 'user_drink/?userid=' + this.state.userid, {
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
                this.setDataDrinkUserIds(data);
                this.setIsLoading(false);
            })

            .catch(error => {
                console.error(error)
                this.setState({ error })
            })
    }

    //calucate alcohol consumption 
    calculateconsumtion = () => {
        let start = moment().subtract({ 'hours': 4, 'minutes': 0 }).format('MM-DD-YY HH:mm:ssz');
        let end = moment().format('MM-DD-YY HH:mm:ssz');

        let consumption = 0;

        fetch(this.state.config.API_ENDPOINT + 'user_drink/?userid=' + this.state.userid + '&start=' + start + '&end=' + end, {
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
                data.map(drink => {
                    if (drink.drinkid > 0) {
                        fetch(this.state.config.API_ENDPOINT + 'drink/' + drink.drinkid, {
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
                                consumption += data.drinkalcoholvalue
                                this.setCounsumption(consumption);
                            })

                            .catch(error => {
                                console.error(error)
                                this.setState({ error })
                            })
                    }
                    else {
                        consumption += 3;
                        this.setCounsumption(consumption);
                    }
                    
                })
            })
            .catch(error => {
                console.error(error)
                this.setState({ error })
            })

        
    }

    //render button according to alcohol content
    renderDrinkButton = () => {
        if (this.state.consumption <= 10) {
            return <AddDrinkBtn drinkid={this.state.selectedDrinks} calculateconsumtion={this.calculateconsumtion} />
        }
        else {
            return <CallGuardianBtn />
        }
    }

    //handel toggle of drink radiobutton in bar
    toggleCheckbox = e => {
        let value = e.target.value;
        this.setselectedDrinks(value);
    }

    render() {

        //if (this.state.dataDrinkUserIds.length) {
        if (this.state.isLoading) {
            return (
                <Loader loadingtype={"Favourite Drinks"} />
            );
        }
        else {
            return (
                <div className="column center">
                    <div className="linear-dark">
                        <div className="row center">
                            <div className="col-1">
                                <h1>Welcome {this.state.userData.username}</h1>
                            </div>

                        </div>
                    </div>
                    <Bar dataDrinkUserIds={this.state.dataDrinkUserIds} selectedDrinks={this.state.selectedDrinks} toggleCheckbox={this.toggleCheckbox} />
                    {this.renderDrinkButton()}

                    {this.state.showPopup ?
                        <Popup
                            text='Welcome to Guardian App. Please update Profile Information'
                            closePopup={this.togglePopup.bind(this)}
                        />
                        : null
                    }

                </div>
            )
        }
    }
}	
