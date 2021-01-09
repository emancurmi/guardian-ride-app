import React, { Component } from 'react';
import './CallGuardianBtn.css';
import config from '../../config';
import engine from '../../engine';
import { read_cookie } from 'sfcookies';
import Loader from '../Loader/Loader';
//import moment from 'moment';

export default class CallGuardianBtn extends Component {

    constructor(props) {


        super(props);
        this.state = {
            config: config,
            userid: engine.decrypt(read_cookie(config.cookie_key)),
            guardianid: 0,
            guardianData: {
                guardianid: 0,
                guardianname: "",
                guardianphone: ""
            },
            btnMessage: "Guardian Not Setup!",
            error: null,
            isLoading: true,
        }
    }

    //Update isLoading data in state
    setIsLoading = data => {
        this.setState({
            isLoading: data
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
            btnMessage:"Call Guardian",
            isLoading: false
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
            .then(data => {
                this.setGuardianId(data.guardianid);
                this.fetchguardian();
            })
            .catch(error => {
                console.error(error)
                this.setState({ error })
            })
    }

    fetchguardian = () => {
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

    }


    componentDidMount() {
            try {
                this.fetchuserguardianlink();
                this.setIsLoading(false);
            }
            catch (e) {
                //console.log(e) 
            }
    }

    render() {

        if (this.state.isLoading) {
            return (
                <Loader loadingtype={"Loading Btn Info"} />
            );
        }
        else {
            return (
                <div className="light">
                    <div className="column content">
                        <div className="row center">
                            <a href={"tel:" + this.state.guardianData.guardianphone} className="bigredbutton">{this.state.btnMessage}</a>
                        </div>
                    </div>
                </div>
            )
        }
    }
}