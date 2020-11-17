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
    console.log(req.query);
    let result = await fetch(`https://api.nasa.gov/mars-photos/api/v1/manifests/${req.query.rover.toLowerCase()}?&api_key=${process.env.API_KEY}`)
    .then(res => res.json())
    res.send({result});
});

//Start server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});