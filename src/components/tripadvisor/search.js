const request = require('request')
const searchLocation = {}

searchLocation.search = async (req, res) => {
  const location = req.query.location
  const limit = req.query.limit

  const option = {
    method: 'GET',
    url: 'https://tripadvisor1.p.rapidapi.com/locations/search',
    qs: {
      location_id: '1',
      limit: '1',
      sort: 'relevance',
      offset: '0',
      lang: 'es_CO',
      currency: 'USD',
      units: 'km',
      query: location,
    },
    headers: {
      'x-rapidapi-host': 'tripadvisor1.p.rapidapi.com',
      'x-rapidapi-key': 'bea02aec26msh1530ec3ef0f107fp13cbd0jsn30da004610b3',
    },
  }
  request(option, function (error, response, body) {
    if (error) throw new Error(error)
    let data = JSON.parse(body)

    let locationId = data.data[0].result_object.location_id

    const locationRestaurants = {
      method: 'GET',
      url: 'https://tripadvisor1.p.rapidapi.com/restaurants/list',
      qs: {
        restaurant_tagcategory_standalone: '',
        lunit: 'km',
        restaurant_tagcategory: '',
        limit: limit,
        currency: 'USD',
        lang: 'es_CO',
        location_id: locationId,
      },
      headers: {
        'x-rapidapi-host': 'tripadvisor1.p.rapidapi.com',
        'x-rapidapi-key': 'bea02aec26msh1530ec3ef0f107fp13cbd0jsn30da004610b3',
      },
    }
    request(locationRestaurants, function (error, response, body) {
      if (error) throw new Error(error)
      var dataRestaurants = JSON.parse(body)

      const locationAtractions = {
        method: 'GET',
        url: 'https://tripadvisor1.p.rapidapi.com/attractions/list',
        qs: {
          lang: 'en_CO',
          currency: 'USD',
          lunit: 'km',
          limit: limit,
          location_id: locationId,
        },
        headers: {
          'x-rapidapi-host': 'tripadvisor1.p.rapidapi.com',
          'x-rapidapi-key':
            'bea02aec26msh1530ec3ef0f107fp13cbd0jsn30da004610b3',
        },
      }
      request(locationAtractions, function (error, response, body) {
        if (error) throw new Error(error)
        let dataAtractions = JSON.parse(body)

        var today = new Date()
        day = today.getDate() + 2
        month = today.getMonth() + 1 // +1 porque los meses empiezan en 0
        year = today.getFullYear()
        let date = `${year}-${month}-${day}`

        const locationHotel = {
          method: 'GET',
          url: 'https://tripadvisor1.p.rapidapi.com/hotels/list',
          qs: {
            location_id: locationId,
            pricesmin: '',
            offset: '0',
            pricesmax: '',
            currency: 'USD',
            limit: limit,
            order: 'asc',
            lang: 'es_CO',
            sort: 'recommended',
            checkin: date,
            adults: '1',
            rooms: '1',
            nights: '1',
          },
          headers: {
            'x-rapidapi-host': 'tripadvisor1.p.rapidapi.com',
            'x-rapidapi-key':
              'bea02aec26msh1530ec3ef0f107fp13cbd0jsn30da004610b3',
          },
        }

        request(locationHotel, function (error, response, body) {
          if (error) throw new Error(error)
          let dataHotel = JSON.parse(body)

          res.json({
            locationId: locationId,
            dataAtractions: dataAtractions,
            dataRestaurants: dataRestaurants,
            dataHotel: dataHotel,
          })
        })
      })
    })
  })
}

module.exports = searchLocation
