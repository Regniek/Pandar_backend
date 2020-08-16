const express = require('express')
const router = express.Router()
const activities = require('./controller')

router.get('/activity', activities.getActivities)
router.get('/activity/:id', activities.getOneActivity)
router.post('/activity', activities.postActivity)
router.patch('/activity/:id', activities.updateActivity)
router.delete('/activity/:id', activities.deleteActivity)

module.exports = router