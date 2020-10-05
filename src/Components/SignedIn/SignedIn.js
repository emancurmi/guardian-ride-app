import React, {Component} from 'react';
import Bar from '../Bar/Bar';
import './SignedIn.css';
import AddDrinkBtn from '../AddDrinkBtn/AddDrinkBtn';

const drinkData = [
    {
        drinkid: 0,
        drinkname: 'Vodka',
        drinkalcoholvalue: 0.4,
    },
    {
        drinkid: 1,
        drinkname: 'Martini White',
        drinkalcoholvalue: 0.3,
    },
    {
        drinkid: 2,
        drinkname: 'Wine',
        drinkalcoholvalue: 0.1,
    },
    {
        drinkid: 3,
        drinkname: 'Whiskey',
        drinkalcoholvalue: 0.8,
    }
]


export default class SignedIn extends Component {
	
	render() {
		const NAME = "EMAN";
        return (
            <div className="column center">
                <div className="linear-dark">
                    <div className="row center">
                        <div className="col-1">
                            <h1>Welcome {NAME}</h1>
                        </div>
                    </div>
                </div>
                <Bar drinks={drinkData} />
                <AddDrinkBtn />
            </div>
		)
	}
}