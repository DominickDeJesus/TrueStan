import React, { useState } from 'react';
import GameOverPage from './components/GameOverPage';
import PlayPage from './components/PlayPage';
import LandingPage from './components/LandingPage';
import WinningPage from './components/WinningPage';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavMenu from './components/NavMenu';
import './App.css';

const App = () => {
  const [search, setSearch] = useState('');
  const [artistObj, setArtistObj] = useState({});
  const [currentTrack, setCurrentTrack] = useState({});
  function getArtist(search) {
    return fetch(`/api/trackNames?search=${search}`)
      .then((results) => results.json())
      .then((data) => {
        setArtistObj(data);
        setCurrentTrack(data.results[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Router>
      <NavMenu />
      <Container className="container">
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => {
              return (
                <LandingPage
                  {...props}
                  search={search}
                  setSearch={setSearch}
                  getArtist={getArtist}
                  setArtistObj={setArtistObj}
                />
              );
            }}
          />
          <Route exact path="/gameover" component={GameOverPage} />
          <Route exact path="/win" component={WinningPage} />
          <Route
            exact
            path="/play"
            render={(props) => {
              return (
                <PlayPage
                  {...props}
                  artistObj={artistObj}
                  currentTrack={currentTrack}
                  setCurrentTrack={setCurrentTrack}
                />
              );
            }}
          />
        </Switch>
      </Container>
    </Router>
  );
};

export default App;
