import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import SearchBar from "./SearchBar";
const LandingPage = ({ search, setSearch, getArtist, setArtistObj, history }) => {
const [redirect,setRedirect] = useState(false);
if(redirect) return<Redirect to="/play" />;

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  function handleSubmit(event) {
    event.preventDefault();
    getArtist(search).then(()=>
    setRedirect(true) )
  };

  return (
    <Container style={{ marginBottm: "0px" }}>
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
