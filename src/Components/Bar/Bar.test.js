import React from 'react';
import ReactDOM from 'react-dom';
import Bar from './Bar';

it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(
        <Bar
            dataDrinkUserIds={[1, 3, 4]}
            selectedDrinks={1}
        />, div
    );
    ReactDOM.unmountComponentAtNode(div);
});