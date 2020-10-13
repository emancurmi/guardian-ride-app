import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import './App.css';

import Header from './Components/Header/Header';
import Nav from './Components/Nav/Nav';
import Footer from './Components/Footer/Footer';

import Home from './Components/Home/Home';
import SignUp from './Components/SignUp/SignUp';
import SignedIn from './Components/SignedIn/SignedIn';
import AddFavDrink from './Components/AddFavDrink/AddFavDrink';
import SignOut from './Components/SignOut/SignOut';
import Profile from './Components/Profile/Profile';

class App extends Component {
    state = {
        isLoggedin: false
    }

    handleLogIn = () => {
        this.setState({
            isLoggedin: true
        })
    }

    handleLogOut = () => {
        this.setState({
            isLoggedin: false
        })
    }

    render() {
        return (
            <BrowserRouter>
                <Header />
                <Nav />
                <div className='App'>
                    <Route path="/" component={Home} exact />

                    <Route path="/signup" exact render={(routeProps) => {
                        return <SignUp handleLogIn={this.handleLogIn} {...routeProps} />
                    }} />

                    <Route path="/signedin" component={SignedIn} exact />
                    <Route path="/addfavdrink" component={AddFavDrink} exact />

                    <Route path="/signout" exact render={(routeProps) => {
                        return <SignOut handleLogOut={this.handleLogOut} {...routeProps} />
                    }} />

                    <Route path="/profile" component={Profile} exact />
                </div>
                <Footer />
            </BrowserRouter>
        );
    }
}

export default App;
