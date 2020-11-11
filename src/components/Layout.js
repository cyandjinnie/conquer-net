import React from 'react'
import './Layout.css'
import Nav from './Nav.js'
import MainWindow from './MainWindow.js'
import {BrowserRouter, BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Chats from './Layouts/Chats.js'
import Events from './Layouts/Events.js'
import Departments from './Layouts/Departments.js'
import About from './Layouts/About.js'

class Layout extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="wrapper">
                <Nav/>
                <div class="wide_column">
                    <Switch>
                        <Route path="/departments" component={Departments}/>
                        <Route path="/chats" component={Chats}/>
                        <Route path="/events" component={Events}/>
                        <Route path={["/", "/about"]} component={About}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default Layout;
