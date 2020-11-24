import React from 'react';
import { useHistory } from 'react-router-dom';
const NoArtist = () => {
  const history = useHistory();
  const handleClick = () => {
    history.push('/');
  };
  return (
    <>
      <h1>Couldn't Find Artist!</h1>
      <h2 className="Buttons" style={{ padding: '0' }} onClick={handleClick}>
        Click Here To Search Again
      </h2>
    </>
  );
};

export default NoArtist;
