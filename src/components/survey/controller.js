const Survey = require('./model')
const surveyController = {}
const Users = require('../users/model')
const { populate } = require('../users/model')


surveyController.getSurvey = async (req, res, next) => {
    try {
      const surveys = await Survey.find().populate('user')
      res.json({
        status: 200,
        body: surveys,
      })
    } catch (error) {
      next(error)
    }
}

surveyController.getOneSurvey = async (req, res, next) =>{
    try {
        const survey = await Survey.findById(req.params.id).populate('user')
        res.json({
            status: 200,
            body: survey
          })
    } catch (error) {
        next(error)
    }
}

surveyController.postSurvey = async (req, res, next) =>{
    try {
        const survey = new Survey({
            user: req.body.user,
            country: req.body.country,
            budget: req.body.budget,
            categories: req.body.categories,
        })
        await survey.save()
        res.json({
            status: 201,
            body: survey
          })
    } catch (error) {
        next(error)
    }
}

surveyController.updateSurvey = async (req, res, next) => {
  try {
    const survey = {
      user: req.body.user,
      country: req.body.country,
      budget: req.body.budget,
      categories: req.body.categories,
    }
    await Survey.findByIdAndUpdate(
      req.params.id,
      { $set: survey },
      { omitUndefined: true, upsert: true }
    )
    res.json({
      status: 200,
      message: 'Survey updated',
      body: survey,
    })
  } catch (error) {
    next(error)
  }
}

surveyController.deleteSurvey = async (req, res, next) => {
  try {
    const survey = await Survey.findByIdAndRemove(req.params.id)
    res.json({
      status: 200,
      message: `Survey ${req.params.id} deleted`,
    })
  } catch (error) {
    next(error)
  }
}


module.exports = surveyController
