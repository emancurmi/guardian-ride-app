import React, { Component } from 'react';
import './CallGuardianBtn.css';
import config from '../../config';
import engine from '../../engine';
import { read_cookie } from 'sfcookies';
import moment from 'moment';

export default class CallGuardianBtn extends Component {

    constructor(props) {


        super(props);
        if (read_cookie(config.cookie_key).length === 0) {
            props.history.push('/signup');
        }

        this.state = {
            config: config,
            userid: engine.decrypt(read_cookie(config.cookie_key)),
            guardian: {
                guardianname: '',
                guardianphoneno: '',
            },
            error: null,
            isLoading: true,
        }
    }


    render() {
        return (
            <div className="light">
                <div className="column content">
                    <div className="row center">
                        <a href={"tel:" + this.guardianphoneno} className="bigredbutton" type="submit">Call Guardian</a>
                    </div>
                </div>
            </div>
        )
    }
}