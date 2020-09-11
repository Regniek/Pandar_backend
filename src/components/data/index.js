const fs = require('fs')
const path = require('path');
const TouristicSites = require('../touristic-sites/model')
const ObjectsToCsv = require('objects-to-csv');

const dataController = {}

const public = path.join(__dirname, '../../public/data.json')

 dataController.getData = async (req, res, next) => {
  try {
    fs.readFile(public, 'utf8', (err, files) => { 
      if (err) 
        console.log(err); 
      else {    
        res.send(files)
      } 
    }) 
  } catch (error) {
    console.error(error)
  }
}

dataController.addData = async (req, res) => {
  try {
    fs.unlinkSync(public)
    console.log('Eliminado');
    const sites = await TouristicSites.find()
    console.log('Data consultada');

    // sites.map((sites) => {
    //   return {
    //     _id: sites._id,
    //     categories: sites.categories,
    //     country: sites.country,
    //     city: sites.city,
    //     location_name: sites.location_name
    //   }
    // }


    console.log(sites)
    fs.appendFile(public, sites, function(error){
      if(error) console.log(error)
      console.log('Archivo creado')
     })
     

    //  const csv = new ObjectsToCsv(sitesjson);
    //  await csv.toDisk(public);
    //  console.log('Data Update')

  } catch (error) {
    console.log(error)
  }
}

module.exports = dataController




