const express = require('express')
const router = express.Router()
const categories = require('./controller')

router.get('/categories', categories.getCategories)
router.get('/categories/:id', categories.getOneCategory)
router.post('/categories', categories.postCategorie)
router.delete('/categories/:id', categories.deleteCategorie)

module.exports = router
