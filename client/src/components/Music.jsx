import React, { useState, Component, useEffect, useRef } from 'react';

const Music = ({ songUrl, imgUrl, onClicker }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audio = new Audio(songUrl);
  const togglePlay = () => {
    const newPlayState = !isPlaying;
    setIsPlaying(newPlayState);
    newPlayState ? audio.play() : audio.pause();
  };

  return (
    <a>
      <button
        style={{ borderRadius: '50%', width: '300px', background: 'black' }}
      >
        <img
          style={{ borderRadius: '50%', width: '500' }}
          src={imgUrl}
          alt="Pell"
          onClick={onClicker}
        />
      </button>
    </a>
  );
};

// const Music = ({ songUrl, imgUrl }) => {
//   const player = useRef();

//   const [isPlaying, setIsPlaying] = useState(false);
//   // const [player, setPlayer] = useState(document.getElementById('audioPlayer'));

//   // useEffect(() => {
//   //  togglePlay()
//   // }, []);
//   // let player = document.getElementById('audioPlayer');
//   // if (player) {
//   //   return null;
//   // }
//   let audio;
//   if (audio === undefined) {
//     audio = new Audio(songUrl);
//   }
//   console.log(player.current);

//   function togglePlay() {
//     if (isPlaying) {
//       console.log('im pausing ');
//       player.pause();
//       setIsPlaying(false);
//     } else {
//       console.log('im playing ');
//       player.play();
//       setIsPlaying(true);
//     }

//     let newPlayState = !isPlaying;
//     setIsPlaying(newPlayState);
//     console.log(audio);
//     newPlayState ? audio.pause() : audio.play();
//   }

//   return (
//     <>
//       <audio controls id="audioPlayer" ref={player}>
//         <source
//           src="https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview128/v4/56/29/df/5629df9c-7ccb-39ef-671c-3b41503d24b0/mzaf_4466913524228839282.plus.aac.p.m4a"
//           type="audio/mpeg"
//         />
//       </audio>
//       <img
//         style={{ borderRadius: '50%', zIndex: '10' }}
//         src={imgUrl}
//         alt="Pell"
//         onClick={togglePlay}
//       />
//       Your browser does not support the audio tag.
//       {/* <button onClick={togglePlay}>please work</button> */}
//     </>
//   );
// };

// class Music extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { play: false, track: this.props.songUrl };
//     this.audio = new Audio(this.state.track);
//   }
//   togglePlay = () => {
//     this.setState({ play: !this.state.play }, () => {
//       console.log(this.state.track);
//       this.state.play ? this.audio.play() : this.audio.pause();
//     });
//   };
//   onTrackChange = () => {
//     this.audio.pause();
//     this.audio.load();
//   };

//   componentDidUpdate() {
//     this.onTrackChange();
//   }
//   render() {
//     return (
//       <a>
//         <button style={{ borderRadius: '50%' }}>
//           <img
//             style={{ borderRadius: '50%' }}
//             src={this.props.imgUrl}
//             alt="Artist"
//             onClick={this.togglePlay}
//           />
//           {this.state.play ? '' : ''}
//         </button>
//       </a>
//     );
//   }
// }
export default Music;
