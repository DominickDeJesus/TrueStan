import React, { useState, useEffect, useRef } from 'react';
import { Form } from 'react-bootstrap';
import { useHistory, Redirect } from 'react-router-dom';
import Music from './Music';

// import AudioPlayer from 'react-h5-audio-player';
// import 'react-h5-audio-player/lib/styles.css';

// //import 'react-h5-audio-player/lib/styles.less'
// // import 'react-h5-audio-player/src/styles.scss' Use SASS

//TODO: add mp3 player

const PlayPage = ({ artistObj }) => {
  const history = useHistory();
  const audioPlayerRef = useRef(null);
  const [round, setRound] = useState(1);
  const [timePlayed, setTimePlayed] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState({});

  useEffect(() => {
    setCurrentTrack(artistObj.results[0]);
    console.log(artistObj.results[0].previewUrl);
  }, []);

  if (!artistObj.results) {
    return <Redirect path="/" />;
  }
  if (!currentTrack.previewUrl) {
    return null;
  }

  let pickedSongIndecies = new Array(1);
  console.log(artistObj);
  let answer = artistObj.results[0];
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

  /**Handles the submit for the guess. The function will make a call to check the geuss
   * and then set the game for the next round if guess was right.
   * @param {*} event
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    let guess = event.target.elements.searchbar.value;
    console.log(guess);
    isGuessCorrect(guess.toString(), answer.trackName);
    answer = getRandomSong(artistObj.results);
    setCurrentTrack(answer);
    //answer = getSongInOrder(artistObj?.results);

    //setSong(getRandomSong(), getTimeLimit(round));
    //    let nextSong = getRandomSong().previewUrl;
    //    setSongUrl(nextSong);

    event.target.elements.searchbar.value = '';
  };

  const startPlaying = () => {
    clearTimeout(window.playerTimeOut);
    audioPlayerRef.this.audio.play();
    setIsPlaying(true);
    const newTimePlayed = timePlayed + 1;
    setTimePlayed(newTimePlayed);
    window.playerTimeOut = setTimeout(stopPlaying, getTimeLimit(round));
  };

  const stopPlaying = () => {
    audioPlayerRef.current.audio.current.pause();
    audioPlayerRef.current.audio.current.currentTime = 0;
    //setIsPlaying(false);
  };

  return (
    <div>
      <div>PlayPage</div>
      <h1>Round {round}</h1>
      <div>{currentTrack.trackName}</div>
      <Music
        ref={audioPlayerRef}
        // onPlay={startPlaying}
        // onPause={stopPlaying}
        songUrl={currentTrack.previewUrl}
        imgUrl={currentTrack.artworkUrl100}
      />

      {/* <AudioPlayer
        ref={audioPlayerRef}
        src={songUrl}
        onPlay={startPlaying}
        onPause={stopPlaying}
        // other props here
      /> */}
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
