const { Country } = require('../../models/CountryModel');
const { City } = require('../../models/CityModel');
var ObjectID = require('mongoose').Types.ObjectId

const createCountryServices = (req) => {
  return new Promise(async (resolve, reject) => {
    const query = new Country(req.body)
    query.save().then((result) => {
      resolve(result)
    }).catch((err) => {
      reject(err)
    });
  })
}

const createStateServices = (req) => {
  return new Promise( async(resolve, reject) => {
      Country.findOneAndUpdate({ _id: ObjectID(req.body.countryid) },
        {$push : { states : { name : req.body.name , location : req.body.location}} },
        { new: true, useFindAndModify: false }
      )
      .then(async(country) => {
          if (!country) reject({ message: "COUNTRY_NOT_FOUND"});
          resolve(country);
        })
      .catch((err) => {
        reject({ message:err})
      });
  });
}
const createCityServices = (req) => {
  return new Promise(async (resolve, reject) => {
    const query = new City(req.body)
    query.save().then((result) => {
      resolve(result)
    }).catch((err) => {
      reject(err)
    });
  })
}
  module.exports = {
    createCountryServices,
    createStateServices,
    createCityServices,
  };