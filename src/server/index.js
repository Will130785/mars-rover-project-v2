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

//API calls
app.get("/info", async (req, res) => {
    //Make fetch request to Nasa api at the manifest end point
    let result = await fetch(`https://api.nasa.gov/mars-photos/api/v1/manifests/${req.query.rover.toLowerCase()}?&api_key=${process.env.API_KEY}`)
    .then(res => res.json())

    //When result is recieved save photos array to variable
    const photoArr = await result.photo_manifest.photos;
    //Get array for the most recent photos
    const date = await photoArr[photoArr.length - 1].earth_date;
    
    //Make second API call to find photos for the selected Rover with the latest date stored in the variable above
    let result2 = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${req.query.rover}/photos?earth_date=${date}&api_key=${process.env.API_KEY}`)
    .then(res => res.json())

    //Construct result object from the two api calls
    const resObj = await {
        res1: result,
        res2: result2,
        date: date
    }

    //Send res object
    res.send(resObj);
});

//Start server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});