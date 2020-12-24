import React from 'react'
import NavVerticalMenu from './Menus/NavVerticalMenu.js'
import APIClient from '../services/APIClient.js'
import LoadingAnimation from './Decorations/LoadingAnimation.js'
import { withRouter } from 'react-router-dom'

import './Nav.css'


class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.section = props.section;

        let data = APIClient.AuthService.getPersonalData()

        console.log("Nav: ", data)

        if (data === undefined) {
            this.props.history.push("/")
        }

        this.state = {
            first_name: data.first_name,
            last_name: data.last_name
        }

        // this.fetchPersonalData()
        this.logOutHandler = this.logOutHandler.bind(this)
    }

    // fetchPersonalData() {
    //     APIClient.fetch("personal/").then((response) => (
    //         response.json()
    //     )).then((data) => {
    //         console.log(data)
    //         this.setState({
    //             first_name: data[0].first_name,
    //             last_name: data[0].last_name
    //         })
    //         console.log("Got data!", this.state.first_name, this.state.last_name)
    //     }).catch((error) => {
    //         console.error("[fetchPersonalData FAILED] ", error)
    //     })
    // }

    logOutHandler(e) {
        e.preventDefault()
        APIClient.AuthService.logOut()
        console.log("LogOut")
        this.props.history.push("/")
    }

    noData() {
        return this.state === this.initialState;
    }

    render() {
        if (this.noData()) {
            return (
                <div className="narrow_column">
                    <center>
                    <div id="personal_info_bar">
                        <div style={{ height: "100px"}}>
                            <LoadingAnimation/>
                        </div>
                    </div>
                    
                    <ul className="horizontal_menu">
                        <li>Settings</li>
                        <li>|</li>
                        <li>Exit</li>
                    </ul>
                </center>

                <NavVerticalMenu active={this.section}/>
                </div>
            )
        }

        return (
            <div className="narrow_column">
                <center>
                    <div id="personal_info_bar">
                        <div id="avatar_frame"></div>
                        <div className="name_field">
                            {this.state.first_name + ' ' + this.state.last_name}
                        </div>
                    </div>
                    
                    <ul className="horizontal_menu">
                        <li>Settings</li>
                        <li>|</li>
                        <li>
                            <div onClick={this.logOutHandler}>
                                Exit
                            </div>
                        </li>
                    </ul>
                </center>

                <NavVerticalMenu active={this.section}/>
		    </div>
        );
    }
}

export default withRouter(Nav);
