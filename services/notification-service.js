const { Notification } = require("../models/NotificationModel");
var ObjectID = require("mongoose").Types.ObjectId;
const Utility = require("../helpers/Utility");

const createNotificationServices = (req) => {
  return new Promise(async (resolve, reject) => {
    const query = new Notification(req.body);
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

const getNotificationService = async (req) => {
  return new Promise(async (resolve, reject) => {
    var pagesize = req.body.pagesize ? parseInt(req.body.pagesize) : 25;
    var page = req.body.page ? parseInt(req.body.page) : 1;
    var query = {};
    if (req.body.search) {
      query = { $or: [{ name: { $regex: req.body.search } }] };
    }
    Notification.aggregate([
      {
        $project: {
          _id: 1,
          users: { $ifNull: ["$users", ""] },
          title: { $ifNull: ["$title", ""] },
          description: { $ifNull: ["$description", ""] },
          active: { $ifNull: ["$active", ""] },
          createdAt: { $ifNull: ["$createdAt", ""] },
          createdBy: { $ifNull: ["$createdBy", ""] },
          deletedBy: { $ifNull: ["$deletedBy", ""] },
          isDeleted: { $ifNull: ["$isDeleted", ""] },
        },
      },
      { $match: query },
      { $sort: req.body.sort_by },
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

const getCustomerNotificationService = async (req) => {
  return new Promise(async (resolve, reject) => {
    var userid = req.body.userid ? req.body.userid : req.user._id;
    var { pagesize, page, sortBy } = await Utility.convertReqtoPaginate(req.query)
    if (req.query.search) {
      query = { $or: [{ name: RegExp(req.query.search, "i") }] };
    }
    // var salonid = req.body.salonid ? req.body.salonid : req.user._id;
    Notification.aggregate([
      { $match: { "users.userid": ObjectID(userid) } },
      {
        $project: {
          _id: 1,
          users: { $ifNull: ["$users", ""] },
          title: { $ifNull: ["$title", ""] },
          description: { $ifNull: ["$description", ""] },
          active: { $ifNull: ["$active", ""] },
          createdAt: { $ifNull: ["$createdAt", ""] },
          createdBy: { $ifNull: ["$createdBy", ""] },
          deletedBy: { $ifNull: ["$deletedBy", ""] },
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
    // Notification.aggregate([
    //   { $match: { "users.userid": ObjectID(userid) } },
    //   // {$limit: 1},
    //   {
    //     $project: {
    //       _id: 1,
    //       users: { $ifNull: ["$users", ""] },
    //       title: { $ifNull: ["$title", ""] },
    //       description: { $ifNull: ["$description", ""] },
    //       active: { $ifNull: ["$active", ""] },
    //       createdAt: { $ifNull: ["$createdAt", ""] },
    //       createdBy: { $ifNull: ["$createdBy", ""] },
    //       deletedBy: { $ifNull: ["$deletedBy", ""] },
    //       isDeleted: { $ifNull: ["$isDeleted", ""] },
    //     },
    //   },
    // ]).exec(async (err, results) => {
    //   if (err) reject({ message: err });
    //   if (!results)
    //     reject({
    //       message: "User notification Not Found",
    //     });
    //   resolve(results);
    // });
  });
};

// const createNotificationServices = (req) => {
//   return new Promise(async (resolve, reject) => {
//     Country.findOneAndUpdate(
//       { _id: ObjectID(req.body.countryid) },
//       {
//         $push: { states: { name: req.body.name, location: req.body.location } },
//       },
//       { new: true, useFindAndModify: false }
//     )
//       .then(async (country) => {
//         console.log(country);
//         if (!country) reject({ message: "COUNTRY_NOT_FOUND" });
//         resolve(country);
//       })
//       .catch((err) => {
//         console.log(err);
//         reject({ message: err });
//       });
//   });
// };

module.exports = {
  createNotificationServices,
  getNotificationService,
  getCustomerNotificationService,
};
