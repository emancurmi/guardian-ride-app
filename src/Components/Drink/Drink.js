import React, { Component } from 'react';
import './Drink.css';

export default class Drink extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id:this.props.id,
            onChange:this.props.onChange,
            checked:this.props.selected,
            name:this.props.name,
            value:this.props.value
        }
    }

    render() {
        return (
            <label className="col-5"><input type="radio" name="drink" value={this.state.id} onChange={this.state.onChange} checked={this.state.checked === this.state.id} /> {this.state.name} - {this.state.value} mg</label>
        );

    }
}