const { Users } = require("../models/UserModel")
var ObjectID = require("mongoose").Types.ObjectId
const Utility = require("../helpers/Utility")
const { query } = require("express")

const addPortfolioServices = async req => {
  return new Promise(async (resolve, reject) => {
    var userid = req.body.userid
    req.body.image = req.file.path ? req.file.path : ""
    Users.findOneAndUpdate(
      { _id: ObjectID(userid) },
      {
        $push: {
          portfolio: {
            image: req.body.image,
            description: req.body.description,
            serviceid: req.body.serviceid,
          },
        },
      },
      { new: true, useFindAndModify: false }
    )
      .then(async portfolio => {
        if (!portfolio) reject({ message: "SERVICE_NOT_FOUND" })
        resolve(portfolio)
      })
      .catch(err => {
        reject({ message: err })
      })
  })
}

const updatePortfolioService = async req => {
  return new Promise(async (resolve, reject) => {
    var userid = req.body.userid
    var workid = req.body.workid
    if (req.file && req.file.path) {
      var reqimage = req.file.path
    }
    if (req.body.serviceid) {
      req.body.serviceid
    }
    if (req.body.description) {
      req.body.description
    }
    await Users.findOneAndUpdate(
      { _id: userid, "portfolio._id": workid },
      {
        "portfolio.$.description": req.body.description,
        "portfolio.$.image": reqimage,
        "portfolio.$.serviceid": req.body.serviceid,
      },
      { new: true, useFindAndModify: false }
    ).then(user => {
      resolve(user)
    })
  })
}

const getPortfolioService = async req => {
  return new Promise(async (resolve, reject) => {
    var userid = req.body.userid ? req.body.userid : req.user._id
    var query
    if (req.body.userid) {
      query = { _id: ObjectID(userid) }
    } else {
      query = {}
    }
    Users.aggregate([
      { $match: query },
      { $unwind: "$portfolio" },
      {
        $lookup: {
          from: "services",
          localField: "portfolio.serviceid",
          foreignField: "_id",
          as: "serviceInfo",
        },
      },
      { $unwind: "$serviceInfo" },
      {
        $lookup: {
          from: "users",
          localField: "portfolio.employeeid",
          foreignField: "_id",
          as: "employeeInfo",
        },
      },
      { $unwind: "$employeeInfo" },
      {
        $project: {
          _id: 1,
          portfolioImages: { $ifNull: ["$portfolio.image", {}] },
          description: { $ifNull: ["$portfolio.description", ""] },
          portfolioId: { $ifNull: ["$portfolio._id", {}] },
          servicename: { $ifNull: ["$serviceInfo.name", ""] },
          updodedBy: {
            $concat: [
              { $ifNull: ["$firstName", ""] },
              " ",
              { $ifNull: ["$lastName", ""] },
            ],
          },
          employeeName: {
            $concat: [
              { $ifNull: ["$employeeInfo.firstName", ""] },
              " ",
              { $ifNull: ["$employeeInfo.lastName", ""] },
            ],
          },
          employeeid: { $ifNull: ["$employeeInfo._id", ""] },
          employeeImage: { $ifNull: ["$serviceInfo.profileImage", ""] },
          overallRating: { $ifNull: [{ $first: "$employeeInfo.rewiews.service.rating" }, 0] },
          // overallRating: { $ifNull: [{ $avg: "$rewiews.overall" }, 0] },
          // rating: { $ifNull: ["$serviceInfo.reviewCount", 0] },
        },
      },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err })
      if (!results) reject({ message: "ERROR_DATA_RETRIVED" })
      resolve(results)
    })
  })
}

const getPortfolioInfoService = async req => {
  return new Promise(async (resolve, reject) => {
    var userid = req.body.userid ? req.body.userid : req.user._id
    var workid = req.body.workid
    Users.aggregate([
      { $match: { _id: ObjectID(userid) } },
      { $unwind: "$portfolio" },
      {
        $match: {
          "portfolio._id": ObjectID(workid),
        },
      },
      // { $group: { _id: '$_id', list: { $push: '$portfolio' } } },
      {
        $lookup: {
          from: "services",
          localField: "portfolio.serviceid",
          foreignField: "_id",
          as: "serviceInfo",
        },
      },
      { $unwind: "$serviceInfo" },
      {
        $project: {
          _id: 1,
          portfolioImages: { $ifNull: ["$portfolio.image", ""] },
          description: { $ifNull: ["$portfolio.description", ""] },
          portfolioId: { $ifNull: ["$portfolio._id", ""] },
          serviceName: { $ifNull: ["$serviceInfo.name", ""] },
        },
      },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err })
      if (!results) reject({ message: "ERROR_DATA_RETRIVED" })
      resolve(results)
    })
  })
}

const deletePortfolioServices = async req => {
  return new Promise(async (resolve, reject) => {
    var userid = req.body.userid
    var workid = req.body.workid
    Users.findOneAndUpdate(
      { _id: ObjectID(userid) },
      { $pull: { portfolio: { _id: workid } } },
      { new: true, useFindAndModify: false }
    )
      .then(setting => {
        if (!setting) reject({ message: "USER_NOT_FOUND" })
        resolve(setting)
      })
      .catch(err => reject({ message: "USER_NOT_FOUND" }))
  })
}

module.exports = {
  addPortfolioServices,
  updatePortfolioService,
  getPortfolioService,
  deletePortfolioServices,
  getPortfolioInfoService,
}
