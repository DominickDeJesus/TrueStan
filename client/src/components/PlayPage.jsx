import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { Route } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

//TODO: add mp3 player
//TODO: Add a game logic function that handles

//May need this to keep track of what round the user is in
//const [round, setRound] = useState(1);

//TODO: Write the main logic of the game

//temp varriable for testing

const PlayPage = (artistObj) => {
  const [round, setRound] = useState(1);
  const history = useHistory();

  let song = {
    artistName: 'Jack Johnson',
    previewUrl:
      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview118/v4/94/25/9c/94259c23-84ee-129d-709c-577186cbe211/mzaf_5653537699505456197.plus.aac.p.m4a',
    trackName: 'Better Together'
  };

  const getRandomSong = (artistSongArr) => {
    //Todo: make it output a random song that has not been picked yet
    return artistSongArr && 'Better Together';
  };

  const isGuessCorrect = (usrGuess) => {
    if (usrGuess.toLowerCase() === song.trackName.toLowerCase()) {
      setRound(round + 1);
      console.log(`guess is right! ${round}`);
      return true;
    } else {
      setRound(-1);
      history.push('/gameover');
      console.log(`guess is wrong! ${round}`);
      return false;
    }
  };

  const getTimeLimit = () => {
    if (round === 1) {
      console.log('Time is set to 15');
      return 15;
    } else if (round < 3) {
      console.log('Time is set to 10');
      return 10;
    } else if (round < 6) {
      console.log('Time is set to 5');
      return 5;
    } else {
      console.log('Time is set to 1');
      return 1;
    }
  };

  //TODO: Write the code to play a song for the given amount of time
  const setSong = (song, time) => {};

  const handleSubmit = (event) => {
    event.preventDefault();
    let guess = event.target.elements.searchbar.value;
    console.log(guess);
    isGuessCorrect(guess);
    setSong(getRandomSong(), getTimeLimit());
    event.target.elements.searchbar.value = '';
  };

  useEffect(() => {
    console.log('I entered useEffect. Did it work?');
    getRandomSong();
  }, []);

  return (
    <div>
      <div>PlayPage</div>
      <h1>Round {round}</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Row>
          <Form.Control
            id="searchbar"
            size="lg"
            type="text"
            placeholder="Guss That Song!"
          ></Form.Control>
        </Form.Row>
      </Form>
    </div>
  );
};

export default PlayPage;
