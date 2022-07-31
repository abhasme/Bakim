const { Country } = require('../models/CountryModel');
const { City } = require('../models/CityModel');
const { State } = require('../models/StateModel');

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
  return new Promise(async (resolve, reject) => {
    Country.findOneAndUpdate({ _id: ObjectID(req.body.countryid) },
      { $push: { states: { name: req.body.name, location: req.body.location } } },
      { new: true, useFindAndModify: false }
    )
      .then(async (country) => {
        console.log(country)
        if (!country) reject({ message: "COUNTRY_NOT_FOUND" });
        resolve(country);
      })
      .catch((err) => {
        reject({ message: err })
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

const countryListService = async (req) => {
  return new Promise(async (resolve, reject) => {
    Country.aggregate([
      {
        $project: {
          _id: 1,
          name: { $ifNull: ["$name", ""] },
          domain: "http://97.74.83.126:15357",
          flag: { $concat: ["uploads/flags/", { $toLower: "$flag" }, ".png"] },
          numericCode: { $ifNull: ["$phone_code", ""] },
          location: { $ifNull: ["$location", []] },
          active: { $ifNull: ["$active", false] },
        }
      },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err });
      if (!results)
        reject({
          message: "Country Not Found",
        });
      resolve(results);
    })
  });
}

const stateListService = async (req) => {
  return new Promise(async (resolve, reject) => {
    var countryname = req.body.country ? req.body.country : req.query.country
    var country = await Country.getCountryIdByName(countryname);
    State.aggregate([
      { $match: { countryid: ObjectID(country) }, },
      {
        $lookup: {
          from: "countries",
          localField: "countryid",
          foreignField: "_id",
          as: "countryInfo",
        },
      },
      { $unwind: "$countryInfo" },
      {
        $project: {
          _id: 1,
          name: { $ifNull: ["$name", ""] },
          location: { $ifNull: ["$location", []] },
          countryid: { $ifNull: ["$countryid", ""] },
          countryName: { $ifNull: ["$countryInfo.name", ""] },
        }
      },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err });
      if (!results)
        reject({
          message: "state Not Found",
        });
      resolve(results);
    })
  });
}
const cityListService = async (req) => {
  return new Promise(async (resolve, reject) => {
    var statename = req.body.state ? req.body.state : req.query.state
    var stateid = await State.getStateIdByName(statename);
    City.aggregate([
      { $match: { stateid: ObjectID(stateid) }, },
      {
        $lookup: {
          from: "states",
          localField: "stateid",
          foreignField: "_id",
          as: "statesinfo",
        },
      },
      { $unwind: "$statesinfo" },
      {
        $lookup: {
          from: "countries",
          localField: "countryid",
          foreignField: "_id",
          as: "countryInfo",
        },
      },
      { $unwind: "$countryInfo" },
      {
        $project: {
          _id: 1,
          name: { $ifNull: ["$name", ""] },
          location: { $ifNull: ["$location", []] },
          stateid: { $ifNull: ["$stateid", ""] },
          stateName: { $ifNull: ["$statesinfo.name", ""] },
          countryid: { $ifNull: ["$countryid", ""] },
          countryName: { $ifNull: ["$countryInfo.name", ""] },
        }
      },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err });
      if (!results)
        reject({
          message: "City Not Found",
        });
      resolve(results);
    })
  });
}
/*========= Country Update ==============*/ // findOneAndUpdate
const updateCountryServices = async (req) => {
  return new Promise(async (resolve, reject) => {
    Country.updateMany(
      { _id: req.body.country_id },
      { $set: { active: req.body.active } },
      { new: true, useFindAndModify: false }
    )
      .then((country) => {
        if (!country) reject({ message: "COUNTRY_NOT_FOUND" });
        resolve(country);
      })
      .catch((err) => reject({ message: "COUNTRY_NOT_FOUND" }));
  });
};

/*========= State Update ==============*/
const updateStateServices = async (req) => {
  return new Promise(async (resolve, reject) => {
    var countryid = req.body.countryid;
    var stateid = req.body.stateid;
    await Country.findOneAndUpdate(
      { _id: countryid, "states._id": stateid },
      {
        $set: {
          "states.$.name": req.body.name,
          "states.$.location": req.body.location,
        },
      },
      { new: true, useFindAndModify: false }
    ).then((state) => {
      resolve(state);
    });
  });
};

/*========= City Update ==============*/
const updateCityServices = async (req) => {
  return new Promise(async (resolve, reject) => {
    City.findOneAndUpdate(
      { _id: req.body.cityid },
      { $set: req.body },
      { new: true, useFindAndModify: false }
    )
      .then((city) => {
        if (!city) reject({ message: "CITY_NOT_FOUND" });
        resolve(city);
      })
      .catch((err) => reject({ message: "CITY_NOT_FOUND" }));
  });
};
module.exports = {
  createCountryServices,
  createStateServices,
  createCityServices,
  countryListService,
  stateListService,
  cityListService,
  updateCountryServices,
  updateStateServices,
  updateCityServices,
};