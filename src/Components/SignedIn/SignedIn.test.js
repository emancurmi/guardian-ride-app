import React from 'react';
import ReactDOM from 'react-dom';
import SignedIn from './SignedIn';
import { bake_cookie } from 'sfcookies';
import config from '../../config';
import engine from '../../engine';

it('renders without crashing', () => {
    bake_cookie(config.cookie_key, engine.encrypt("1"));
    const div = document.createElement('div');

    ReactDOM.render(
        <SignedIn />, div
    );
    ReactDOM.unmountComponentAtNode(div);
});