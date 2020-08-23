const unirest = require("unirest");

const uniRest = {};

uniRest.getLocation = (req, res) => {
  try {
    console.log(req.query.city);
    const solicitud = unirest(
      "GET",
      "https://tripadvisor1.p.rapidapi.com/locations/search"
    );
    solicitud.query({
      location_id: "1",
      limit: "30",
      sort: "relevance",
      offset: "0",
      lang: "es_ES",
      currency: "COP",
      units: "km",
      query: req.query.city,
    });
    solicitud.headers({
      "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
      "x-rapidapi-key": "bea02aec26msh1530ec3ef0f107fp13cbd0jsn30da004610b3",
      useQueryString: true,
    });
    console.log(solicitud);
    solicitud.end(function (respon) {
      if (respon.error) throw new Error("Error solicitud" + respon.error);
      console.log(respon.body);
    });
  } catch (error) {
    res.json("error" + error);
  }
};

module.exports = uniRest;
