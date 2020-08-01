import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';

//TODO: add mp3 player
//TODO: Add a game logic function that handles

//May need this to keep track of what round the user is in
//const [round, setRound] = useState(1);

//TODO: Write the main logic of the game

//temp varriable for testing

const PlayPage = (artistObj) => {
  const [search, setSearch] = useState('');
  const [round, setRound] = useState(1);

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
      console.log('guess is right!');
      return true;
    } else {
      console.log('guess is wrong!');
      return false;
    }
  };

  // const goToPage = (page) => {};

  //TODO: Write the code to play a song for the given amount of time
  const playSong = (song, time) => {};

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('is this thing on?');
    let guess = event.target.elements.searchbar.value;
    // Take the value of the input box and set the search state
    // "searchbar" was the ID of the input bar when we displayed
    // in the JSX below.
    console.log(guess);
    isGuessCorrect(guess);
    setSearch(guess);

    guess = '';
  };

  useEffect(() => {
    console.log('I entered useEffect. Did it work?');
    getRandomSong();
  }, []);

  return (
    <div>
      <div>PlayPage</div>
      <h1>Round {1}</h1>
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
