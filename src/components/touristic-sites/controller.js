const touristicSites = require('./model')
const touristicSitesController = {}
const request = require('request')

touristicSitesController.getSites = async (req, res, next) => {
  try {
    console.log('ok')
    const sites = await touristicSites.find()
    res.json({
      status: 200,
      message: 'Touristic sites listed',
      body: sites,
    })
  } catch (error) {
    next(error)
  }
}

touristicSitesController.getOneSite = async (req, res, next) => {
  try {
    const site = await touristicSites.findById(req.params.id)
    res.json({
      status: 200,
      message: 'Touristic site listed',
      body: site,
    })
  } catch (error) {
    next(error)
  }
}

touristicSitesController.postSite = async (req, res, next) => {
  console.log(req.body)
  try {
    const site = new touristicSites({
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
      body: site,
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
    await touristicSites.findByIdAndUpdate(
      req.params.id,
      { $set: site },
      { omitUndefined: true, upsert: true }
    )
    res.json({
      status: 200,
      message: 'Touristic site updated',
      body: site,
    })
  } catch (error) {
    next(error)
  }
}

touristicSitesController.deleteSite = async (req, res, next) => {
  try {
    const sites = await touristicSites.findByIdAndRemove(req.params.id)
    res.json({
      status: 200,
      message: `Touristic site ${req.params.id} deleted`,
    })
  } catch (error) {
    next(error)
  }
}

touristicSitesController.searchByCategories = async (req, res, next) => {
  try {
    if (req.query.categories === null || !req.query.categories){
      req.query.city = req.query.city.replace(/[á,a,e,é,i,í,o,ó,ö,u,ú,ü]/g, '[-\'0-9a-zÀ-ÿ]')
      const sites = await touristicSites.find({
      city: { $regex : req.query.city , $options : 'i'}
      })
      res.json({
        count: sites.length,
        body: sites,
      })
    }else if (req.query.categories === 'Hotel'){
      touristicSitesController.searchHotel(req, res)
    }else if (req.query.categories === 'Restaurante') {
      touristicSitesController.searchRestaurant(req, res)
    }else{
      req.query.city = req.query.city.replace(/[á,a,e,é,i,í,o,ó,ö,u,ú,ü]/g, '[-\'0-9a-zÀ-ÿ]')
      const sites = await touristicSites.find({
        categories: { $regex : req.query.categories, $options : 'i'    },
        $or: [{ city: { $regex : req.query.city, $options : 'i'  }}],
      })
      res.json({
        count: sites.length,
        body: sites,
      })
    }
  } catch (error) {
    next(error)
    console.log(error)
  }
}


touristicSitesController.searchHotel = async (req, res, next) => {
  let location = req.query.city
  let limit = 5
  let option = {
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

    let today = new Date()
        day = today.getDate() + 2
        month = today.getMonth() + 1 // +1 porque los meses empiezan en 0
        year = today.getFullYear()
        let date = `${year}-${month}-${day}`

    let locationHotel = {
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
        const dataHotel = JSON.parse(body)
        
        res.json({
          locationId: locationId,
          dataHotel: dataHotel
        })
    })
  })
}


touristicSitesController.searchRestaurant = async (req, res, next) => {
  let location = req.query.city
  let limit = 3
  let option = {
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
      
      res.json({
        locationId: locationId,
        dataRestaurants: dataRestaurants
      })
    })
  })
}



module.exports = touristicSitesController
