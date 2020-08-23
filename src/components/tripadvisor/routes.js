const express = require("express");
const router = express.Router();
const unirest = require("./unirest");
//const searchLocation = require("./search");

router.get("/searchLocation", unirest.getLocation);

module.exports = router;
