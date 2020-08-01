import React, { useState, useEffect } from 'react';
import { AppContextProvider } from './context/AppContext';
import ContextDemo from './components/ContextDemo';
import GameOverPage from './components/GameOverPage';
import PlayPage from './components/PlayPage';
import LandingPage from './components/LandingPage';
import Container from 'react-bootstrap/Container';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavMenu from './components/NavMenu';
import './App.css';

const App = () => {
  // const [serverMessage, setServerMessage] = useState('');

  // const fetchDemoData = () => {
  //   fetch('/api/demo')
  //     .then((response) => response.json())
  //     .then((data) => setServerMessage(data.message));
  // };

  //useEffect(fetchDemoData, []);

  return (
    <Router>
      <NavMenu />
      <Container>
        <Switch>
          <Route path="/gameover" component={GameOverPage} />
          <Route path="/play" component={PlayPage} />
          <Route exact path="/" component={LandingPage} />
        </Switch>
      </Container>
    </Router>
  );
};

export default App;
