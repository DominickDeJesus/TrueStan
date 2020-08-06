import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useHistory, Redirect } from 'react-router-dom';

const PlayPage = ({
  artistObj,
  currentTrack,
  setCurrentTrack,
  pickedSongIndecies
}) => {
  const history = useHistory();
  const [round, setRound] = useState(1);
  const handleClick = () => {
    history.push('/');
  };

  //These if's check if the data is there and ready to use.
  if (!artistObj.results) {
    return <Redirect to="/" />;
  }
  if (artistObj.resultCount === 0) {
    return (
      <>
        <h1 style={{ paddingTop: '150px' }}>Couldn't Find Artist!</h1>
        <h2 className="Buttons" style={{ padding: '0' }} onClick={handleClick}>
          Click Here To Search Again
        </h2>
      </>
    );
  }

  if (!currentTrack) {
    return null;
  }
  if (!currentTrack.previewUrl) {
    return null;
  }
  let playStatus = false;
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
    let guess = usrGuess;
    let answer = correctAns;

    if (removeParenthCont(answer) !== '') {
      answer = removeParenthCont(answer);
      //console.log('removed parenths ', answer);
    }
    if (removeParenthCont(guess) !== '') {
      guess = removeParenthCont(guess);
      //console.log('removed parenth from guess ', guess);
    }

    answer = cleanInput(answer);
    guess = cleanInput(guess);

    if (answer === guess) {
      setRound(round + 1);
      return true;
    } else {
      setRound(-1);
      history.push('/gameover');
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
      //if the random index is not in the picked song inex then put it in there and retunr the random song
      if (pickedSongIndecies.indexOf(randomIndex) < 0) {
        pickedSongIndecies.push(randomIndex);
        //console.log('I should have changed ', pickedSongIndecies);
        return artistSongArr[randomIndex];
      }
    }
    history.push('/win');
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
    if (guess !== '') {
      isGuessCorrect(guess.toString(), currentTrack.trackName.toString());
      setGame();
    }
    event.target.elements.searchbar.value = '';
  };

  /**Start playing the song on a timer*/
  const startPlaying = () => {
    clearTimeout(window.playerTimeOut);
    audio.play();
    window.playerTimeOut = setTimeout(stopPlaying, getTimeLimit(round));
    playStatus = true;
  };

  /**Stop playing the song and reset it to the begining */
  const stopPlaying = () => {
    audio.pause();
    audio.currentTime = 0;
    playStatus = false;
  };

  /**Handles the click event of the button. It will toggle between
   * the pause and play functions.
   */
  const toggleClick = () => {
    if (!playStatus) {
      startPlaying();
    } else {
      stopPlaying();
    }
  };

  return (
    <div className="playHeader">
      <h1>Round {round}</h1>

      {/* <div>{currentTrack.trackName}</div> */}
      <h2>Click the record to play</h2>
      <a>
        <button
          className="button"
          style={{ borderRadius: '50%', outline: 'none' }}
          onClick={toggleClick}
        >
          <img
            style={{ borderRadius: '50%' }}
            src={currentTrack.artworkUrl100}
            alt="Album Artwork"
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
            autoComplete="off"
          ></Form.Control>
        </Form.Row>
      </Form>
    </div>
  );
};

export default PlayPage;
