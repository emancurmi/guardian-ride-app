import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Login';
import App from './../../App';
import { browserHistory } from 'history'

it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(
        <Login handleLogIn={App.handleLogIn} />, div
    );
    ReactDOM.unmountComponentAtNode(div);
});