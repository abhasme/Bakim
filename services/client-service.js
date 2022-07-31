const { query } = require("express")
const { Users } = require("../models/UserModel")
const { Booking } = require("../models/BookingModel")
const ObjectID = require("mongoose").Types.ObjectId
const Utility = require("../helpers/Utility")

const addSalonClientServices = req => {
  return new Promise(async (resolve, reject) => {
    req.body.salonid = req.body.salonid ? req.body.salonid : req.user._id
    if (req.file && req.file.path) {
      req.body.profileImage = req.file.path ? req.file.path : ""
    }
    const query = new Users({
      ...req.body,
      salonid: req.body.salonid,
    })
    query
      .save()
      .then(result => {
        resolve(result)
      })
      .catch(err => {
        reject(err)
      })
  })
}

const getSalonClientService = async req => {
  return new Promise(async (resolve, reject) => {
    let salonid = req.body.salonid ? req.body.salonid : req.user._id
    let { pagesize, page, sortBy } = await Utility.convertReqtoPaginate(
      req.query
    )
    let query = {}
    if (req.query.search) {
      query = {
        clientName: RegExp(req.query.search, "i"),
      }
    } else if (
      req.query.acceptMarketingEmail === "true"
    ) {
      query = {
        acceptMarketingEmail: true,
      }
    } else if (req.query.acceptMarketingEmail === "false") {
      query = {
        acceptMarketingEmail: false,
      }
    } else if (req.query.bookingGreater || req.query.bookingLess) {
      query =
      {
        $or: [
          { booking: { $gte: parseInt(req.query.bookingGreater) } },
          { booking: { $lte: parseInt(req.query.bookingLess) } },
          {
            booking: {
              $lte: parseInt(req.query.bookingLess),
              $gte: parseInt(req.query.bookingGreater),
            },
          },
        ],
      }
    } else if (req.body.lessThan || req.body.moreThan || req.body.exactly) {
      query = {
        $or: [
          {
            createdAt: {
              $lte: new Date(
                new Date() - `${req.body.lessThan} * 60 * 60 * 24 * 1000`
              ),
              //$lt: new Date(),
            },
          },
          {
            createdAt: {
              $gte: new Date(
                new Date() - `${req.body.moreThan} * 60 * 60 * 24 * 1000`
              ),
              $lt: new Date(),
            },
          },
          {
            createdAt: {
              $eq: new Date(
                new Date() - `${req.body.exactly} * 60 * 60 * 24 * 1000`
              ),
              //$lt: new Date(),
            },
          },
        ],
      }
    } else if (
      req.body.bookingGreater ||
      req.body.bookingLess ||
      req.body.clientName ||
      req.body.acceptMarketingEmail == true ||
      req.body.acceptMarketingEmail === false
    ) {
      query = {
        $or: [
          { booking: { $gte: req.body.bookingGreater } },
          { booking: { $lte: req.body.bookingLess } },
          { clientName: RegExp(req.body.clientName, "i") },
          { acceptMarketingEmail: req.body.acceptMarketingEmail },
        ],
      }
    }
    console.log(query)
    Users.aggregate([
      { $match: { salonid: ObjectID(salonid) ,userType: "User",isDeleted: false} },
    
      {
        $lookup: {
          from: "bookings",
          localField: "_id",
          foreignField: "userid",
          as: "bookingInfo",
        },
      },
      {
        $project: {
          _id: 1,
          salonid: 1,
          clientName: {
            $concat: [
              { $ifNull: ["$firstName", ""] },
              " ",
              { $ifNull: ["$lastName", ""] },
            ],
          },
          mobile: { $ifNull: ["$mobile", ""] },
          email: { $ifNull: ["$email", ""] },
          booking: { $ifNull: [{ $size: "$bookingInfo" }, 0] },
          revenue: { $ifNull: [{ $sum: "$bookingInfo.totalAmount" }, 0] },
          consent: { $ifNull: ["$revenue", ""] },
          acceptMarketingEmail: { $ifNull: ["$acceptMarketingEmail", false] },
          createdAt: { $ifNull: ["$createdAt", ""] },
          bookingdate: {
            $ifNull: [{ $first: "$bookingInfo.bookingdate" }, , ""],
          },
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
      if (err) reject({ message: err })
      if (!results)
        reject({
          message: "SALON_NOT_FOUND",
        })
      resolve(results)
    })
  })
}
const getSalonClientInfoService = async req => {
  return new Promise(async (resolve, reject) => {
    var salonid = req.body.salonid ? req.body.salonid : req.user._id
    Users.aggregate([
      {
        $match: { isDeleted: false, _id: ObjectID(req.body.clientid) },
      },
      {
        $project: {
          _id: 1,
          salonid: 1,
          userid: 1,
          clientName: {
            $concat: [
              { $ifNull: ["$firstName", ""] },
              " ",
              { $ifNull: ["$lastName", ""] },
            ],
          },
          mobile: { $ifNull: ["$mobile", ""] },
          email: { $ifNull: ["$email", ""] },
          gender: { $ifNull: ["$gender", "Prefer Not to say"] },
          notes: { $ifNull: ["$notes", ""] },
          profileImage: { $ifNull: ["$profileImage", ""] },
          dateOfBirth: { $ifNull: ["$dateOfBirth", ""] },
          acceptMarketingEmail: { $ifNull: ["$acceptMarketingEmail", false] },
          prepaymentRequired: { $ifNull: ["$prepaymentRequired", false] },
          source: { $ifNull: ["$source", "Bakim Randevu"] },
        },
      },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err })
      if (!results)
        reject({
          message: "CLIENT_NOT_FOUND",
        })
      resolve(results)
    })
  })
}

const getSalonClientBookingService = async req => {
  return new Promise(async (resolve, reject) => {
    var salonid = req.body.salonid ? req.body.salonid : req.user._id
    Booking.aggregate([
      {
        $match: {
          $and: [
            { salonid: ObjectID(salonid) },
            { isDeleted: false },
            { userid: ObjectID(req.body.clientid) },
          ],
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "services.teamid",
          foreignField: "_id",
          as: "teamInfo",
        },
      },
      {
        $lookup: {
          from: "salonservices",
          localField: "services.serviceid",
          foreignField: "serviceid",
          as: "serviceInfo",
        },
      },
      {
        $project: {
          _id: 1,
          salonid: 1,
          userid: 1,
          bookingdate: { $ifNull: ["$bookingdate", ""] },
          bookingtime: { $ifNull: ["$bookingtime", ""] },
          source: { $ifNull: ["$source", "Bakim Randevu"] },
          status: { $ifNull: ["$status", ""] },
          paymentstatus: { $ifNull: ["$paymentstatus", ""] },
          totalAmount: { $ifNull: ["$totalAmount", 0] },
          time: { $first: "$services.time" },
          teamMember: { $first: "$teamInfo.firstName" },
          teamMember: {
            $concat: [
              { $ifNull: [{ $first: "$teamInfo.firstName" }, ""] },
              " ",
              { $ifNull: [{ $first: "$teamInfo.lastName" }, ""] },
            ],
          },
          serviceName: { $first: "$serviceInfo.name" },
        },
      },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err })
      if (!results)
        reject({
          message: "CLIENT_NOT_FOUND",
        })
      resolve(results)
    })
  })
}

const updateSalonClientServices = req => {
  return new Promise(async (resolve, reject) => {
    await Users.findOne({ _id: ObjectID(req.body.clientid) })
      .then(async user => {
        let deleteImage = user.profileImage
        if (req.file && req.file.path) {
          req.body.profileImage = req.file.path ? req.file.path : ""
          await Utility.removeFileFromPath(deleteImage)
        } else if (req.body.deleteImage) {
          req.body.profileImage = ""
          await Utility.removeFileFromPath(deleteImage)
        } else {
          req.body.profileImage = deleteImage
        }
        await Users.findOneAndUpdate(
          { _id: ObjectID(req.body.clientid) },
          { ...req.body, profileImage: req.body.profileImage },
          { new: true, useFindAndModify: false }
        )
      })
      .then(user => {
        resolve(user)
      })
  })
}

const deleteSalonClientServices = async req => {
  return new Promise(async (resolve, reject) => {
    await Booking.findOneAndDelete({ _id: ObjectID(req.body.bookingid) })
      .then(category => {
        if (!category) reject({ message: "VOUCHER_NOT_FOUND" })
        resolve(category)
      })
      .catch(err => reject({ message: "VOUCHER_NOT_FOUND" }))
  })
}

const sendEmailToClientServices = req => {
  return new Promise(async (resolve, reject) => {
    req.body.salonid = req.body.salonid ? req.body.salonid : req.user._id
    await Users.aggregate([
      { $match: { salonid: ObjectID(req.body.salonid) } },
      { $match: { userType: "User" } },
      { $match: { isDeleted: false } },
    ])
      .then(async result => {
        var emailArray = []
        for await (const email of result) {
          emailArray.push(email.email)
        }
        console.log(emailArray)
        Utility.sendEmail(
          emailArray,
          "Password",
          `thanks for Registration.Your passwrd is ${req.body.subject}, ${req.body.title}, ${req.body.message},${req.body.signature}`
        )
        resolve(result)
      })
      .catch(err => {
        reject(err)
      })
  })
}
module.exports = {
  addSalonClientServices,
  getSalonClientService,
  getSalonClientInfoService,
  getSalonClientBookingService,
  updateSalonClientServices,
  deleteSalonClientServices,
  sendEmailToClientServices,
}
