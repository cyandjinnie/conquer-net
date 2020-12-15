import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Layout from './Layout.js'
import Login from './Login.js'
import Register from './Register.js'

import AuthRedirect from './AuthRedirect.js'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/register" component={Register}/>
        <AuthRedirect component={Layout}/>
      </Switch>
    </Router>
  );
}

export default App;
