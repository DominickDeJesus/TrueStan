import React, { useEffect } from 'react';

const Record = ({ currentTrack, round }) => {
  let playStatus = false;
  const audio = new Audio(currentTrack.previewUrl);
  useEffect(() => {
    return () => {
      stopPlaying();
    };
  }, [audio]);

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
  /**Stop playing the song and reset it to the begining */
  const stopPlaying = () => {
    audio.pause();
    audio.currentTime = 0;
    playStatus = false;
  };
  /**Start playing the song on a timer*/
  const startPlaying = () => {
    clearTimeout(window.playerTimeOut);
    audio.play();
    window.playerTimeOut = setTimeout(stopPlaying, getTimeLimit(round));
    playStatus = true;
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
    <div>
      <button
        className="recordButton"
        style={{ borderRadius: '50%', outline: 'none' }}
        onClick={toggleClick}
      >
        <img src={currentTrack.artworkUrl100} alt="Album Artwork" />
      </button>
    </div>
  );
};

export default Record;
