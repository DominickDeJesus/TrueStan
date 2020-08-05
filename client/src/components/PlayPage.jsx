import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useHistory, Redirect } from 'react-router-dom';

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
  let pickedSongIndecies = new Array(1);
  const audio = new Audio(currentTrack.previewUrl);

  /**Gets the time limit that is dependant on which round of the game it is.
   * @returns A time in miliseconds
   * @param {*} round
   */
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
  /**Removes symbols and whitespace from a string.
   * @returns the cleaned string
   * @param {*} string
   */
  const cleanInput = (string) => {
    return string.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  };

  /**Removes a substring that is enclosed in parentheses at the end of the string.
   * @returns a string that has no case, symbols, whitespace,
   *  or the substring enclosed in parenthesis.
   * @param {*} string
   */
  const removeParenthCont = (string) => {
    if (string.indexOf('(') === -1) {
      return '';
    } else {
      //console.log(string.substring(0, string.indexOf('(')))
      return cleanInput(string.substring(0, string.indexOf('(')));
    }
  };

  /**Sets the next round if correct and send to game over page if guess is wrong.
   * @returns if the answers are the same
   * @param {*} usrGuess
   * @param {*} answer
   */
  const isGuessCorrect = (usrGuess, correctAns) => {
    console.log('Guess was: ', usrGuess.toLowerCase());
    console.log('Answer was: ', correctAns.toLowerCase());

    let guess = usrGuess;
    let answer = correctAns;

    // usrGuess = cleanInput(usrGuess);

    if (removeParenthCont(answer) !== '') {
      answer = removeParenthCont(answer);
      console.log('removed parenths ', answer);
    }
    if (removeParenthCont(guess) !== '') {
      guess = removeParenthCont(guess);
      console.log('removed parenth from guess ', guess);
    }

    answer = cleanInput(answer);
    guess = cleanInput(guess);

    if (answer === guess) {
      setRound(round + 1);
      console.log(`Guess is right! ${guess} = ${answer}`);
      return true;
    } else {
      setRound(-1);
      history.push('/gameover');
      console.log(`Guess is wrong! ${guess} = ${answer}`);
      return false;
    }
  };

  /**Get a rondom song from the array of song objects without repeats.
   * @returns A single random song object
   * @param {*} artistSongArr
   */
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

  /**Remove symbols case, and white space from string.
   * @param {*} string
   */

  const setGame = () => {
    let answer = getRandomSong(artistObj.results);
    setCurrentTrack(answer);
  };
  /**Handles the submit for the guess. The function will make a call to check the geuss
   * and then set the game for the next round if guess was right.
   * @param {*} event
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    stopPlaying();
    let guess = event.target.elements.searchbar.value;
    console.log('The user guessed', guess);
    isGuessCorrect(guess.toString(), currentTrack.trackName.toString());
    setGame();
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
    } else {
      console.log('false');
      stopPlaying();
    }
  };

  return (
<<<<<<< HEAD
    <div className="playHeader">
      <h1>Round {round}</h1>

      <div>
        <h2>Can you complete the catalogue?</h2>
      </div>

      {/* <div>{currentTrack.trackName}</div> */}

=======
    <div>
      <h1>Round {round}</h1>
      {/* <div>{currentTrack.trackName}</div> */}
>>>>>>> c813380b87c723f167f88d6fe8257510bcd1bc75
      <a>
        <button className="button" style={{ borderRadius: '50%' }}>
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
            autocomplete="off"
          ></Form.Control>
        </Form.Row>
      </Form>
    </div>
  );
};

export default PlayPage;
