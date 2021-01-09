import React from 'react';
import ReactDOM from 'react-dom';
import Bar from './Bar';

it('renders without crashing', () => {
    const div = document.createElement('div');
    
    ReactDOM.render(
        <Bar
            dataDrinkUserIds={[1, 2, 3]}
            selectedDrinks={1}
            togglecheckbox={this.props.toggleCheckbox}
        />, div
    );
    ReactDOM.unmountComponentAtNode(div);
});