import React from 'react'
import BasicForm from './Forms/BasicForm.js'
import { Link } from 'react-router-dom'

import './Register.css'
import './Layout.css'

class Register extends React.Component {
    form_specs = [
        {
            type: "text",
            placeholder: "Your username...",
            label: "Account/username",
            ref: "username"
        },
        {
            type: "password",
            placeholder: "Your password...",
            label: "Your password",
            ref: "password"
        },
        {
            type: "submit",
            label: "Sign up!",
            ref: "submit"
        }
    ];        

    render() {
        return (
            <div className="wrapper">
                <div className="wide_column">
                    <center>
                        <h1>
                            Create an account
                        </h1>
                        <BasicForm specs={this.form_specs}/>
                        <div id="login-hint">
                            <Link to="/login">
                                Already registered? Log in
                            </Link>
                        </div>
                    </center>
                </div>
            </div>
        );
    }
}

export default Register;
