import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import Drink from '../Drink/Drink';
import './Bar.css';

export default class Bar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            dataDrinkUserIds: this.props.dataDrinkUserIds,
            drinkData: []
        }
    }

    setDrinkData = data => {
        this.setState({
            drinkData: data
        })
    }

    fetchDrinkData = () => {
        this.state.dataDrinkUserIds.map(drink => {

            //console.log(drink);
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
                    console.log(data);
                    this.setDrinkData(data);

                })

                .catch(error => {
                    console.error(error)
                    this.setState({ error })
                })

        })
    }

    componentDidMount() {
        this.fetchDrinkData();
        console.log(this.state.dataDrinkUserIds);
    }

    render() {
        
        let barcontent;

        if (this.state.drinkData.length !== 0) {
            barcontent = <div className="column content">

                <div className="row center">
                    <h1 className="col-1">Drink List</h1>
                    <h4 className="col-1">Select Drink</h4>
                </div>
                <div className="row spacebetween">
                        {this.state.drinkData.map(drink => {
                            return (
                                <Drink
                                    key={drink.drinkid}
                                    id={drink.drinkid}
                                    name={drink.drinkname}
                                    value={drink.drinkalcoholvalue}
                                //handleSlideClick={this.handleSlideClick}
                                />
                            )
                        })}
                </div>
            </div>
        }
        else {
            barcontent = <div className="column content">
                <p>You don't have any drinks in your portfolio.  <Link to='/addfavdrink' >Click here to add your favourite drink.</Link></p>
            </div>
        }

        return (
            <div className="light">
                {barcontent}
            </div>  
        )
    }
}