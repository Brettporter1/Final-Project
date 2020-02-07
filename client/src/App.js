import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import './App.scss';
import Header from './components/Header';
import Login from './components/Login';
import Library from './components/Library';
import Channel from './pages/Channel'
function App() {
  return (
    <div className="App">
    <Header />
    <Router>
      <Switch>
        <Route exact path= "/">
          <Login />
        </Route>
        <Route path="/library">
          <Library />
        </Route>
        <Route path="/channel/:id">
          <Channel />
        </Route>
      </Switch>
    </Router>
    </div>
  );
}

export default App;
