import React from 'react';
import ReactDOM from 'react-dom';
import CallGuardianBtn from './CallGuardianBtn';

it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(
        <CallGuardianBtn />, div
    );
    ReactDOM.unmountComponentAtNode(div);
});