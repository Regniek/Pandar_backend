const TouristicSites = require('./model')
const touristicSitesController = {}
const request = require('request')
const { config } = require('../../config/index')

const LIMIT = 30

const formatDataTripAdvisor = (data, categories) => {
  return data.map((data) => {
    return {
      _id: data.location_id,
      location_name: data.name,
      country: data.location_string,
      city: data.location_string,
      latitude: data.latitude,
      length: data.longitude,
      rating: data.rating,
      address: data.address,
      average_price: data.price,
      phone: data.phone,
      web: data.web_url,
      image: data.photo ? data.photo.images : null,
      categories: categories
    }
  })
}

touristicSitesController.getSites = async (req, res, next) => {
  try {
    const sites = await TouristicSites.find()
    res.json({
      status: 200,
      message: 'Touristic sites listed',
      body: sites
    })
  } catch (error) {
    next(error)
  }
}

touristicSitesController.getOneSite = async (req, res, next) => {
  try {
    const site = await TouristicSites.findById(req.params.id)
    res.json({
      status: 200,
      message: 'Touristic site listed',
      body: site
    })
  } catch (error) {
    next(error)
  }
}

touristicSitesController.postSite = async (req, res, next) => {
  try {
    const site = new TouristicSites({
      location_name: req.body.location_name,
      country: req.body.country,
      city: req.body.city,
      latitude: req.body.latitude,
      length: req.body.length,
      rating: req.body.rating,
      address: req.body.address,
      average_price: req.body.average_price,
      phone: req.body.phone,
      web: req.body.web,
      image: req.body.image,
      categories: req.body.categories
    })
    await site.save()
    res.json({
      status: 201,
      message: 'Touristic site created',
      body: site
    })
  } catch (error) {
    next(error)
  }
}

touristicSitesController.updateSite = async (req, res, next) => {
  try {
    const site = {
      location_name: req.body.location_name,
      country: req.body.country,
      city: req.body.city,
      latitude: req.body.latitude,
      length: req.body.length,
      rating: req.body.rating,
      address: req.body.address,
      average_price: req.body.average_price,
      phone: req.body.phone,
      web: req.body.web,
      image: req.body.image,
      categories: req.body.categories
    }
    await TouristicSites.findByIdAndUpdate(
      req.params.id,
      { $set: site },
      { omitUndefined: true, upsert: true }
    )
    res.json({
      status: 200,
      message: 'Touristic site updated',
      body: site
    })
  } catch (error) {
    next(error)
  }
}

touristicSitesController.deleteSite = async (req, res, next) => {
  try {
    await TouristicSites.findByIdAndRemove(req.params.id)
    res.json({
      status: 200,
      message: `Touristic site ${req.params.id} deleted`
    })
  } catch (error) {
    next(error)
  }
}

touristicSitesController.searchByCategories = async (req, res, next) => {
  try {
    const city = req.query.city
    if (req.query.categories === null || !req.query.categories) {
      city.replace(/[á,a,e,é,i,í,o,ó,ö,u,ú,ü]/g, '[-\'0-9a-zÀ-ÿ]')
      const sites = await TouristicSites.find({
        city: { $regex: city, $options: 'i' }
      })
      res.json({
        count: sites.length,
        body: sites
      })
    } else if (req.query.categories === 'Hoteles' || req.query.categories === 'hoteles') {
      city.replace(' ', '%20')
      touristicSitesController.searchHotel(req, res)
    } else if (req.query.categories === 'Restaurantes' || req.query.categories === 'restaurantes') {
      city.replace(' ', '%20')
      touristicSitesController.searchRestaurant(req, res)
    } else {
      city.replace(/[á,a,e,é,i,í,o,ó,ö,u,ú,ü]/g, '[-\'0-9a-zÀ-ÿ]')

      const { categories } = req.query
      const sites = await TouristicSites.find({
        categories: { $in: categories},
        $or: [{ city: { $regex: city, $options: 'i'}}]
      })
      res.json({
        count: sites.length,
        body: sites
      })
    }
  } catch (error) {
    next(error)
  }
}

touristicSitesController.searchHotel = async (req, res, next) => {
  const location = req.query.city
  const limit = LIMIT
  const option = {
    method: 'GET',
    url: 'https://tripadvisor1.p.rapidapi.com/locations/search',
    qs: {
      location_id: '1',
      limit: '1',
      sort: 'relevance',
      offset: '0',
      lang: 'en_EN',
      currency: 'USD',
      units: 'km',
      query: location
    },
    headers: {
      'x-rapidapi-host': config.tripAdvisorHost,
      'x-rapidapi-key': config.tripAdvisorKey
    }
  }
  request(option, function (error, response, body) {
    try {
      const data = JSON.parse(body)
      const locationId = data.data[0].result_object.location_id
      const today = new Date()
      const day = today.getDate() + 2
      const month = today.getMonth() + 1 // +1 porque los meses empiezan en 0
      const year = today.getFullYear()
      const date = `${year}-${month}-${day}`

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
          lang: 'es_ES',
          sort: 'recommended',
          checkin: date,
          adults: '1',
          rooms: '1',
          nights: '1'
        },
        headers: {
          'x-rapidapi-host': config.tripAdvisorHost,
          'x-rapidapi-key': config.tripAdvisorKey
        }
      }
      request(locationHotel, function (error, response, body) {
        try {
          const dataHotel = JSON.parse(body)
          const formattedData = formatDataTripAdvisor(dataHotel.data, ['Hotel'])
          res.json({
            count: formattedData.length,
            body: formattedData
          })
        } catch (error) {
          console.log(error)
        }
      })
    } catch (error) {
      console.error(error)
      res.json({
        status: 500,
        message: 'There is an error',
        body: []
      })
    }
  })
}

touristicSitesController.searchRestaurant = async (req, res, next) => {
  const location = req.query.city
  const limit = LIMIT
  const option = {
    method: 'GET',
    url: 'https://tripadvisor1.p.rapidapi.com/locations/search',
    qs: {
      location_id: '1',
      limit: '1',
      sort: 'relevance',
      offset: '0',
      lang: 'es_MX',
      currency: 'USD',
      units: 'km',
      query: location
    },
    headers: {
      'x-rapidapi-host': config.tripAdvisorHost,
      'x-rapidapi-key': config.tripAdvisorKey
    }
  }
  request(option, function (error, response, body) {
    try {
      const data = JSON.parse(body)
      const locationId = data.data[0].result_object.location_id
      const locationRestaurants = {
        method: 'GET',
        url: 'https://tripadvisor1.p.rapidapi.com/restaurants/list',
        qs: {
          restaurant_tagcategory_standalone: '',
          lunit: 'km',
          restaurant_tagcategory: '',
          limit: limit,
          currency: 'USD',
          lang: 'es_ES',
          location_id: locationId
        },
        headers: {
          'x-rapidapi-host': config.tripAdvisorHost,
          'x-rapidapi-key': config.tripAdvisorKey
        }
      }
      request(locationRestaurants, function (error, response, body) {
        try {
          var dataRestaurants = JSON.parse(body)
          const formattedData = formatDataTripAdvisor(dataRestaurants.data, ['Restaurante'])
          res.json({
            count: formattedData.length,
            body: formattedData
          })
        } catch (error) {
          console.error(error)
        }
      })
    } catch (error) {
      console.error(error)
      res.json({
        status: 500,
        message: 'There is an error',
        body: []
      })
    }
  })
}

touristicSitesController.recommendations = async (req, res) => {
  const {city, budget, categories} = req.query;

  const sites = await TouristicSites.find({
    categories: { $in: categories},
    $or: [{ city: { $regex: city, $options: 'i'}}]
  })

  let results = sites.map((site) => {
    let weight = 25;

    weight += Math.floor(site.rating) * 5

    const priceDiff = Math.abs(budget - Number(site.average_price));

    if(priceDiff <= budget) {
      weight += 25;
    } else if (priceDiff < budget*0.10) {
      weight += 20;
    } else if (priceDiff < budget*0.20) {
      weight += 15;
    } else if (priceDiff < budget*0.30) {
      weight += 10;
    } else if (priceDiff < budget*0.40) {
      weight += 5;
    } else {
      weight += 0;
    }

    const intersection = site.categories.filter(x => categories.includes(x));
    const singleValue = categories.length ? 25/categories.length : 0;
    weight += singleValue * intersection.length;
    weight = Number(weight.toFixed(2))

    return {...site._doc, weight};
  })

  results = results.sort((r1, r2) => r2.weight - r1.weight).slice(0, 5)

  res.json({
    count: results.length,
    body: results
  })
}

module.exports = touristicSitesController
