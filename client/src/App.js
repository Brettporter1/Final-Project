import React, { useState, createContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Howl, Howler } from 'howler';
import Axios from 'axios';
import './App.scss';
import Header from './components/Header';
import Login from './components/Login';
import Library from './pages/Library';
import Player from './components/Player';
import Channel from './pages/Channel';
import Track from './pages/Track'
import Thread from './pages/Thread';
import ChannelContext from './utils/ChannelContext';
import TrackContext from './utils/TrackContext';
import PlayContext from './utils/PlayContext';
import UserContext from './utils/UserContext';
import ScrollToTop from './utils/ScrollToTop';

let unlocker;
function App() {
  useEffect(() => {
    unlocker = new Howl({
      src: ['/audio/silence.mp3'],
      preload: false,
      html5: true
    });
  }, []);
  const checkUser = () => {
    if (user.id === '') {
      Axios.get('/api/check-user', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${localStorage.getItem('jwt')}`
        }
      })
        .then(res => {
          console.log(res);
          updateUser(res.data);
        })
        .catch(err => console.log(err));
    }
  };
  const [user, setUser] = useState({
    username: '',
    email: '',
    id: '',
    checkUser: () => checkUser()
  });
  const [currentTrack, setCurrentTrack] = useState({
    author: '',
    title: '',
    track: '',
    playing: false,
    progress: 0
  });
  const [track, setTrack] = useState({});
  const updateUser = data => {
    setUser({ ...user, username: data.name, email: data.email, id: data.id });
  };

  const [selectedChannel, setSelectedChannel] = useState({});
  return (
    <div className="App">
    <PlayContext.Provider value={{currentTrack, setCurrentTrack}} >
    <ChannelContext.Provider value={{selectedChannel, setSelectedChannel}}>
    <UserContext.Provider value={{user, setUser}}>
    <TrackContext.Provider value={{track, setTrack}} >
      <Router>
        <Header />
        <ScrollToTop/>
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
            <Route path="/track/:guid">
              <Track />
            </Route>
            <Route path="/thread/:id">
              <Thread/>
            </Route>
          </Switch>
        </Router>
        {currentTrack.track ? 
          <Player/>
          : null
        }
    </TrackContext.Provider>
    </UserContext.Provider>
    </ChannelContext.Provider>
    </PlayContext.Provider>
    </div>
  );
}

export default App;
