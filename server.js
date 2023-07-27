// import express, cors and axios
const express = require("express");
const cors = require("cors");
const axios = require("axios");

// load the environment variables
require("dotenv").config();

//declare a variable named app that is express invoked
const app = express();

// enable the server to respond to preflight requests
app.use(cors());

// set the PORT
const PORT = process.env.PORT || 8090;

// set up an endpoint - a response from the home route
app.get("/", (request, response) => {
  response.json("Ho, Ho, Ho, give me all your money!");
});

// endpoint for photos
app.get("/photos", async (request, response) => {
  const subject = request.query.subject;
  const API = `https://api.unsplash.com/search/photos/?client_id=${process.env.ACCESS_KEY}&query=${subject}`;
  const res = await axios.get(API);
  // console.log(res.data);
  // console.log(res.data.results[0].urls);
  const photos = res.data.results.map((photo) => {
    return {
      id: photo.id,
      img_url: photo.urls.regular,
      original_image: photo.links.self,
      photographer: photo.user.name,
    };
  });
  response.json(photos);
});

// Invoke app.listen() function to listen to the connection on the Specified port. The Callback specifies a function that will get executed, once your app starts listening to the specified port.
app.listen(PORT, () => `app is listening on port ${PORT}`);
