import React, { Component } from 'react';
import './Drink.css';

export default class Drink extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id:this.props.id,
            onChange: this.props.onChange,
            selectedDrinks: this.props.selectedDrinks,
            name:this.props.name,
            value:this.props.value
        }
    }

    render() {
        let drinkid = parseInt(this.state.id);
        let selecteddrinkid = parseInt(this.state.selectedDrinks);

        if (drinkid === selecteddrinkid) {
            return (
                <label className="col-5">
                    <input type="radio" name="drink" value={this.state.id} onChange={this.state.onChange} checked  />
                    {this.state.name} - {this.state.value} mg
                </label>)
        }
        else {
            return (
                <label className="col-5">
                    <input type="radio" name="drink" value={this.state.id} onChange={this.state.onChange} />
                    {this.state.name} - {this.state.value} mg
                </label>)

        }

    }
}