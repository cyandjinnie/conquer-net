import React from 'react'
import BasicForm from './Forms/BasicForm.js'
import { Link, useHistory } from 'react-router-dom'
import APIClient from '../services/APIClient.js'

import './Layout.css'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.submitHandler = this.submitHandler.bind(this)
    }

    form_specs = [
        {
            type: "text",
            placeholder: "Username",
            label: "Username",
            ref: "username"
        },
        {
            type: "password",
            placeholder: "Password",
            label: "Password",
            ref: "password"
        },
        {
            type: "submit",
            label: "Let's go!",
            ref: "submit"
        }
    ];   
    
    async submitHandler(params) {
        console.log("Submitted!", params)
        const success = await APIClient.AuthService.logIn(params.username, params.password)

        if (success) {
            // Redirect to personal screen
            console.log("LogIn success")
            this.props.history.push("/")
        }
    }

    render() {
        return (
            <div className="wrapper">
                <div className="wide_column">
                    <center>
                        <h1>
                            Sign in
                        </h1>
                        <BasicForm specs={this.form_specs} onSubmit={this.submitHandler}/>
                        <div id="register-hint">
                            <Link to="/register" className="explicit_link">
                                or register
                            </Link>
                        </div>
                    </center>
                </div>
            </div>
        );
    }
}

export default Login;
