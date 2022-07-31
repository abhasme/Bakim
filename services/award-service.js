const { Award } = require("../models/AwardModel");
const { Users } = require("../models/UserModel");
var ObjectID = require("mongoose").Types.ObjectId;
const Utility = require('../helpers/Utility')

const createAwardServices = (req) => {
  return new Promise(async (resolve, reject) => {
    req.body.image = req.file.path ? req.file.path : "";

    const query = new Award(req.body);
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

const updateAwardServices = (req) => {
  return new Promise(async (resolve, reject) => {
    await Award.findOne({ _id: req.body.awardid })
      .then(async (award) => {
        if (req.file && req.file.path) {
          await Utility.removeFileFromPath(award.image)
          award.image = req.file.path;
        }
        if (req.body.name) {
          award.name = req.body.name;
        }
        return award.save();
      })
      .then((award) => {
        resolve(award);
      });
  });
};

const getAwardService = async (req) => {
  return new Promise(async (resolve, reject) => {
    var { pagesize, page, sortBy } = await Utility.convertReqtoPaginate(req.query)
    var query = {};
    if (req.query.search) {
      query = { $or: [{ name: RegExp(req.query.search, "i") }] };
    }
    Award.aggregate([
      {
        $lookup:
        {
          from: "users",
          localField: "_id",
          foreignField: "salonDetail.awards.awardid",
          as: "userInfo"
        }
      },
      {
        $project: {
          _id: 1,
          name: { $ifNull: ["$name", ""] },
          image: { $ifNull: ["$image", ""] },
          active: { $ifNull: ["$active", ""] },
          createdAt: { $ifNull: ["$createdAt", ""] },
          createdBy: { $ifNull: ["$createdBy", ""] },
          noOfSalon: { $size: "$userInfo._id" }
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

const getAwardInfoService = async (req) => {
  return new Promise(async (resolve, reject) => {
    Award.aggregate([
      { $match: { _id: ObjectID(req.body.awardid) } },
      {
        $project: {
          _id: 1,
          name: { $ifNull: ["$name", ""] },
          image: { $ifNull: ["$image", ""] },
          active: { $ifNull: ["$active", ""] },
        },
      },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err });
      if (!results) reject({ message: "ERROR_DATA_RETRIVED" });
      resolve(results);
    });
  });
};

const deleteAwardServices = async (req) => {
  return new Promise(async (resolve, reject) => {
    await Users.updateMany(
      { "salonDetail.awards.awardid": ObjectID(req.body.awardid) },
      { $pull: { "salonDetail.awards": { awardid: ObjectID(req.body.awardid) } } },
    )
    await Award.findByIdAndDelete(
      { _id: req.body.awardid },
    )
      .then((results) => {
        if (!results) reject({ message: "AWARD_NOT_FOUND" });
        resolve(results);
      })
      .catch((err) => ({ message: "AWARD_NOT_FOUND" }));
    // reject({ message: "AMENITY_NOT_FOUND" })
  });
};

/*========== Update Salon Award ===================*/
const updateSalonAwardService = async (req) => {
  return new Promise(async (resolve, reject) => {
    await Users.findOne({ _id: req.body.salonid })
    var salonid = req.body.salonid;
    await Users.findOneAndUpdate(
      { _id: ObjectID(salonid) },
      {
        $set: {
          "salonDetail.awards": req.body.salonDetail.awards
        },
      },
      { new: true, useFindAndModify: false }
    )
      .then(async (salonaward) => {
        if (!salonaward) reject({ message: "USER_NOT_FOUND" });
        resolve(salonaward);
      })
      .catch((err) => {
        reject({ message: err });
      });
  });
};

/*========== Get All Salon Award List ===================*/
const getSalonAwardListService = async (req) => {
  return new Promise(async (resolve, reject) => {
    var { pagesize, page, sortBy } = await Utility.convertReqtoPaginate(req.query)
    var query = {};
    if (req.query.search) {
      query = { $or: [{ salonName: RegExp(req.query.search, "i") }] };
    }
    Users.aggregate([
      { $match: { userType: "Salon" } },
      { $match: { "salonDetail.awards": { $exists: true, $not: { $size: 0 } } } },
      {
        $lookup:
        {
          from: "awards",
          localField: "salonDetail.awards.awardid",
          foreignField: "_id",
          as: "awardInfo"
        }
      },
      {
        $project: {
          _id: 1,
          salonName: { $ifNull: ["$salonDetail.salonName", ""] },
          awardCount: { $size: "$salonDetail.awards" },
          awardImage: { $ifNull: ["$awardInfo.image", ""] },
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

const salonAwardInfoService = async (req) => {
  return new Promise(async (resolve, reject) => {
    var salonid = req.body.salonid;
    Users.aggregate([
      { $match: { _id: ObjectID(salonid) } },
      {
        $lookup:
        {
          from: "awards",
          localField: "salonDetail.awards.awardid",
          foreignField: "_id",
          as: "awardInfo"
        }
      },
      {
        $project: {
          _id: 1,
          salonName: { $ifNull: ["$salonDetail.salonName", ""] },
          awardImage: { $ifNull: ["$awardInfo.image", ""] },
        },
      },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err });
      if (!results) reject({ message: "ERROR_DATA_RETRIVED" });
      resolve(results);
    });
  });
};

const deleteSalonAwardServices = async (req) => {
  return new Promise(async (resolve, reject) => {
    await Users.findOneAndUpdate(
      { _id: ObjectID(req.body.salonid) },
      { $set: { "salonDetail.awards": [] } }
    )
      .then((results) => {
        if (!results) reject({ message: "SALON_NOT_FOUND" });
        resolve(results);
      })
      .catch((err) => ({ message: "SALON_NOT_FOUND" }));
  });
};

module.exports = {
  createAwardServices,
  getAwardService,
  updateAwardServices,
  deleteAwardServices,
  getSalonAwardListService,
  updateSalonAwardService,
  getAwardInfoService,
  salonAwardInfoService,
  deleteSalonAwardServices,
};
