import React from "react";
import { Container } from "react-bootstrap";
import SearchBar from "./SearchBar";
const LandingPage = ({ search, setSearch, getArtist, setArtistObj, history }) => {
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (event) => {
      event.preventDefault();
      getArtist(search).then(()=>
      history.push("/play"));
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
