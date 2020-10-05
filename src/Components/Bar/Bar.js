import React, { Component } from 'react';
import Drink from '../Drink/Drink';
import './Bar.css';

export default class Bar extends Component {
    constructor(props) {
        super(props)

        this.state = { current: 0 }
        this.handleSlideClick = this.handleSlideClick.bind(this)
    }

    handleSlideClick(index) {
        if (this.state.current !== index) {
            this.setState({
                current: index
            })
        }
    }

    render() {
        const { drinks } = this.props
        
        return (
            <div className="light">
                <div className="column content">
                    <div className="row center">
                        <h1 className="col-1">Drink List</h1>
                        <h4 className="col-1">Select Drink</h4>
                    </div>
                    <div className="row spacebetween">
                            {drinks.map(drink => {
                                return (
                                    <Drink
                                        key={drink.drinkid}
                                        name={drink.drinkname}
                                        value={drink.drinkalcoholvalue}
                                        //handleSlideClick={this.handleSlideClick}
                                    />
                                )
                            })}
                    </div>
                </div>
            </div>  
        )
    }
}