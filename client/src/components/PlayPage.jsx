import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import NoArtist from "./NoArtist";
import Record from "./Record";
import SearchBar from "./SearchBar";

const PlayPage = ({
  artistObj,
  currentTrack,
  setCurrentTrack,
  pickedSongs,
}) => {
  const history = useHistory();
  const [round, setRound] = useState(1);

  //These if's check if the data is there and ready to use.
  if (!artistObj.results) {
    history.push("/");
  }
  if (artistObj.resultCount === 0) {
    return <NoArtist />;
  }
  if (!currentTrack) {
    return null;
  }
  if (!currentTrack.previewUrl) {
    return null;
  }



  /**Removes symbols and whitespace from a string.
   * @returns the cleaned string
   * @param {*} string
   */
  const cleanInput = (string) => {
    return string.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  };

  /**Removes a substring that is enclosed in parentheses at the end of the string.
   * @returns a string that has no case, symbols, whitespace,
   *  or the substring enclosed in parenthesis.
   * @param {*} string
   */
  const removeParenthCont = (string) => {
    if (string.indexOf("(") === -1) {
      return "";
    } else {
      return cleanInput(string.substring(0, string.indexOf("(")));
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

    if (removeParenthCont(answer) !== "") {
      answer = removeParenthCont(answer);
    }
    if (removeParenthCont(guess) !== "") {
      guess = removeParenthCont(guess);
    }

    answer = cleanInput(answer);
    guess = cleanInput(guess);

    if (answer === guess) {
      setRound(round + 1);
      return true;
    } else {
      setRound(-1);
      history.push(`/gameover/${correctAns}`);
      return false;
    }
  };

  /**Get a rondom song from the array of song objects without repeats.
   * @returns A single random song object
   * @param {*} artistSongArr
   */
  const getRandomSong = (artistSongArr) => {
    let index = 0;
    while (index < artistSongArr.length) {
      //if the random index is not in the picked song index then put it in there and return the random song
      if (pickedSongs.indexOf(artistSongArr[index].trackName) < 0) {
        pickedSongs.push(artistSongArr[index].trackName);
        return artistSongArr[index];
      }
      index++;
    }
    history.push("/win");
  };

  /**Remove symbols case, and white space from string.
   * @param {*} string
   */
  const setGame = () => {
    let answer = getRandomSong(artistObj.results);
    setCurrentTrack(answer);
  };

  /**Handles the submit for the guess. The function will make a call to check the guess
   * and then set the game for the next round if guess was right.
   * @param {*} event
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    let guess = event.target.elements.searchbar.value;
    if (guess !== "") {
      isGuessCorrect(guess.toString(), currentTrack.trackName.toString());
      setGame();
    }
    event.target.elements.searchbar.value = "";
  };

  return (
    <div className="playHeader">
      <h1>Round {round}</h1>
      <h2>Click the record to play</h2>
      <Record currentTrack={currentTrack} round={round} />
      <SearchBar handleSubmit={handleSubmit} placeholder="Guess that song!" />
    </div>
  );
};

export default PlayPage;
