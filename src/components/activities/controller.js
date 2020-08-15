const mongoose = require('mongoose')
const Activities = require('./model')
const activitiesController = {}

activitiesController.getActivities = async (req, res) => {
  try {
    const activities = await Activities.find()
    res.json(activities)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

activitiesController.getOneActivity = async (req, res) => {
  try {
    const activities = await Activities.findById(req.params._id)
    res.json(activities)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}


activitiesController.postActivity = async (req, res) => {
  try {
    const activity = new Activities({
      activity_name: req.body.activity_name,
      price: req.body.price,
      description: req.body.description,
      id_turistic_site: req.body.id_turistic_site,
      city: req.body.city,

    });
    await activity.save();
    res.json({
      status: 201,
      body: activity

    });

  } catch (error) {
    res.json({
      error: error.message
    })
  }
}

activitiesController.updateActivity = async (req, res) => {
  try {
    const activity = {
      activity_name: req.body.activity_name,
      price: req.body.price,
      description: req.body.description,
      id_turistic_site: req.body.id_turistic_site,
      city: req.body.city,
    }
    await Activities.findByIdAndUpdate(req.params._id, {
      $set: activity
    },
      {
        new: true
      }
    );
    res.json({
      status: 200,
      body: activity
    })
  } catch (error) {
    console.log(error)
  }
}

activitiesController.deleteActivity = async (req, res) => {
  try {
    const activity = await Activities.findByIdAndDelete(req.params._id)
    res.json({
      status: 200,
      body: `Actividad con id ${req.params._id} Eliminado`
    })
  } catch (error) {
    console.log(error)
  }
}


module.exports = activitiesController