import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
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

    fetchdrinkbyid = (drinkid) => {

        fetch(this.state.config.API_ENDPOINT + 'drink/'+ drinkid, {
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

    componentWillMount = () => {
        this.selectedCheckboxes = new Set();
    }

    toggleCheckbox = drink => {
        if (this.selectedCheckboxes.has(drink.drinkname)) {
            this.selectedCheckboxes.delete(drink.drinkname);
        } else {
            this.selectedCheckboxes.add(drink.drinkname);
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

            console.log(this.state.drinkData + "added to database");



            this.setState({ error: null })
        }
        else {
            console.log("form is empty")
        }
    }

    handelCreateLinkSubmit = e => {

        e.preventDefault();

        ////----- Checkbox Section Processing -----////

        //check if anything is selected from checkboxes

        if (this.selectedCheckboxes.length !== 0) {
            for (const checkbox of this.selectedCheckboxes) {
                //this.fetchdrinkbyid(checkbox.key);
                console.log(checkbox);
            }
        }




        ////----- Link Adding -----////

        //if drinkdata is not empty start linking
        //if (!this.state.drinkData.length) {
        //    const drinkuserlink = {
        //        drinkid: this.state.drinkid,
        //        userid: this.state.userid
        //    }

        //    fetch(this.state.config.API_ENDPOINT + 'user_drink/', {
        //        method: 'POST',
        //        body: JSON.stringify(drink),
        //        headers: {
        //            'content-type': 'application/json',
        //            'authorization': `bearer ${this.state.config.API_TOKEN}`
        //        }
        //    })

        //        .then(res => {
        //            if (!res.ok) {
        //                return res.json().then(error => Promise.reject(error));
        //            }
        //            return res.json();
        //        })

        //        .then(data => {
        //            drinkname.value = '';
        //            drinkalcoholvalue.value = '';
        //            this.AddFavDrink(drink);
        //        })

        //        .catch(error => {
        //            console.error(error);
        //            this.setState({ error })
        //        })
        //}
        //else {
        //    //set state error to form or checkbox required. 
        //}
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