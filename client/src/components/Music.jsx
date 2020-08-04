import React, { useState, Component, useEffect } from 'react';
const Music = ({ songUrl, imgUrl }) => {
  const [isPlaying, setIsPlaying] = useState(true);

  let audio;
  if (audio === undefined) {
    audio = new Audio(songUrl);
  }
  function togglePlay() {
    let newPlayState = !isPlaying;
    setIsPlaying(newPlayState);
    newPlayState ? audio.load() : audio.play();
  }

  return (
    <button style={{ borderRadius: '50%' }}>
      <img
        style={{ borderRadius: '50%' }}
        src={imgUrl}
        alt="Pell"
        onClick={togglePlay}
      />
      {isPlaying ? '' : ''}
    </button>
  );
};

// class Music extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { play: false };
//     this.audio = new Audio(this.props.songUrl);
//   }
//   togglePlay = () => {
//     this.setState({ play: !this.state.play }, () => {
//       console.log(this.props.songUrl);
//       this.state.play ? this.audio.play() : this.audio.pause();
//     });

//     // this.onTrackChange = () => {
//     //   this.setState({ isPlaying: this.props.songUrl }, function () {
//     //     this.audio.pause();
//     //     this.audio.load();
//     //     this.audio.play();
//     //   });
//     // };
//   };
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
