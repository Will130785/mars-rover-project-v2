//Dependencies
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const path = require("path");

const app = express();
const port = 3000;

//Configuration
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use("/", express.static(path.join(__dirname, "../public")));

//API CALLS
//Info route - make call to each rover end point and send back data in an object
app.get("/info", async (req, res) => {
    //Make fetch request to Nasa api at the manifest end point
    const curiosity = await fetch(`https://api.nasa.gov/mars-photos/api/v1/manifests/curiosity?&api_key=${process.env.API_KEY}`)
    .then(res => res.json())

    const spirit = await fetch(`https://api.nasa.gov/mars-photos/api/v1/manifests/spirit?&api_key=${process.env.API_KEY}`)
    .then(res => res.json())

    const opportunity = await fetch(`https://api.nasa.gov/mars-photos/api/v1/manifests/opportunity?&api_key=${process.env.API_KEY}`)
    .then(res => res.json())

    

    //Construct result object from the two api calls
    const resObj = await {
        curiosity,
        spirit,
        opportunity
    }

    //Send res object
    res.send(resObj);
});

//Photo route - make call to each rover end point and send back data in an object
app.get("/photos", async (req, res) => {
    //Make fetch request to Nasa api at the latest photo end point
    const curiosity = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos?&api_key=${process.env.API_KEY}`)
    .then(res => res.json())

    const spirit = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/spirit/latest_photos?&api_key=${process.env.API_KEY}`)
    .then(res => res.json())

    const opportunity = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/latest_photos?&api_key=${process.env.API_KEY}`)
    .then(res => res.json())
    

    //Construct result object from the two api calls
    const photoObj = {
        curiosity,
        spirit,
        opportunity
    };

    //Send res object
    res.send(photoObj);
});

//Start server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});