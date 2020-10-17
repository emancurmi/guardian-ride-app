import React, { Component } from 'react';
import './Profile.css';
import config from '../../config';
import engine from '../../engine';
import { read_cookie } from 'sfcookies';

export default class Profile extends Component {

    constructor(props) {

        super(props);

        this.state = {
            config: config,
            userid: engine.decrypt(read_cookie(config.cookie_key)),
            userData: [], 
            guardianid: "",
            guardianData:[],
            error: null,
            isLoading: true,
        }
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

    fetchuserguardianlink = () => {

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
            .then(this.setGuardianId)
            .catch(error => {
                console.error(error)
                this.setState({ error })
            })
    }

    fetchguardian = () => {
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
            .then(this.setGuardianData())
            .catch(error => {
                console.error(error)
                this.setState({ error })
            })
    }

    handleUserUpdateSubmit = e => {

        e.preventDefault();

        const { userphone, userpin } = e.target;

        const user = {
            userphone: userphone.value,
            userpin: userpin.value
        }

        this.setState({ error: null })

        fetch(this.state.config.API_ENDPOINT + 'user/?userphone=' + user.userphone + '&userpin=' + user.userpin, {
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
                this.setUserData(data);
            })

            .catch(error => {
                console.error(error)
                this.setState({ error })
            })
    }

    handleGuardianAngelSubmit = e => {
        //fix here next guardian

        e.preventDefault();

        const { guardianname, guardianphone } = e.target;

        const guardian = {
            guardianname: guardianname.value,
            guardianphone: guardianphone.value
        }

        this.setState({ error: null })

        //if new guardian
        if (this.state.guardianid === "") {
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
                    console.log(this.state.guardianData)
                })

                .catch(error => {
                    console.error(error);
                    this.setState({ error })
                })
            
            //create new link
            const user_guardian = {
                guardianid: this.state.guardianData.guardianid,
                userid: this.state.userData.userid
            }

            console.log(user_guardian);

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

        } //else if its an update
        else{

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
                
                .catch(error => {
                    console.error(error)
                    this.setState({ error })
                })
        }

    }

    componentDidMount() {
        try {
            this.fetchuser();
            this.fetchuserguardianlink();
            this.fetchguardian();
        }
        catch (e) { console.log(e) }
    }

    render() {
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
                                    <input type="Text" id="username" name="username" value={this.state.userData.username} placeholder="UserName" /><br />
                                    <label htmlFor="userphone">Phone Number: </label>
                                    <input type="Text" id="userphone" name="userphone" value={this.state.userData.userphone} placeholder="Phone number" /><br />
                                    <label htmlFor="userpin">Your Pin: </label>
                                    <input type="Text" id="userpin" name="userpin" value={this.state.userData.userpin} placeholder="PIN number" /><br />
                                    <button id="btnSubmit" className="blue" type="submit">Update User Info</button>
                                </form>
                            </div>
                        </div>
                        
                        <div className="row">
                            <div className="col-1">
                                <h5>Guardian's Information</h5>
                                <form onSubmit={this.handleGuardianAngelSubmit} >
                                    <label htmlFor="guardianname">Guardian Name: </label>
                                    <input type="Text" id="guardianname" name="guardianname" value={this.state.guardianData.guardianname} placeholder="Guardian Name" /><br/>
                                    <label htmlFor="guardianphone">Guardian Number: </label>
                                    <input type="Text" id="guardianphone" name="guardianphone" value={this.state.guardianData.guardianphone} placeholder="Phone number" /><br/>
                                    <button id="btnSubmit" className="blue" type="submit">Update Guardian's Info</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}