import React from 'react';
import ReactDOM from 'react-dom';
import Drink from './Drink';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <Drink selected='true'
            key='1'
            id='1'
            name='Vodka'
            value='3'
        />, div
    );
    ReactDOM.unmountComponentAtNode(div);
});