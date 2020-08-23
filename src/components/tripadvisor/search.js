const axios = require("axios");
const searchLocation = {};

searchLocation.search = (req, res) => {
  try {
    console.log("perfecto");
    axios({
      method: "GET",
      url: "https://tripadvisor1.p.rapidapi.com/locations/search",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
        "x-rapidapi-key": "bea02aec26msh1530ec3ef0f107fp13cbd0jsn30da004610b3",
        useQueryString: true,
      },
      params: {
        location_id: "1",
        limit: "30",
        sort: "relevance",
        offset: "0",
        lang: "en_US",
        currency: "USD",
        units: "km",
        query: "pattaya",
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};
