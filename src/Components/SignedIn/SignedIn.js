import {Component} from 'react';
import LiquoireCarousel from '../LiquoireCarousel/LiqhoireCarousel';
import CountDrink from '../CountDrink/CountDrink';
import './SingnedIn.css';

export default class SignedIn extends Component {
	render() {
		return (
			<div>
				<h1>Welcome {NAME}</h1>
				<LiquoireCarousel />
				<CountDrink />
				</div>
			)
	}
}