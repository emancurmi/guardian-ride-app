import React from 'react';
import ReactDOM from 'react-dom';
import SignUp from './SignUp';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const history = { push: jest.fn() };

    ReactDOM.render(
        <SignUp />, div
    );
    ReactDOM.unmountComponentAtNode(div);
});