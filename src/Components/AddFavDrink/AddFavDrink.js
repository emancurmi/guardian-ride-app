import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './AddFavDrink.css';

export default class AddFavDrink extends Component {

    constructor(props) {

        super(props);
        if (read_cookie(config.cookie_key).length === 0) {
            props.history.push('/signup');
        }

        this.state = {
            config: config,
            drinkData: [],
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

    fetchdrinks = () => {

        fetch(this.state.config.API_ENDPOINT + 'drinks/', {
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

    componentDidMount() {
        try {
            this.fetchuser();
            this.fetchfavouritedrinks();
        }
        catch (e) { console.log(e) }
    }

    render() {
        return (
            <div className="column center">
                <div className="light">
                    <div className="row center">
                        <div className="col-2">
                            <p>
                                {
                                    
                                }
                            </p>
                        </div>
                        <div className="col-2">
                            <h1>Create New Drink</h1>
                            <form onSubmit={this.handleSubmit} >
                                <input type="Text" id="drinkname" name="drinkname" placeholder="Drink Name" pattern="[A-Za-z]+" title="Drink name should be made up of Capital and small letters Only" required /><br />
                                <input type="Text" id="drinkalcoholvalue" name="drinkalcoholvalue" placeholder="Drink Alcohol Content" title="Enter Drink Alcohol Content Level" required /><br />
                                <button id="btnSubmit" className="blue" type="submit">Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}