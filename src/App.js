import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './Components/Header/Header';
import Nav from './Components/Nav/Nav';
import Footer from './Components/Footer/Footer';

import Home from './Components/Home/Home';

import './App.css';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Header />
                <Nav />
                <div className='App'>
                    <Route path="/" component={Home} exact />
                </div>
                
            </BrowserRouter>
        );
    }
}

export default App;
