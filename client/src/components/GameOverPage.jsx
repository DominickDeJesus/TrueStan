import React from 'react';
const GameOverPage = ({ match }) => {
  return (
    <div className="gameOverContainer">
      <h1 className="bounce">Game Over Man!</h1>
      {/* <h1>{match.params.answer}</h1> */}
      <a className="Buttons" href="/">
        <h2 className="Buttons">Click here to try again</h2>
      </a>
    </div>
  );
};
export default GameOverPage;
