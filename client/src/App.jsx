import React, { useState } from 'react';
import GameOverPage from './components/GameOverPage';
import PlayPage from './components/PlayPage';
import LandingPage from './components/LandingPage';
import { Container, Row } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavMenu from './components/NavMenu';
import './App.css';

const App = () => {
  const [search, setSearch] = useState('');
  function getArtist(search) {
    fetch(`/api/trackNames?search=${search}`)
      .then((results) => results.json())
      .then((data) => {
        console.log(data);
        //  const artistSongs = data.result.map(result => {
        //     return {preview: result.previewUrl, artist: result.artistName, track: result.trackName, thumbnail: result.artworkUrl100}
        //     });
        //     setArtistObj(artistSongs)
      })
      .catch((err) => {
        console.log(err);
      });
    //return false;
  }

  return (
    <Router>
      <NavMenu />
      <Container class="container">
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
                />
              );
            }}
          />
          <Route exact path="/gameover" component={GameOverPage} />
          <Route
            exact
            path="/play"
            render={(props) => {
              return <PlayPage {...props} getArtist={getArtist} />;
            }}
          />
        </Switch>
      </Container>
    </Router>
  );
};

export default App;
