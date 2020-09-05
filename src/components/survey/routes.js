const express = require('express')
const router = express.Router()
const survey = require('./controller')
const passport = require('passport')
require('../../lib/passport')

router.get('/survey', survey.getSurvey)
router.get('/survey/:id', survey.getOneSurvey)
router.post('/survey', passport.authenticate('jwt', { session: false }), survey.postSurvey)
router.patch('/survey/:id', passport.authenticate('jwt', { session: false }), survey.updateSurvey)
router.delete('/survey/:id', passport.authenticate('jwt', { session: false }), survey.deleteSurvey)

module.exports = router
