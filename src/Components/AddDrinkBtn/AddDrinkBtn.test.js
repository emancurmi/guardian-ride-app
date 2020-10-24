import React from 'react';
import ReactDOM from 'react-dom';
import AddDrinkBtn from './AddDrinkBtn';
import config from '../../config';
import engine from '../../engine';
import { read_cookie } from 'sfcookies';
import moment from 'moment';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <AddDrinkBtn
            drinkid='1'
            calculateconsumtion='10'
        />, div
    );
    ReactDOM.unmountComponentAtNode(div);
});