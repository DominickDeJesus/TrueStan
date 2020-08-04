import React, { useState, Component } from 'react';
// const Music = ({ songUrl, imgUrl }) => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const audio = new Audio(songUrl);
//   const togglePlay = () => {
//     let newPlayState = !isPlaying;
//     setIsPlaying(newPlayState);
//     newPlayState ? audio.play() : audio.pause();
//   };
//   return (
//     <a>
//       <button style={{ borderRadius: '50%' }}>
//         <img
//           style={{ borderRadius: '50%' }}
//           src={imgUrl}
//           alt="Pell"
//           onClick={togglePlay}
//         />
//       </button>
//     </a>
//   );
// };

class Music extends Component {
  constructor(props) {
    super(props);
    this.state = { play: false };
    this.audio = new Audio(this.props.songUrl);
  }
  togglePlay = () => {
    this.audio.load();
    this.setState({ play: !this.state.play }, () => {
      this.state.play ? this.audio.play() : this.audio.pause();
    });
  };
  render() {
    return (
      <a>
        <button style={{ borderRadius: '50%' }}>
          <img
            style={{ borderRadius: '50%' }}
            src={this.props.imgUrl}
            alt="Artist"
            onClick={this.togglePlay}
          />
          {this.state.play ? '' : ''}
        </button>
      </a>
    );
  }
}
export default Music;
