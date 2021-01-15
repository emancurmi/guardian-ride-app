import React, { Component } from 'react';
//import { withRouter } from 'react-router-dom';
import './AddFavDrink.css';
import { read_cookie } from 'sfcookies';
import config from '../../config';
import engine from '../../engine';
import Checkbox from '../Checkbox/Checkbox';
import Popup from '../Popup/Popup';

export default class AddFavDrink extends Component {

    constructor(props) {

        super(props);

        this.state = {
            config: config,
            userid: engine.decrypt(read_cookie(config.cookie_key)),
            drinkData: [],
            selectedDrinks: [],
            drinkuserslinkData: [],
            error: null,
            isLoading: true,
            showPopup: false,
        }
    }

    togglePopup = () => {
        this.setState({
            showPopup: !this.state.showPopup
        });
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
        catch (e) {
            //console.log(e)
        }
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
    
    //create new drink
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
            this.setState({ error:"Please fill all information" })
        }
    }

    //add drink to favourites
    handelCreateLinkSubmit = e => {

        e.preventDefault();
     
        for (const drinkname of this.state.selectedDrinks) {
            //fetch drink info
            fetch(this.state.config.API_ENDPOINT + 'drink/?drinkname=' + drinkname, {
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
                .then(drink => {

                    //create link between drink and user
                    const drinkuserlink = {
                        drinkid: drink.drinkid,
                        userid: this.state.userid,
                        userdrinktime: '2012-12-31 00:00:00' //1602644590339
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

                        //.then(data => {
                            //console.log(data);
                        //})

                        .catch(error => {
                            console.error(error);
                            this.setState({ error })
                        })
                })

                .then(
                    this.togglePopup.bind(this)
                )

                .catch(error => {
                    console.error(error)
                    this.setState({ error })
                })

        }
    }

    showerror = () => {
        if (this.state.error != null) {
            return (<p>{this.state.error}</p>);
        }
    }

    render() {
        return (
            <div className="column center">
                <div className="light">
                    <div className="row center">
                        <div className="col-2">
                            <form onSubmit={this.handleCreateDrinkSubmit} >
                                <h3>1. Create New Drink</h3>
                                <input type="Text" id="drinkname" name="drinkname" placeholder="Drink Name" pattern="[A-Za-z\s]+" title="Drink name should be made up of Capital and small letters Only" /><br />
                                <input type="Text" id="drinkalcoholvalue" name="drinkalcoholvalue" pattern="[1-9]" placeholder="Drink Alcohol Volume / Shot" title="Drink Alcohol Volume should be between 1-9" /><br />
                                <button id="btnSubmit" className="blueonwhite" type="submit">Create New Drink</button>
                            </form>
                            {this.showerror()}
                        </div>
                        <div className="col-2">
                            <form onSubmit={this.handelCreateLinkSubmit} >
                                <h3>2. Select Drink</h3>
                                {this.createCheckboxes()}
                                <button id="btnSubmit" className="blueonwhite" type="submit">Save As Favourite</button>
                            </form>
                        </div>
                    </div>
                </div>
                {this.state.showPopup ?
                    <Popup
                        text='Info Updated'
                        closePopup={this.togglePopup.bind(this)}
                    />
                    : null
                }
            </div >
        )
    }
}