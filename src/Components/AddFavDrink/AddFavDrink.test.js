import React from 'react';
import ReactDOM from 'react-dom';
import AddFavDrink from './AddFavDrink';

it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(
        <AddFavDrink />, div
    );
    ReactDOM.unmountComponentAtNode(div);
});