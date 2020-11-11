import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Layout from './Layout.js'

function App() {
  return (
    <Router>
      <Layout/>
    </Router>
  );
}

export default App;
