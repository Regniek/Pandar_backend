const touristicSites = require('./model')
const touristicSitesController = {}

touristicSitesController.getSites = async (req, res, next) => {
    try {
        const sites = await touristicSites.find()
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
        const site = await touristicSites.findById(req.params.id)
        res.json({
            status: 200,
            message: 'Touristic site listed',
            body: site
        })
    } catch (error) {
        next(error)
    }
}

touristicSitesController.postSite = async (req, res, next) =>{
    try {
        const site = new touristicSites ({
            site_name: req.body.site_name,
            location: req.body.location,
            phone: req.body.phone,
            address: req.body.address,
            country: req.body.country,
            city: req.body.city,
            average_price: req.body.average_price,
            category: req.body.category,
            rate: req.body.category,
            description: req.body.description,
            type: req.body.type,
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

touristicSitesController.updateSite = async (req, res, next) =>{
    try {
        const site = {
            site_name: req.body.site_name,
            location: req.body.location,
            phone: req.body.phone,
            address: req.body.address,
            country: req.body.country,
            city: req.body.city,
            average_price: req.body.average_price,
            category: req.body.category,
            rate: req.body.category,
            description: req.body.description,
            type: req.body.type,
        }
        await touristicSites.findByIdAndUpdate(req.params.id, { $set: site }, { omitUndefined: true, upsert: true })
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
        const sites = await touristicSites.findById(req.params.id)
        res.json({
            status: 200,
            message: `Touristic site ${req.params.id} deleted`
        })
    } catch (error) {
        next(error)
    }
}

module.exports = touristicSitesController