const { Amenity } = require("../models/AmenityModel");
const { Users } = require("../models/UserModel");
var ObjectID = require("mongoose").Types.ObjectId;
const Utility = require("../helpers/Utility")

const createAminityServices = (req) => {
  return new Promise(async (resolve, reject) => {
    const query = new Amenity(req.body);
    query
      .save()
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const updateAminityServices = async req => {
  return new Promise(async (resolve, reject) => {
    Amenity.findOneAndUpdate(
      { _id: req.body.amenityid },
      { name: req.body.name },
      { new: true, useFindAndModify: false }
    )
      .then(amenity => {
        if (!amenity) reject({ message: "AMENITY_NOT_FOUND" })
        resolve(amenity)
      })
      .catch(err => reject({ message: "AMENITY_NOT_FOUND" }))
  })
}

const getAminityService = async (req) => {
  return new Promise(async (resolve, reject) => {
    var { pagesize, page, sortBy } = await Utility.convertReqtoPaginate(req.query)
    var query = {};
    if (req.query.search) {
      query = { $or: [{ name: RegExp(req.query.search, "i") }] };
    }
    Amenity.aggregate([
      { $match: { isDeleted: false } },
      {
        $project: {
          _id: 1,
          name: { $ifNull: ["$name", ""] },
          active: { $ifNull: ["$active", ""] },
          createdAt: { $ifNull: ["$createdAt", ""] },
          createdBy: { $ifNull: ["$createdBy", ""] },
        },
      },
      { $match: query },
      { $sort: sortBy },
      {
        $facet: {
          docs: [{ $skip: (page - 1) * pagesize }, { $limit: pagesize }],
          totalDocs: [{ $count: "count" }],
        },
      },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err });
      if (!results) reject({ message: "ERROR_DATA_RETRIVED" });
      resolve(results);
    });
  });
};

const deleteAmenityServices = async (req) => {
  return new Promise(async (resolve, reject) => {
    await Users.updateMany(
      { "salonDetail.amenities.amenityid": ObjectID(req.body.amenityid) },
      { $pull: { "salonDetail.amenities": { amenityid: ObjectID(req.body.amenityid) } } },
    )
    await Amenity.findByIdAndDelete(
      { _id: req.body.amenityid },
    )
      .then((results) => {
        if (!results) reject({ message: "AMENITY_NOT_FOUND" });
        resolve(results);
      })
      .catch((err) => ({ message: "AMENITY_NOT_FOUND" }));
    // reject({ message: "AMENITY_NOT_FOUND" })
  });
};

const getAminityInfoService = async (req) => {
  return new Promise(async (resolve, reject) => {
    Amenity.aggregate([
      { $match: { _id: ObjectID(req.body.amenityid) } },
      {
        $project: {
          _id: 1,
          name: { $ifNull: ["$name", ""] },
          active: { $ifNull: ["$active", ""] },
          createdAt: { $ifNull: ["$createdAt", ""] },
          createdBy: { $ifNull: ["$createdBy", ""] },
        },
      },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err });
      if (!results) reject({ message: "ERROR_DATA_RETRIVED" });
      resolve(results);
    });
  });
};

module.exports = {
  getAminityService,
  updateAminityServices,
  createAminityServices,
  deleteAmenityServices,
  getAminityInfoService,
};
