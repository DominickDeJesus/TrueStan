import React from 'react';
import { Form, FormControl } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

//the landing page for the song game

const LandingPage = ({ search, setSearch, getArtist, setArtistObj }) => {
  //Fix: make this to make it work with a parameter of the users choosing
  const history = useHistory();
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    getArtist(search).then(() => {
      form.reset();
      history.push('/play');
    });
  };

  return (
    <container>
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
    </container>
  );
};
export default LandingPage;
