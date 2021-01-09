import React from 'react';
import ReactDOM from 'react-dom';
import AddDrinkBtn from './AddDrinkBtn';
import { bake_cookie } from 'sfcookies';
import config from '../../config';
import engine from '../../engine';

it('renders without crashing', () => {
    bake_cookie(config.cookie_key, engine.encrypt("1"));
    const div = document.createElement('div');

    ReactDOM.render(
        <AddDrinkBtn
            userid='1'
            drinkid='1'
            calculateconsumtion='10'
        />, div
    );
    ReactDOM.unmountComponentAtNode(div);
});