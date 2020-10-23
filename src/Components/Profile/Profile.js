import React, { Component } from 'react';
import './Profile.css';
import config from '../../config';
import engine from '../../engine';
import { read_cookie } from 'sfcookies';
import Popup from '../Popup/Popup';
import Loader from '../Loader/Loader';

export default class Profile extends Component {

    constructor(props) {

        super(props);

        this.state = {
            config: config,
            userid: engine.decrypt(read_cookie(config.cookie_key)),
            userData: [], 
            guardianid: 0,
            guardianData: {
                guardianid: 0,
                guardianname: "",
                guardianphone: ""
            },
            error: null,
            isLoading: true,
            showPopup: false,
        }
    }

    togglePopup = () => {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }

    //Update isLoading data in state
    setIsLoading = data => {
        this.setState({
            isLoading: data
        })
    }

    setUserData = userData => {
        this.setState({
            userData,
            error: null,
            isLoading: false
        })
    }

    setGuardianId = guardianid => {
        this.setState({
            guardianid,
            error: null,
            isLoading: false
        })
    }

    setGuardianData = guardianData => {
        this.setState({
            guardianData,
            error: null,
            isLoading: false
        })
    }

    fetchuser = () => {
        this.setIsLoading(true);

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
        this.setIsLoading(false);
    }

    fetchuserguardianlink = () => {
        this.setIsLoading(true);
        fetch(this.state.config.API_ENDPOINT + 'user_guardian/?userid=' + this.state.userid, {
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
            .then(data => {
                this.setGuardianId(data.guardianid);
                this.fetchguardian();
            })
            .catch(error => {
                console.error(error)
                this.setState({ error })
            })
        this.setIsLoading(false);
    }

    fetchguardian = () => {
        this.setIsLoading(true);
        if (this.state.guardianid !== 0) {
            fetch(this.state.config.API_ENDPOINT + 'guardian/' + this.state.guardianid, {
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
                .then(data => {
                    this.setGuardianData(data)
                })
                .catch(error => {
                    console.error(error)
                    this.setState({ error })
                })
        }
        this.setIsLoading(false);
    }

    handleUserUpdateSubmit = e => {
        this.setIsLoading(true)
        e.preventDefault();

        const { userphone, userpin } = e.target;

        const user = {
            userphone: userphone.value,
            userpin: userpin.value
        }

        this.setState({ error: null })

        fetch(this.state.config.API_ENDPOINT + 'user/' + this.state.userid , {
            method: 'PATCH',
            body: JSON.stringify(user),
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

            .then(
                this.togglePopup.bind(this)
            )

            .catch(error => {
                console.error(error)
                this.setState({ error })
            })
        this.setIsLoading(false);
    }

    handleGuardianAngelSubmit = e => {
        this.setIsLoading(true);
        //fix here next guardian
        e.preventDefault();

        const { guardianname, guardianphone } = e.target;

        const guardian = {
            guardianname: guardianname.value,
            guardianphone: guardianphone.value
        }

        this.setState({ error: null })

        //if new guardian
        if (this.state.guardianid === 0) {
            //create new guardian
            fetch(this.state.config.API_ENDPOINT + 'guardian/', {
                method: 'POST',
                body: JSON.stringify(guardian),
                headers: {
                    'content-type': 'application/json',
                    'authorization': `bearer ${this.state.config.API_TOKEN}`
                }
            })

                .then(res => {
                    if (!res.ok) {
                        return res.json().then(error => Promise.reject(error));
                    }
                    return res.json();
                })

                .then(data => {
                    this.setGuardianData(data)

                    const user_guardian = {
                        guardianid: data.guardianid,
                        userid: this.state.userid
                    }

                    fetch(this.state.config.API_ENDPOINT + 'user_guardian/', {
                        method: 'POST',
                        body: JSON.stringify(user_guardian),
                        headers: {
                            'content-type': 'application/json',
                            'authorization': `bearer ${this.state.config.API_TOKEN}`
                        }
                    })

                        .then(res => {
                            if (!res.ok) {
                                return res.json().then(error => Promise.reject(error));
                            }
                            return res.json();
                        })

                        .catch(error => {
                            console.error(error);
                            this.setState({ error })
                        })
                })

                .then(
                    this.togglePopup.bind(this)
                )

                .catch(error => {
                    console.error(error);
                    this.setState({ error })
                })

        } //else if its an update
        else {

            fetch(this.state.config.API_ENDPOINT + `guardian/${this.state.guardianid}`, {
                method: 'PATCH',
                body: JSON.stringify(guardian),
                headers: {
                    'content-type': 'application/json',
                    'authorization': `Bearer ${config.API_TOKEN}`
                },
            })
                .then(res => {
                    if (!res.ok)
                        return res.json().then(error => Promise.reject(error))
                })

                .then(
                    this.togglePopup.bind(this)
                )

                .catch(error => {
                    console.error(error)
                    this.setState({ error })
                })
        }
        this.setIsLoading(false);
    }

    componentDidMount() {
        try {
            this.fetchuser();
            this.fetchuserguardianlink();
        }
        catch (e) { console.log(e) }
    }

    render() {
        //if (this.state.dataDrinkUserIds.length) {
        if (this.state.isLoading) {
            return (
                <Loader loadingtype={"Favourite Drinks"} />
            );
        }
        else {
            return (
                <div className="column center">
                    <div className="light">
                        <div className="column content">
                            <div className="row center">
                                <h1 className="col-1">Profile</h1>
                                <h4 className="col-1">Update Your Profile</h4>
                            </div>
                            <div className="row">
                                <div className="col-1">
                                    <h5>User Information</h5>
                                    <form onSubmit={this.handleUserUpdateSubmit} >
                                        <label htmlFor="username">User Name: </label>
                                        <input type="Text" id="username" name="username" defaultValue={this.state.userData.username || ''} placeholder="UserName" /><br />
                                        <label htmlFor="userphone">Phone Number: </label>
                                        <input type="Text" id="userphone" name="userphone" defaultValue={this.state.userData.userphone || ''} placeholder="Phone number" /><br />
                                        <label htmlFor="userpin">Your Pin: </label>
                                        <input type="Text" id="userpin" name="userpin" defaultValue={this.state.userData.userpin || ''} placeholder="PIN number" /><br />
                                        <button id="btnSubmit" className="blueonwhite" type="submit">Update User Info</button>
                                    </form>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-1">
                                    <h5>Guardian's Information</h5>
                                    <form onSubmit={this.handleGuardianAngelSubmit} >
                                        <label htmlFor="guardianname">Guardian Name: </label>
                                        <input type="Text" id="guardianname" name="guardianname" defaultValue={this.state.guardianData.guardianname || ''} placeholder="Guardian Name" /><br />
                                        <label htmlFor="guardianphone">Guardian Number: </label>
                                        <input type="Text" id="guardianphone" name="guardianphone" defaultValue={this.state.guardianData.guardianphone || ''} placeholder="Phone number" /><br />
                                        <button id="btnSubmit" className="blueonwhite" type="submit">Update Guardian's Info</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    {this.state.showPopup ?
                        <Popup
                            text='Info Updated'
                            closePopup={this.togglePopup.bind(this)}
                        />
                        : null
                    }
                </div>
            )
        }
    }
}