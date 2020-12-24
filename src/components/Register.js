import React from 'react'
import BasicForm from './Forms/BasicForm.js'
import { Link } from 'react-router-dom'

import './Layout.css'

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.submitHandler = this.submitHandler.bind(this)
    }

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

    submitHandler(params) {
        console.log("Submitted!", params)
    }

    render() {
        return (
            <div className="wrapper">
                <div className="wide_column">
                    <center>
                        <h1>
                            Create an account
                        </h1>
                        <BasicForm specs={this.form_specs} onSubmit={this.submitHandler}/>
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
