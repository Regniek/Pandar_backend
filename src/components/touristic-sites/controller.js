const touristicSites = require('./model')
const touristicSitesController = {}

touristicSitesController.getSites = async (req, res, next) => {
  try {
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
      type_location: req.body.type_location,
      country: req.body.country,
      city: req.body.city,
      latitude: req.body.latitude,
      length: req.body.length,
      address: req.body.address,
      phone: req.body.phone,
      average_price: req.body.average_price,
      web: req.body.web,
      description: req.body.description,
      category: req.body.category,
      activities: req.body.activities,
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
      type_location: req.body.type_location,
      country: req.body.country,
      city: req.body.city,
      latitude: req.body.latitude,
      length: req.body.length,
      address: req.body.address,
      phone: req.body.phone,
      average_price: req.body.average_price,
      web: req.body.web,
      description: req.body.description,
      category: req.body.category,
      activities: req.body.activities,
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

module.exports = touristicSitesController
