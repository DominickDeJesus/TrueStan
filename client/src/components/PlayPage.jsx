import React, { useState, useEffect, useRef } from 'react';
import { Form } from 'react-bootstrap';
import { useHistory, Redirect } from 'react-router-dom';

// import AudioPlayer from 'react-h5-audio-player';
// import 'react-h5-audio-player/lib/styles.css';

// //import 'react-h5-audio-player/lib/styles.less'
// // import 'react-h5-audio-player/src/styles.scss' Use SASS

//TODO: add mp3 player

const PlayPage = ({ artistObj, currentTrack, setCurrentTrack }) => {
  const history = useHistory();
  const [round, setRound] = useState(1);

  if (!artistObj.results) {
    return <Redirect path="/" />;
  }
  if (!currentTrack.previewUrl) {
    return null;
  }
  let playStatus = false;
  let timePlayed = 15;
  let pickedSongIndecies = new Array(1);
  const audio = new Audio(currentTrack.previewUrl);

  //console.log(artistObj);
  const getTimeLimit = (round) => {
    if (round === 1) {
      console.log('Time is set to 15');
      return 15000;
    } else if (round < 4) {
      console.log('Time is set to 10');
      return 10000;
    } else if (round < 8) {
      console.log('Time is set to 5');
      return 5000;
    } else {
      console.log('Time is set to 1.5');
      return 1500;
    }
  };

  /**Sets the next round if correct and send to game over page if guess is wrong.
   * @returns if the answers are the same
   * @param {*} usrGuess
   * @param {*} answer
   */
  const isGuessCorrect = (usrGuess, correctAns) => {
    console.log('guess was: ' + correctAns.toString().toLowerCase());
    console.log('Answer was: ' + correctAns.toString().toLowerCase());
    if (
      usrGuess.toString().toLowerCase() === correctAns.toString().toLowerCase()
    ) {
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

  //FIX: function to initialize the player for the game
  const getRandomSong = (artistSongArr) => {
    while (pickedSongIndecies.length < artistSongArr.length) {
      let randomIndex = Math.round(Math.random() * artistSongArr.length);
      console.log(pickedSongIndecies.indexOf(randomIndex));
      //if the random index is not in the picked song inex then put it in there and retunr the random song
      if (pickedSongIndecies.indexOf(randomIndex) < 0) {
        pickedSongIndecies.push(randomIndex);
        return artistSongArr[randomIndex];
      } else {
        console.log(pickedSongIndecies.length + randomIndex);
      }
    }
    window.alert("Wow! Didn't think that would happen. I guess you won.");
    history.push('/');
    return artistSongArr;
  };

  const setGame = () => {
    let answer = getRandomSong(artistObj.results);
    setCurrentTrack(answer);
    //console.log(currentTrack.previewUrl);
  };
  /**Handles the submit for the guess. The function will make a call to check the geuss
   * and then set the game for the next round if guess was right.
   * @param {*} event
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    stopPlaying();
    let guess = event.target.elements.searchbar.value;
    console.log(guess);
    isGuessCorrect(guess.toString(), currentTrack.trackName);
    setGame();
    //answer = getSongInOrder(artistObj?.results);
    event.target.elements.searchbar.value = '';
  };

  const startPlaying = () => {
    clearTimeout(window.playerTimeOut);
    audio.play();
    window.playerTimeOut = setTimeout(stopPlaying, getTimeLimit(round));
    playStatus = true;
  };

  const stopPlaying = () => {
    audio.pause();
    audio.currentTime = 0;
    playStatus = false;
  };

  const toggleClick = () => {
    console.log('isPlaying2:', playStatus);
    if (!playStatus) {
      console.log('true');
      startPlaying();
      //audio.play();
    } else {
      console.log('false');
      stopPlaying();
      //audio.pause();
    }
    // playStatus = !playStatus;
  };

  return (
    <div>
      <h1>Round {round}</h1>
      <div>{currentTrack.trackName}</div>
      <a>
        <button style={{ borderRadius: '50%' }}>
          <img
            style={{ borderRadius: '50%' }}
            src={currentTrack.artworkUrl100}
            alt="Album Artwork"
            onClick={toggleClick}
          />
        </button>
      </a>
      <Form onSubmit={handleSubmit}>
        <Form.Row>
          <Form.Control
            id="searchbar"
            size="lg"
            type="text"
            placeholder="Guess that song!"
          ></Form.Control>
        </Form.Row>
      </Form>
    </div>
  );
};

export default PlayPage;
