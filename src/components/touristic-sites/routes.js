const express = require('express')
const router = express.Router()
const touristicSites = require('./controller')

router.get('/touristic-site', touristicSites.getSites)
router.get('/touristic-site/:id', touristicSites.getOneSite)
router.post('/touristic-site', touristicSites.postSite)
router.patch('/touristic-site/:id', touristicSites.updateSite)
router.delete('/touristic-site/:id', touristicSites.deleteSite)

module.exports = router
