import React, { useState } from 'react';
import { Form, FormControl } from 'react-bootstrap';

//the landing page for the song game

//fetching itunes API
const LandingPage = () => {
  const [artistObj, setArtistObj] = useState(""); 
  const [search, setSearch] = useState('')
  function getArtist(search) {
    fetch(`/api/trackNames?search=${search}`)
    .then(results => results.json())
    .then(data => {  
     console.log(data); 

      }).catch(err=>{
        console.log(err)
      });

  }

  const handleChange = e => {
    setSearch(e.target.value)
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target
    getArtist(search);
    form.reset()
  
  }

  return (<container>
 <h1 data-text="ARE YOU A TRUE STAN">ARE YOU A TRUE STAN?</h1>
 <h2>search an artist<spam>  ⚡ </spam>guess the song</h2>
  <Form onSubmit={handleSubmit}>
  <Form.Row>
    <FormControl 
      id="search"
      size='lg'
      type="text"
      placeholder="Search artist"
      onChange={handleChange}
    />
  </Form.Row> 
</Form>
</container>
);
  }

export default LandingPage; 

