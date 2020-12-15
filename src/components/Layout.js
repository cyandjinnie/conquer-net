import React from 'react'
import './Layout.css'
import Nav from './Nav.js'
import { Route, Switch } from 'react-router-dom'
import Chats from './Layouts/Chats.js'
import Events from './Layouts/Events.js'
import Departments from './Layouts/Departments.js'
import About from './Layouts/About.js'

class Layout extends React.Component {
    render() {
        return (
            <div className="wrapper">
                <Nav/>
                <div className="wide_column">
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
