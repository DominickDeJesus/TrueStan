import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
//the landing page for the song game

//Todo: make api request function
//Todo: Add searchbar react component

const LandingPage = () => {
  //Fix: make this to make it work with a parameter of the users choosing
  const [artistObj, setArtistObj] = useState(""); 
  const [search, setSearch] = useState('')
  function getArtist(search) {
    fetch(`/api/trackNames?search=${search}`)
    .then(results => results.json())
    .then(data => {  
     console.log(data); 
    //  const artistSongs = data.result.map(result => {
    //     return {preview: result.previewUrl, artist: result.artistName, track: result.trackName, thumbnail: result.artworkUrl100} 
    //     });
    //     setArtistObj(artistSongs)
      }).catch(err=>{
        console.log(err)
      });
    //return false;
  }

  const handleChange = e => {
    setSearch(e.target.value)
  }



  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target
    getArtist(search);
    form.reset()
    //console.log(event.target.elements);
  }

  return (<div>
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
  }
export default LandingPage; 
