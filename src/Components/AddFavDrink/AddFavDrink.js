import React, { Component } from 'react';
//import { withRouter } from 'react-router-dom';
import './AddFavDrink.css';
import { read_cookie } from 'sfcookies';
import config from '../../config';
import engine from '../../engine';
import Checkbox from '../Checkbox/Checkbox';

export default class AddFavDrink extends Component {

    constructor(props) {

        super(props);
        if (read_cookie(config.cookie_key).length === 0) {
            props.history.push('/signup');
        }

        this.state = {
            config: config,
            userid: engine.decrypt(read_cookie(config.cookie_key)),
            drinkData: [],
            selectedDrinks: [],
            drinkuserslinkData: [],
            error: null,
            isLoading: true
        }
    }

    setDrinkData = drinkData => {
        this.setState({
            drinkData,
            error: null,
            isLoading: false
        })
    }

    fetchalldrinks = () => {

        fetch(this.state.config.API_ENDPOINT + 'drink/', {
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
            .then(this.setDrinkData)
            .catch(error => {
                console.error(error)
                this.setState({ error })
            })
    }

    fetchdrinkbyname = (drinkname) => {

        fetch(this.state.config.API_ENDPOINT + 'drink/?drinkname='+ drinkname , {
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
                this.state.drinkuserslinkData.push(data);
            })
            .catch(error => {
                console.error(error)
                this.setState({ error })
            })
    }


    componentDidMount() {
        try {
            this.fetchalldrinks();
        }
        catch (e) { console.log(e) }
    }
    

    toggleCheckbox = drink => {
        if (this.state.selectedDrinks.findIndex(e => e === drink) !== -1) {
            this.state.selectedDrinks.splice(this.state.selectedDrinks.findIndex(e => e === drink), 1)
        }
        else {
            this.state.selectedDrinks.push(drink);
        }

    }

    createCheckbox = drink => (
        <Checkbox
            label={drink.drinkname}
            handleCheckboxChange={this.toggleCheckbox}
            key={drink.drinkid}
        />
    )

    createCheckboxes = () => (
        this.state.drinkData.map(this.createCheckbox)
    )

    setDrinks = drinkData => {
        this.setState({
            drinkData,
            error: null,
            isLoading: false
        })
    }

    addDrink = drink => {
        this.setState({
            drinkData: [...this.state.drinkData, drink],
        })
    }

    pushtodb = drink => {
        
            const drinkuserlink = {
                drinkid: drink.drinkid,
                userid: this.state.userid,
                userdrinktime: "0000000000000" //1602644590339
            }

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
    

    handleCreateDrinkSubmit = e => {

        e.preventDefault();

        ////----- Form Section Processing -----////

        const { drinkname, drinkalcoholvalue } = e.target;

        if (drinkname.value !== "" | drinkalcoholvalue.value !== "") {
            //setup drink
            const drink = {
                drinkname: drinkname.value,
                drinkalcoholvalue: drinkalcoholvalue.value
            }

            //check if drink form was filled

            fetch(this.state.config.API_ENDPOINT + 'drink/', {
                method: 'POST',
                body: JSON.stringify(drink),
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
                    drinkname.value = '';
                    drinkalcoholvalue.value = '';
                    this.addDrink(data);
                    this.setDrinks(this.state.drinkData);
                })

                .catch(error => {
                    console.error(error);
                    this.setState({ error })
                })

            this.setState({ error: null })
        }
        else {
            console.log("form is empty")
        }
    }

    handelCreateLinkSubmit = e => {

        e.preventDefault();

        
        for (const checkbox of this.state.selectedDrinks) {
            this.fetchdrinkbyname(checkbox)
        }

        this.state.drinkuserslinkData.forEach(this.pushtodb)
    }

    render() {
        return (
            <div className="column center">
                <div className="light">
                    <div className="row center">
                        <div className="col-2">
                            <form onSubmit={this.handleCreateDrinkSubmit} >
                                <h3>1. Create New Drink</h3>
                                <input type="Text" id="drinkname" name="drinkname" placeholder="Drink Name" pattern="[A-Za-z]+" title="Drink name should be made up of Capital and small letters Only" /><br />
                                <input type="Text" id="drinkalcoholvalue" name="drinkalcoholvalue" placeholder="Drink Alcohol Volume" title="Enter Drink Alcohol Volume" /><br />
                                <button id="btnSubmit" className="blue" type="submit">Register</button>
                            </form>
                        </div>
                        <div className="col-2">
                            <form onSubmit={this.handelCreateLinkSubmit} >
                                <h3>2. Select Drink</h3>
                                {this.createCheckboxes()}
                                <button id="btnSubmit" className="blue" type="submit">Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}