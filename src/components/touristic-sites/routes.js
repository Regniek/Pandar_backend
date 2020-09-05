const express = require('express')
const router = express.Router()
const touristicSites = require('./controller')
const passport = require('passport')
require('../../lib/passport')

router.get('/touristic-site', touristicSites.getSites)
router.get('/touristic-site/:id', touristicSites.getOneSite)
router.post('/touristic-site', passport.authenticate('jwt', { session: false }), touristicSites.postSite)
router.patch('/touristic-site/:id', passport.authenticate('jwt', { session: false }), touristicSites.updateSite)
router.delete('/touristic-site/:id', passport.authenticate('jwt', { session: false }), touristicSites.deleteSite)
router.get('/search-site', touristicSites.searchByCategories)

module.exports = router
