import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
//the landing page for the song game

//Todo: make api request function
//Todo: Add searchbar react component

const LandingPage = ({ search, setSearch, getArtist }) => {
  //Fix: make this to make it work with a parameter of the users choosing
  const [artistObj, setArtistObj] = useState('');

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    getArtist(search);
    form.reset();
    //console.log(event.target.elements);
  };

  return (
    <div>
      <h1>LandingPage</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Row>
          <Form.Control
            id="search"
            size="lg"
            type="text"
            placeholder="Guss That Song!"
            onChange={handleChange}
          />
        </Form.Row>
      </Form>
    </div>
  );
};
export default LandingPage;
