const express = require('express')
const router = express.Router()
const activities = require('./controller')

router.get('/activity', activities.getActivities)
router.get('/activity/:_id', activities.getOneActivity)
router.post('/activity', activities.postActivity)
router.patch('/activity/:_id', activities.updateActivity)
router.delete('/activity/:_id', activities.deleteActivity)

module.exports = router