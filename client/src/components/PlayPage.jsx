import React, { useState, useEffect, useRef } from 'react';
import { Form, Image } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

//import 'react-h5-audio-player/lib/styles.less'
// import 'react-h5-audio-player/src/styles.scss' Use SASS

//TODO: add mp3 player

const PlayPage = (artistObj) => {
  const [round, setRound] = useState(1);
  const history = useHistory();

  //test values for game
  artistObj = {
    artistName: 'Jack Johnson',
    trackArr: [
      {
        previewUrl:
          'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview118/v4/94/25/9c/94259c23-84ee-129d-709c-577186cbe211/mzaf_5653537699505456197.plus.aac.p.m4a',
        trackName: 'Better Together'
      }
    ]
  };

  const audioPlayerRef = useRef(null);
  const [timePlayed, setTimePlayed] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const startPlaying = () => {
    clearTimeout(window.playerTimeOut);
    audioPlayerRef.current.audio.current.play();
    setIsPlaying(true);
    const newTimePlayed = timePlayed + 1;
    setTimePlayed(newTimePlayed);
    window.playerTimeOut = setTimeout(stopPlaying, getTimeLimit(round));
  };

  const stopPlaying = () => {
    audioPlayerRef.current.audio.current.pause();
    audioPlayerRef.current.audio.current.currentTime = 0;
    setIsPlaying(false);
  };

  let answer = artistObj.trackArr[0].trackName;

  useEffect(() => {
    console.log(artistObj);
  }, []);

  /**Sets the next round if correct and send to game over page if guess is wrong.
   * @returns if the answers are the same
   * @param {*} usrGuess
   * @param {*} answer
   */
  const isGuessCorrect = (usrGuess, answer) => {
    if (usrGuess.toLowerCase() === answer.toLowerCase()) {
      setRound(round + 1);
      console.log(`Guess is right! ${round}`);
      return true;
    } else {
      setRound(-1);
      history.push('/gameover');
      console.log(`Guess is wrong! ${round}`);
      return false;
    }
  };

  const getTimeLimit = (round) => {
    if (round === 1) {
      console.log('Time is set to 15');
      return 15000;
    } else if (round < 3) {
      console.log('Time is set to 10');
      return 10000;
    } else if (round < 6) {
      console.log('Time is set to 5');
      return 5000;
    } else {
      console.log('Time is set to 1');
      return 1000;
    }
  };

  /**Handles the submit for the guess. The function will make a call to check the geuss
   * and then set the game for the next round if guess was right.
   * @param {*} event
   */
  const handleSubmit = (event) => {
    event.preventDefault();

    let guess = event.target.elements.searchbar.value;
    console.log(guess);

    isGuessCorrect(guess, answer);
    setSong(getRandomSong(), getTimeLimit(round));
    event.target.elements.searchbar.value = '';
  };

  //TODO: Write the code to play a song for the given amount of time
  const setSong = (song, time) => {};

  //FIX: function to initialize the player for the game
  const getRandomSong = (artistSongArr) => {
    //Todo: make it output a random song that has not been picked yet
    return artistSongArr && 'Better Together';
  };

  return (
    <div class>
      <div>PlayPage</div>
      <h1>Round {round}</h1>
      <img
        src="https://is2-ssl.mzstatic.com/image/thumb/Music128/v4/00/52/e0/0052e0a1-5aff-3841-3b94-b7a1bed634ad/source/100x100bb.jpg"
        width="300"
      ></img>
      <AudioPlayer
        ref={audioPlayerRef}
        src="https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview128/v4/56/29/df/5629df9c-7ccb-39ef-671c-3b41503d24b0/mzaf_4466913524228839282.plus.aac.p.m4a"
        onPlay={startPlaying}
        onPause={stopPlaying}
        // other props here
      />

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
