import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Chats from './Layouts/Chats.js'
import Events from './Layouts/Events.js'
import Departments from './Layouts/Departments.js'
import Layout from './Layout.js'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/chats" render={(props) => (
          <Layout {...props} section="Chats"/>
        )}/>
        <Route path="/events" render={(props) => (
          <Layout {...props} section="Events"/>
        )}/>
        <Route path="/departments" render={(props) => (
          <Layout {...props} section="Departments"/>
        )}/>
      </Switch>
    </Router>

    //<Layout/>
  );
}

export default App;
