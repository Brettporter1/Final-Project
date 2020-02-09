import React, {useState, createContext, useEffect} from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import {Howl, Howler} from 'howler';
import './App.scss';
import Header from './components/Header';
import Login from './components/Login';
import Library from './components/Library';
import Player from './components/Player';
import Channel from './pages/Channel';
import ChannelContext from './utils/ChannelContext'
import PlayContext from './utils/PlayContext'

let unlocker;
function App() {
  useEffect(() => {
    unlocker = new Howl({
      src: ['/audio/silence.mp3'],
      preload: false,
      html5: true,
      
  });
  }, [])
  
  const [currentTrack, setCurrentTrack] = useState({
    author: '',
    title: '',
    track: '',
    playing: false,
    progress : 0
  });
  const [selectedChannel, setSelectedChannel] = useState({});
  return (
    <div className="App">
    <PlayContext.Provider value={{currentTrack, setCurrentTrack}} >
    <ChannelContext.Provider value={{selectedChannel, setSelectedChannel}}>
      <Router>
        <Header />
          <Switch>
            <Route exact path= "/">
              <Library />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/channel/:id">
              <Channel />
            </Route>
          </Switch>
        </Router>
        {currentTrack.track ? 
          <Player/>
          : null
        }
      </ChannelContext.Provider>
    </PlayContext.Provider>
    </div>
  );
}

export default App;
