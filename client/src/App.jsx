import React, { useState, useEffect } from 'react';
import GameOverPage from './components/GameOverPage';
import PlayPage from './components/PlayPage';
import LandingPage from './components/LandingPage';
import { Container } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import NavMenu from './components/NavMenu';
import { useHistory } from 'react-router';
import './App.css';
import bootstrap from 'react-bootstrap'; 



const App = () => {
  const history = useHistory();
  const [search, setSearch] = useState('');
  const [artistObj, setArtistObj] = useState({});
  function getArtist(search) {
    return fetch(`/api/trackNames?search=${search}`)
      .then((results) => results.json())
      .then((data) => {
        setArtistObj(data);
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
          <Route
            exact
            path="/play"
            render={(props) => {
              return <PlayPage {...props} artistObj={artistObj} />;
            }}
          />
        </Switch>
      </Container>
    </Router>
  );
};

export default App;
