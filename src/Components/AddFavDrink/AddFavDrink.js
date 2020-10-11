import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './AddFavDrink.css';

export default class AddFavDrink extends Component {
    render() {
        return (
            <div className="column center">
                <div className="light">
                    <div className="row center">
                        <div className="col-2">
                            <p>Drink List here</p>
                        </div>
                        <div className="col-2">
                            <p>New Drink Form Here</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}