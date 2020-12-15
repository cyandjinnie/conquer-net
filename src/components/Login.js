import React from 'react'
import BasicForm from './Forms/BasicForm.js'
import { Link } from 'react-router-dom'

import './Login.css'
import './Layout.css'

class Login extends React.Component {
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

    render() {
        return (
            <div className="wrapper">
                <div className="wide_column">
                    <center>
                        <h1>
                            Sign in
                        </h1>
                        <BasicForm specs={this.form_specs}/>
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
