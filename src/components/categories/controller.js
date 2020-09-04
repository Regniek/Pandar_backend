const Categories = require('./models')
const categoriesController = {}

categoriesController.getCategories = async (req, res, next) => {
  try {
    const categories = await Categories.find().populate(
      'parent_categorie',
      'categorie_name'
    )
    res.json({
      status: 200,
      data: categories,
    })
  } catch (error) {
    next(error)
  }
}

categoriesController.getOneCategory = async (req, res, next) => {
  try {
    const categorie = await Categories.findById(req.params.id).populate(
      'parent_categorie',
      'categorie_name'
    )
    res.json({
      status: 200,
      data: categorie,
    })
  } catch (error) {
    next(error)
  }
}

categoriesController.postCategorie = async (req, res, next) => {
  try {
    const categorie = new Categories({
      categorie_name: req.body.categorie_name,
      parent_categorie: req.body.parent_categorie,
      description: req.body.description,
    })
    await categorie.save()
    res.json({
      status: 201,
      data: categorie,
    })
  } catch (error) {
    next(error)
  }
}

categoriesController.deleteCategorie = async (req, res, next) => {
  try {
    const categorie = await Categories.findByIdAndDelete(req.params.id)
    res.json({
      status: 200,
      message: `Categorie ${req.params.id} deleted`,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = categoriesController
