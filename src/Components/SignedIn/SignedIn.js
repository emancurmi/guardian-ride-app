import React, {Component} from 'react';
import Bar from '../Bar/Bar';
import './SignedIn.css';
import config from '../../config';
import engine from '../../engine';
import AddDrinkBtn from '../AddDrinkBtn/AddDrinkBtn';
import Loader from '../Loader/Loader';
import { Redirect } from 'react-router-dom';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';

export default class SignedIn extends Component {

    

    constructor(props) {

        super(props);
        if (read_cookie('idcrypt').length == 0) {
            props.history.push('/signup');
        }
        this.state = {
            config: config,
            drinkData: [],
            userid: engine.decrypt(read_cookie('idcrypt')),
            userData: [], 
            error: null,
            isLoading: true
        }
    }

    setUserData = userData => {
        this.setState({
            userData,
            error: null,
            isLoading: false

        })
    }

    setDrinkData = drinkData => {
            this.setState({
                drinkData,
                error: null,
                isLoading: false
            })
    }

    fetchuser = () => {

        fetch(this.state.config.API_ENDPOINT + 'user/' + this.state.userid, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${this.state.config.API_TOKEN}`
            }
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(error => Promise.reject(error))
                }
                return res.json()
            })
            .then(this.setUserData)
            .catch(error => {
                console.error(error)
                this.setState({ error })
            })
    }

    fetchfavouritedrinks = () => {

        console.log(this.state.config.API_ENDPOINT + 'drink/')
        fetch(this.state.config.API_ENDPOINT + 'drink/', {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${this.state.config.API_TOKEN}`
            }
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(error => Promise.reject(error))
                }
                return res.json()
            })
            .then(this.setDrinkData)
            .catch(error => {
                console.error(error)
                this.setState({ error })
            })
    }



    componentDidMount() {
        try {
            this.fetchuser();
            this.fetchfavouritedrinks();
        }
        catch (e) { console.log(e) }
    }

    render() {

        if (this.state.isLoading) {
            return (
                <Loader loadingtype={"Favourite Drinks"} />
            );
        }


        return (
            <div className="column center">
                <div className="linear-dark">
                    <div className="row center">
                        <div className="col-1">
                            <h1>Welcome {this.state.userData.username}</h1>
                        </div>
                    </div>
                </div>
                <Bar drinkData={this.state.drinkData} />
                <AddDrinkBtn />
            </div>
		)
	}
}