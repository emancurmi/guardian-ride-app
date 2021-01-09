import React from 'react';
import ReactDOM from 'react-dom'; 
import { BrowserRouter, Route } from 'react-router-dom';
import SignOut from './Signout';
import App from '../../App';

it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(
        <BrowserRouter>
            <SignOut
                handleLogOut={App.handleLogOut} />
        </BrowserRouter>, div
    );
    ReactDOM.unmountComponentAtNode(div);
});