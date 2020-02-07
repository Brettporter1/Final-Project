import React, {useState, createContext} from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import './App.scss';
import Header from './components/Header';
import Login from './components/Login';
import Library from './components/Library';
import Channel from './pages/Channel';
import ChannelContext from './utils/ChannelContext'


function App() {
  
  const [selectedChannel, setSelectedChannel] = useState({});
  return (
    <div className="App">
    <Header />
      <ChannelContext.Provider value={{selectedChannel, setSelectedChannel}}>
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
      </ChannelContext.Provider>
    </div>
  );
}

export default App;
