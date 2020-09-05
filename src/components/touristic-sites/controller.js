const TouristicSites = require('./model')
const touristicSitesController = {}
const request = require('request')
const { config } = require('../../config/index')


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
  console.log(req.body)
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
    } else if (req.query.categories === 'Hotel' || req.query.categories === 'hotel') {
      city.replace(' ', '%20')
      touristicSitesController.searchHotel(req, res)
    } else if (req.query.categories === 'Restaurante' || req.query.categories === 'restaurante') {
      city.replace(' ', '%20')
      touristicSitesController.searchRestaurant(req, res)
    } else {
      city.replace(/[á,a,e,é,i,í,o,ó,ö,u,ú,ü]/g, '[-\'0-9a-zÀ-ÿ]')
      const sites = await TouristicSites.find({
        categories: { $regex: req.query.categories, $options: 'i' },
        $or: [{ city: { $regex: city, $options: 'i' } }]
      })
      res.json({
        count: sites.length,
        body: sites
      })
    }
  } catch (error) {
    next(error)
    console.log(error)
  }
}

touristicSitesController.searchHotel = async (req, res, next) => {
  const location = req.query.city
  const limit = 5
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
    if (error) throw new Error(error)
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
        lang: 'es_CO',
        sort: 'recommended',
        checkin: date,
        adults: '1',
        rooms: '1',
        nights: '1'
      },
      headers: {
        'x-rapidapi-host': config.tripAdvisorHost,
        'x-rapidapi-key': config.tripAdvisorKey,

      }
    }

    request(locationHotel, function (error, response, body) {
      if (error) throw new Error(error)
      const dataHotel = JSON.parse(body)

      res.json({
        locationId: locationId,
        dataHotel: dataHotel
      })
    })
  })
}

touristicSitesController.searchRestaurant = async (req, res, next) => {
  const location = req.query.city
  const limit = 3
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
    if (error) throw new Error(error)
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
        lang: 'es_CO',
        location_id: locationId
      },
      headers: {
        'x-rapidapi-host': config.tripAdvisorHost,
        'x-rapidapi-key': config.tripAdvisorKey

      }
    }
    request(locationRestaurants, function (error, response, body) {
      if (error) throw new Error(error)
      var dataRestaurants = JSON.parse(body)

      res.json({
        locationId: locationId,
        dataRestaurants: dataRestaurants
      })
    })
  })
}

module.exports = touristicSitesController
