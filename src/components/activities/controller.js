const Activities = require('./model')
const activitiesController = {}

activitiesController.getActivities = async (req, res, next) => {
  try {
    const activities = await Activities.find()
    res.json({
      status: 200,
      message: 'Activities listed',
      activities: activities
    })
  } catch (error) {
    next(error)
  }
}

activitiesController.getOneActivity = async (req, res, next) => {
  try {
    const activity = await Activities.findById(req.params.id)
    res.json({
      status: 200,
      message: 'Activity listed',
      activities: activity
    })
  } catch (error) {
    next(error)
  }
}


activitiesController.postActivity = async (req, res, next) => {
  try {
    const activity = new Activities({
      activity_name: req.body.activity_name,
      price: req.body.price,
      description: req.body.description,
      _id_turistic_site: req.body._id_turistic_site
    });
    await activity.save();
    res.json({
      status: 201,
      message: 'Activity created',
      activities: activity
    })

  } catch (error) {
    next(error)
  }
}

activitiesController.updateActivity = async (req, res, next) => {
  try {
    const activity = {
      activity_name: req.body.activity_name,
      price: req.body.price,
      description: req.body.description,
      _id_turistic_site: req.body.id_turistic_site
    }
    await Activities.findByIdAndUpdate(req.params.id, { $set: activity }, { omitUndefined: true, new: true })
    res.json({
      status: 200,
      message: 'Activity updated',
      body: activity
    })
  } catch (error) {
    next(error)
  }
}

activitiesController.deleteActivity = async (req, res, next) => {
  try {
    const activity = await Activities.findByIdAndDelete(req.params.id)
    res.json({
      status: 200,
      message: `Activity ${req.params.id} deleted`
    })
  } catch (error) {
    next(error)
  }
}


module.exports = activitiesController