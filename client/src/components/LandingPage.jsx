import React, { useEffect } from 'react';
import { Form, FormControl, Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const LandingPage = ({ search, setSearch, getArtist, setArtistObj }) => {
  const history = useHistory();
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    if (search !== '') {
      getArtist(search).then(() => {
        history.push('/play');
      });
    }
    form.reset();
  };

  return (
    <Container>
      <h1 data-text="ARE YOU A TRUE STAN">ARE YOU A TRUE STAN?</h1>

      <h2>
        search an artist
        <span role="img" aria-label="lightning">
          {' '}
          ⚡{' '}
        </span>
        guess the song
      </h2>
      <Form onSubmit={handleSubmit}>
        <Form.Row>
          <FormControl
            id="search"
            size="lg"
            type="text"
            placeholder="Search artist"
            onChange={handleChange}
            autoComplete="off"
          />
        </Form.Row>
      </Form>
    </Container>
  );
};
export default LandingPage;
