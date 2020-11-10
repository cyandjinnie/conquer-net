import React from 'react'
import './Layout.css'
import Nav from './Nav.js'
import MainWindow from './MainWindow.js'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

class Layout extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="wrapper">
                <Nav/>
                <div>
                    { this.props.section }
                </div>
            </div>
        );
    }
}

export default Layout;
