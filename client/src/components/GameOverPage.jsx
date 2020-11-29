import React from 'react';
const GameOverPage = ({ match }) => {
  return (
    <div className="gameOverContainer">
      <h1 className="animate__animated animate__bounceInDown">Game Over Man!</h1>
      <h2 style={{padding: '1rem'}}>The answer was "{match.params.answer}"</h2>
      <a className="Buttons" href="/">
        <h2>Click here to try again</h2>
      </a>
    </div>
  );
};
export default GameOverPage;
