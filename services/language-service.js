const { Language } = require("../models/LanguageModel");
const { Users } = require("../models/UserModel");
var ObjectID = require("mongoose").Types.ObjectId;
const Utility = require("../helpers/Utility")

const addLanguageServices = (req) => {
  return new Promise(async (resolve, reject) => {
    const query = new Language(req.body);
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

const updateLanguageServices = async (req) => {
  return new Promise(async (resolve, reject) => {
    var languageid = req.body.languageid;
    Language.findOneAndUpdate(
      { _id: ObjectID(languageid) },
      { name: req.body.name },
      { new: true, useFindAndModify: false }
    )
      .then((language) => {
        if (!language) reject({ message: "LANGUAGE_NOT_FOUND" });
        resolve(language);
      })
      .catch((err) => reject({ message: "LANGUAGE_NOT_FOUND" }));
  });
};

const getLanguageService = async (req) => {
  return new Promise(async (resolve, reject) => {
    var { pagesize, page, sortBy } = await Utility.convertReqtoPaginate(req.query)
    var query = {};
    if (req.query.search) {
      query = { $or: [{ name: RegExp(req.query.search, "i") }] };
    }
    Language.aggregate([
      { $match: { isDeleted: false } },
      {
        $project: {
          _id: 1,
          name: { $ifNull: ["$name", ""] },
          active: { $ifNull: ["$active", ""] },
          createdAt: { $ifNull: ["$createdAt", ""] },
          isDeleted: { $ifNull: ["$isDeleted", ""] },
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

const deleteLanguageServices = async (req) => {
  return new Promise(async (resolve, reject) => {
    var languageid = req.body.languageid;
    await Users.updateMany(
      { "salonDetail.prefferedLanguage.languageid": ObjectID(languageid) },
      { $pull: { "salonDetail.prefferedLanguage": { languageid: ObjectID(languageid) } } },
    )
    await Language.findByIdAndDelete(
      { _id: req.body.languageid },
    )
      .then((language) => {
        if (!language) reject({ message: "LANGUAGE_NOT_FOUND" });
        resolve(language);
      })
      .catch((err) => reject({ message: "LANGUAGE_NOT_FOUND" }));
  });
};

const getSalonLanguageService = async (req) => {
  return new Promise(async (resolve, reject) => {
    req.body.salonid = req.body.salonid ? req.body.salonid : req.user._id;
    var salonservices = await Users.SalonLanguageServiceIDSArray(
      req.body.salonid
    );
    Language.aggregate([
      {
        $project: {
          _id: 1,
          name: { $ifNull: ["$name", ""] },
          has_service: {
            $in: ["$_id", salonservices],
          },
        },
      },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err });
      if (!results) reject({ message: "ERROR_DATA_RETRIVED" });
      resolve(results);
    });
  });
};

const updateSalonLanguageServices = async (req) => {
  return new Promise(async (resolve, reject) => {
    var salonid = req.body.salonid ? req.body.salonid : req.user._id;
    Users.findOneAndUpdate(
      { _id: ObjectID(salonid) },
      {
        $set: {
          "salonDetail.prefferedLanguage": req.body.languages,
        },
      },
      { new: true, useFindAndModify: false }
    )
      .then((language) => {
        if (!language) reject({ message: "LANGUAGE_NOT_FOUND" });
        resolve(language);
      })
      .catch((err) => reject({ message: "LANGUAGE_NOT_FOUND" }));
  });
};

const getLanguageInfoService = async (req) => {
  return new Promise(async (resolve, reject) => {
    Language.aggregate([
      { $match: { _id: ObjectID(req.body.languageid) } },
      {
        $project: {
          _id: 1,
          name: { $ifNull: ["$name", ""] },
          active: { $ifNull: ["$active", ""] },
          createdAt: { $ifNull: ["$createdAt", ""] },
          isDeleted: { $ifNull: ["$isDeleted", ""] },
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
  addLanguageServices,
  getLanguageService,
  updateLanguageServices,
  deleteLanguageServices,
  getSalonLanguageService,
  updateSalonLanguageServices,
  getLanguageInfoService,
};
