import React, { Component } from 'react';
import './AddDrinkBtn.css';

export default class AddDrinkBtn extends Component {
    render() {
        return (
            <div className="light">
                <div className="column content">
                    <div className="row center">
                        <button className="bigredbutton">Add Drink</button>
                    </div>
                </div>
            </div>
        )
    }
}