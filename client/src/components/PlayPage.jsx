import React, { useState, useEffect } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

//import 'react-h5-audio-player/lib/styles.less'
// import 'react-h5-audio-player/src/styles.scss' Use SASS

//TODO: add mp3 player
//TODO: Add a game logic function that handles

//May need this to keep track of what round the user is in
//const [round, setRound] = useState(1);

//TODO: Write the main logic of the game
//function playGame() {}

//TODO: Write the code to play a song for the given amount of time
//function playSong(song, time) {}

const PlayPage = () => {
  return <div>
    <img src= "https://i.postimg.cc/zB9wLNqM/Pell.jpg"></img>
  <AudioPlayer
    src= "https://www.mboxdrive.com/Pell-Show Out.mp3"
    onPlay={e => console.log("onPlay")}
    // other props here
  />
  
  </div>;
};

export default PlayPage;
