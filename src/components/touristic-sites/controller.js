const touristicSites = require('./model')
const touristicSitesController = {}

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
    const sites = await touristicSites.findById(req.params.id)
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
      const sites = await touristicSites.find({
      city: { $regex : req.query.city },
      })
      res.json({
        count: sites.length,
        body: sites,
      })
    }else{
      const sites = await touristicSites.find({
        categories: { $regex : req.query.categories },
        $or: [{ city: { $regex : req.query.city }}],
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

module.exports = touristicSitesController
