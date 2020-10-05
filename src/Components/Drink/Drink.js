import React, { Component } from 'react';
import './Drink.css';

export default class Drink extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: props.name,
            value: props.value
        }
        //this.handleSlideClick = this.handleSlideClick.bind(this)
    }

    render() {
        return (
            <div className="col-5 drink">
                <p> {this.state.name} - {this.state.value} mg </p>
            </div>
        )
    }
}