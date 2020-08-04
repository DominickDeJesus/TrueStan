if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const path = require('path');
const app = express();
const axios = require('axios');

// AXIOS API 
app.get('/api/trackNames', async (request, response) => {
  try {
    const { search } = request.query 
    const { data } = await axios.get(`https://itunes.apple.com/search?term=${search}&media=music&entity=musicTrack&song&attribute=artistTerm`)
    response.json(data)
  } catch (error) {
    console.log(error)
  }
});
// end

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`API listening on port ${port}...`);
});
