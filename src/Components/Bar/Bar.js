import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import config from '../../config';
import Drink from '../Drink/Drink';
import { v4 as uuidv4 } from 'uuid';
import './Bar.css';

export default class Bar extends Component {

    constructor(props) {
        super(props)

        this.state = {
            drinkData: [],
            config: config
        }
    }

    setDrinkData = data => {
        this.setState({
            drinkData: [...this.state.drinkData, data]
        })
    }

    fetchDrinkData = () => {
        
        this.props.dataDrinkUserIds.forEach(drink => {
            fetch(this.state.config.API_ENDPOINT + 'drink/' + drink.drinkid, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${this.state.config.API_TOKEN}`
                }
            })
                .then(res => {
                    if (!res.ok) {
                        return res.json().then(error => Promise.reject(error));
                    }
                    return res.json();
                })

                .then(data => {
                    this.setDrinkData(data);
                })

                .catch(error => {
                    console.error(error);
                    this.setState({ error });
                })

        })

    }

    componentDidMount() {
        this.fetchDrinkData();
    }

    render() {
        
        let barcontent;

        if (!this.props.dataDrinkUserIds) {
            return null;
        }

        //remove duplicates
        const ret = Object.values(
            this.state.drinkData.reduce((prev, c) => {
                const p = prev;
                const key = c.drinkid;
                p[key] = c;
                return p;
            }, {})
        );

        if (this.state.drinkData.length === this.props.dataDrinkUserIds.length) {
            barcontent = <div className="column content">

                <div className="row center">
                    <h1 className="col-1">Drink List</h1>
                    <h4 className="col-1">Select Drink</h4>
                    <p><Link to='/addfavdrink'>Click here to add new your favourite drink.</Link></p>
                </div>
                <div className="row spacebetween">
                    {ret.map(drink => {
                            return (
                                <Drink
                                    selectedDrinks={this.props.selectedDrinks}
                                    key={uuidv4()}
                                    id={drink.drinkid}
                                    name={drink.drinkname}
                                    value={drink.drinkalcoholvalue}
                                    onChange={this.props.toggleCheckbox}
                                />
                            )
                        }
                    )}
                </div>
                <div className="row center">
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