import React from 'react';
import { Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import SearchBar from './SearchBar';
const LandingPage = ({ search, setSearch, getArtist, setArtistObj }) => {
  const history = useHistory();
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    getArtist(search).then(() => {
      history.push('/play');
    });
    form.reset();
  };

  return (
    <Container style={{ marginBottm: '0px' }}>
      <h1 data-text="ARE YOU A TRUE STAN">ARE YOU A TRUE STAN?</h1>
      <h2>
        search an artist
        <span role="img" aria-label="lightning">
          ⚡
        </span>
        guess the song
      </h2>
      <SearchBar
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        placeholder="Search artist"
      />
    </Container>
  );
};
export default LandingPage;
