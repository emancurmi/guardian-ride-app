import React from 'react';
import ReactDOM from 'react-dom';
import SignedIn from './SignedIn';

it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(
        <SignedIn />, div
    );
    ReactDOM.unmountComponentAtNode(div);
});