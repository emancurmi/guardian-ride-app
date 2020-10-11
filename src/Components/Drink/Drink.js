import React, { Component } from 'react';
import './Drink.css';

export default class Drink extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id:props.key,
            name: props.name,
            value: props.value
        }
    }

    render() {
        return (

                <label className="col-5"><input type="radio" name="drink" value={this.state.id} />{this.state.name} - {this.state.value} mg</label>
        )
    }
}