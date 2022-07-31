const { Users } = require("../models/UserModel")
const { Booking } = require("../models/BookingModel")
var ObjectID = require("mongoose").Types.ObjectId
const Utility = require("../helpers/Utility")

const getCustomerService = async req => {
  return new Promise(async (resolve, reject) => {
    var { pagesize, page, sortBy } = await Utility.convertReqtoPaginate(
      req.query
    )
    var query = { userType: { $in: ["User"] } }
    if (req.query.search) {
      query = {
        $or: [
          { customerName: RegExp(req.query.search, "i") },
          { mobile: RegExp(req.query.search, "i") },
          { email: RegExp(req.query.search, "i") },
        ],
      }
    }
    Users.aggregate([
      {
        $project: {
          _id: 1,
          customerName: {
            $concat: [
              { $ifNull: ["$firstName", ""] },
              " ",
              { $ifNull: ["$lastName", ""] },
            ],
          },
          firstName: { $ifNull: ["$firstName", ""] },
          lastName: { $ifNull: ["$lastName", ""] },
          mobile: { $ifNull: ["$mobile", ""] },
          email: { $ifNull: ["$email", ""] },
          gender: { $ifNull: ["$gender", ""] },
          dateOfBirth: { $substr: ["$dateOfBirth", 0, 10] },
          postalCode: { $ifNull: ["$location.postalCode", ""] },
          profileImage: { $ifNull: ["$profileImage", ""] },
          notes: { $ifNull: ["$notes", ""] },
          acceptMarketingEmail: { $ifNull: ["$acceptMarketingEmail", false] },
          acceptTermsPolicy: { $ifNull: ["$acceptTermsPolicy", false] },
          source: { $ifNull: ["$source", ""] },
          prepaymentRequired: { $ifNull: ["$prepaymentRequired", ""] },
          acceptNotification: { $ifNull: ["$acceptNotification", ""] },
          status: { $ifNull: ["$status", ""] },
          upcoming: { $ifNull: ["$upcoming", ""] },
          cancelled: { $ifNull: ["$cancelled", ""] },
          complete: { $ifNull: ["$complete", ""] },
          userType: { $ifNull: ["$userType", ""] },
          createdAt: { $ifNull: ["$createdAt", ""] },
          updatedAt: { $ifNull: ["$updatedAt", ""] },
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
      if (!results) reject({ message: "ERROR_DATA_RETRIVED" })
      resolve(results)
    })
  })
}

const customerProfileInfoService = async req => {
  return new Promise(async (resolve, reject) => {
    userid = req.body.userid ? req.body.userid : req.user._id
    Users.aggregate([
      { $match: { _id: ObjectID(userid) } },
      { $match: { userType: "User" } },
      {
        $project: {
          _id: 1,
          customerName: {
            $concat: [
              { $ifNull: ["$firstName", ""] },
              " ",
              { $ifNull: ["$lastName", ""] },
            ],
          },
          firstName: { $ifNull: ["$firstName", ""] },
          lastName: { $ifNull: ["$lastName", ""] },
          mobile: { $ifNull: ["$mobile", ""] },
          email: { $ifNull: ["$email", ""] },
          gender: { $ifNull: ["$gender", ""] },
          dateOfBirth: { $substr: ["$dateOfBirth", 0, 10] },
          postalCode: { $ifNull: ["$location.postalCode", ""] },
          profileImage: { $ifNull: ["$profileImage", ""] },
          notes: { $ifNull: ["$notes", ""] },
          acceptMarketingEmail: { $ifNull: ["$acceptMarketingEmail", false] },
          acceptTermsPolicy: { $ifNull: ["$acceptTermsPolicy", false] },
          source: { $ifNull: ["$source", ""] },
          prepaymentRequired: { $ifNull: ["$prepaymentRequired", ""] },
          acceptNotification: { $ifNull: ["$acceptNotification", ""] },
          status: { $ifNull: ["$status", ""] },
          upcoming: { $ifNull: ["$upcoming", ""] },
          cancelled: { $ifNull: ["$cancelled", ""] },
          complete: { $ifNull: ["$complete", ""] },
          userType: { $ifNull: ["$userType", ""] },
          createdAt: { $ifNull: ["$createdAt", ""] },
          updatedAt: { $ifNull: ["$updatedAt", ""] },
        },
      },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err })
      if (!results) reject({ message: "ERROR_DATA_RETRIVED" })
      resolve(results[0])
    })
  })
}

const updateCustomerService = async req => {
  return new Promise(async (resolve, reject) => {
    var customerid = req.body.customerid ? req.body.customerid : req.user._id
    if (req.file && req.file.path) {
      req.body.profileImage = req.file.path
    }
    if (req.body.acceptMarketingEmail) {
      req.body.acceptMarketingEmail
    }
    Users.findOneAndUpdate(
      { _id: ObjectID(customerid) },
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dateOfBirth: req.body.dateOfBirth,
        gender: req.body.gender,
        profileImage: req.body.profileImage,
        "location.postalCode": req.body.postalCode,
        prepaymentRequired: req.body.prepaymentRequired,
        acceptNotification: req.body.acceptNotification,
        acceptMarketingEmail: req.body.acceptMarketingEmail,
      },
      { new: true, useFindAndModify: false }
    )
      .then(users => {
        if (!users) reject({ message: "USER_NOT_FOUND" })
        resolve(users)
      })
      .catch(err => reject({ message: err }))
  })
}

const getSalonListByCategoryService = async req => {
  return new Promise(async (resolve, reject) => {
    var { pagesize, page, sortBy } = await Utility.convertReqtoPaginate(
      req.query
    )
    var query = { userType: { $in: ["Salon"] } }
    if (req.query.search) {
      query = {
        $or: [
          { categoryid: ObjectID(req.query.search) },
          { serviceName: RegExp(req.query.search, "i") },
        ],
      }
    }
    Users.aggregate([
      {
        $lookup: {
          from: "salonservices",
          localField: "_id",
          foreignField: "salonid",
          as: "list_service",
        },
      },
      { $unwind: "$list_service" },
      {
        $project: {
          _id: 1,
          salonName: { $ifNull: ["$salonDetail.salonName", ""] },
          postalCode: { $ifNull: ["$location.postalCode", ""] },
          serviceName: { $ifNull: ["$list_service.name", ""] },
          categoryid: { $ifNull: ["$list_service.categoryid", ""] },
          serviceid: { $ifNull: ["$list_service.serviceid", ""] },
          salonid: { $ifNull: ["$list_service.salonid", ""] },
        },
      },
      // { $match: query },
      { $sort: sortBy },
      {
        $facet: {
          docs: [{ $skip: (page - 1) * pagesize }, { $limit: pagesize }],
          totalDocs: [{ $count: "count" }],
        },
      },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err })
      if (!results) reject({ message: "ERROR_DATA_RETRIVED" })
      resolve(results)
    })
  })
}

const getSalonListByServiceService = async req => {
  return new Promise(async (resolve, reject) => {
    var { pagesize, page, sortBy } = await Utility.convertReqtoPaginate(
      req.query
    )

    var query = { userType: { $in: ["Salon"] } }
    if (req.query.search) {
      query = {
        $or: [{ serviceName: RegExp(req.query.search, "i") }],
      }
    }
    Users.aggregate([
      {
        $lookup: {
          from: "salonservices",
          localField: "_id",
          foreignField: "salonid",
          as: "list_service",
        },
      },
      { $unwind: "$list_service" },
      {
        $project: {
          _id: 1,
          salonName: { $ifNull: ["$salonDetail.salonName", ""] },
          postalCode: { $ifNull: ["$location.postalCode", ""] },
          serviceName: { $ifNull: ["$list_service.name", ""] },
          categoryid: { $ifNull: ["$list_service.categoryid", ""] },
          serviceid: { $ifNull: ["$list_service.serviceid", ""] },
          salonid: { $ifNull: ["$list_service.salonid", ""] },
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
      if (!results) reject({ message: "ERROR_DATA_RETRIVED" })
      resolve(results)
    })
  })
}

const customerBookingHistoryService = async req => {
  return new Promise(async (resolve, reject) => {
    Booking.aggregate([
      { $match: { userid: ObjectID(req.body.customerid) } },
      {
        $lookup: {
          from: "users",
          localField: "salonid",
          foreignField: "_id",
          as: "salonInfo",
        },
      },
      {
        $lookup: {
          from: "services",
          localField: "services.serviceid",
          foreignField: "_id",
          as: "serviceInfo",
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
        $project: {
          _id: 1,
          userid: { $ifNull: ["$userid", ""] },
          saloneName: { $ifNull: ["$salonInfo.salonDetail.salonName", ""] },
          salonLogo: { $ifNull: ["$salonInfo.salonDetail.logo", ""] },
          bookingTime: { $ifNull: ["$bookingtime", ""] },
          bookingdate: { $ifNull: ["$bookingdate", ""] },
          status: { $ifNull: ["$status", ""] },
          orderRef: { $ifNull: ["$orderRef", ""] },
          source: { $ifNull: ["$source", ""] },
          paymentAtVenue: { $ifNull: ["$totalAmount", ""] },
          service: {
            serviceImage: { $ifNull: ["$serviceInfo.image", ""] },
            serviceName: { $ifNull: ["$serviceInfo.name", ""] },
            employeeName: { $ifNull: ["$teamInfo.firstName", ""] },
            duration: { $ifNull: ["$services.duration", ""] },
          },
        },
      },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err })
      if (!results) reject({ message: "ERROR_DATA_RETRIVED" })
      resolve(results)
    })
  })
}

const customerDeleteService = async req => {
  return new Promise(async (resolve, reject) => {
    var userid = req.body.userid
    await Users.updateMany(
      { "salonDetail.prefferedLanguage.languageid": ObjectID(userid) },
      {
        $pull: {
          "salonDetail.prefferedLanguage": { userid: ObjectID(userid) },
        },
      }
    )
    await Users.findByIdAndDelete({ _id: req.body.userid })
      .then(customer => {
        if (!customer) reject({ message: "USER_NOT_FOUND" })
        resolve(customer)
      })
      .catch(err => reject({ message: err }))
  })
}

const getTeamPortfolioService = async req => {
  return new Promise(async (resolve, reject) => {
    var salonid = await Users.SalonPortfolio(req.body.employeeid)
    Users.aggregate([
      { $match: { _id: ObjectID(salonid.salonid) } },
      {
        $project: {
          _id: 1,
          portfolio: {
            $map: {
              input: {
                $filter: {
                  input: "$portfolio",
                  as: "portfoliorow",
                  cond: {
                    $eq: [
                      "$$portfoliorow.employeeid",
                      ObjectID(req.body.employeeid),
                    ],
                  },
                },
              },
              as: "portfoliols",
              in: {
                image: "$$portfoliols.image",
                employeeid: "$$portfoliols.employeeid",
              },
            },
          },
          createdAt: { $ifNull: ["$createdAt", ""] },
          updatedAt: { $ifNull: ["$updatedAt", ""] },
        },
      },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err })
      if (!results) reject({ message: "ERROR_DATA_RETRIVED" })
      resolve(results)
    })
  })
}

const employeeWorkDetailService = async req => {
  return new Promise(async (resolve, reject) => {
    var workid = req.body.workid
    Users.aggregate([
      { $match: { "portfolio._id": ObjectID(workid) } },
      { $unwind: "$portfolio" },
      {
        $lookup: {
          from: "services",
          localField: "portfolio.serviceid",
          foreignField: "_id",
          as: "servicesInfo",
        },
      },
      { $unwind: "$servicesInfo" },
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
          serviceName: { $ifNull: ["$servicesInfo.name", ""] },
          serviceImage: { $ifNull: ["$servicesInfo.image", ""] },
          description: { $ifNull: ["$portfolio.description", ""] },
          portfolioImage: { $ifNull: ["$portfolio.image", ""] },
          portfolioid: { $ifNull: ["$portfolio._id", ""] },
          employeeName: { $ifNull: ["$employeeInfo.firstName", ""] },
          employeeImage: { $ifNull: ["$employeeInfo.profileImage", ""] },
        },
      },
      { $match: { portfolioid: ObjectID(workid) } },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err })
      if (!results) reject({ message: "ERROR_DATA_RETRIVED" })
      resolve(results)
    })
  })
}

const getSalonListService = async req => {
  return new Promise(async (resolve, reject) => {
    let { pagesize, page, sortBy } = await Utility.convertReqtoPaginate(req.query)
    //=======================================  For  Serach Salon Filter ==============================================//
    let query = {}
    let checkDate = await Utility.dateAndTime(req.query.date, req.query.startTime, req.query.endTime)
    let postalQuery = { postalCode: req.query.postalCode }
    let serviceQuery = { serviceid: ObjectID(req.query.serviceid) }
    let cityQuery = { city: RegExp(req.query.city, "i") }

    if (req.query.salonName) {
      query = { salonName: RegExp(req.query.salonName, "i") }
    } else if (req.query.serviceName) {
      query = { serviceName: RegExp(req.query.serviceName, "i") }
    } else if (req.query.postalCode || req.query.serviceid || req.query.city || req.query.date) {

      if (req.query.postalCode && req.query.serviceid && req.query.date) {
        query = { $and: [checkDate, serviceQuery, postalQuery] }
      } else if (req.query.city && req.query.serviceid && req.query.date) {
        query = { $and: [checkDate, serviceQuery, cityQuery] }
      } else if (req.query.city && req.query.date) {
        query = { $and: [checkDate, cityQuery] }
      } else if (req.query.postalCode && req.query.date) {
        query = { $and: [checkDate, postalQuery] }
      } else if (req.query.serviceid && req.query.date) {
        query = { $and: [checkDate, serviceQuery] }
      } else if (req.query.serviceid && req.query.postalCode) {
        query = { $and: [postalQuery, serviceQuery] }
      } else if (req.query.serviceid && req.query.city) {
        query = { $and: [cityQuery, serviceQuery] }
      } else if (req.query.city) {
        query = cityQuery
      } else if (req.query.serviceid) {
        query = serviceQuery
      } else if (req.query.postalCode) {
        query = postalQuery
      } else if (req.query.date) {
        query = checkDate
      }
    }

    //======================================= After Serach Salon Filter  And Sorting  ==============================================//

    let value = {};
    if (req.query.minAvgduration) {
      sortBy = { minAvgduration: 1 }
    } else if (req.query.recommended) {
      sortBy = { recommended: -1 }
    } else if (req.query.highAvgRating) {
      sortBy = { highAvgRating: -1 }
    } else if (req.query.highAvgPrice) {
      sortBy = { highAvgPrice: -1 }
    } else if (req.query.loweAvgPrice) {
      sortBy = { loweAvgPrice: 1 }
    } else if (req.query.generalAvgDiscount) {
      sortBy = { generalAvgDiscount: -1 }
    }
    if (
      req.query.generalAvgDiscount === "generalAvgDiscount" ||
      req.query.expressTreatment === "expressTreatment" ||
      req.query.topVenue === "topVenue" ||
      req.query.recommended === "recommended" ||
      req.query.highAvgRating === "highAvgRating" ||
      req.query.minAvgduration === "minAvgduration" ||
      req.query.highAvgPrice === "highAvgPrice" ||
      req.query.loweAvgPrice === 'loweAvgPrice' ||
      req.query.SmartDiscount === 'SmartDiscount' ||
      req.query.lessPrice && req.query.greaterPrice
    ) {
      if (req.query.lessPrice && req.query.greaterPrice && req.query.SmartDiscount && req.query.topVenue) {
        value = { $and: [{ $or: [{ lastMinuteDiscount: true }, { offPicDiscount: true }] }, { topVenue: { $gt: 0 } }, { price: { $gte: parseInt(req.query.greaterPrice), $lte: parseInt(req.query.lessPrice) } }] }
      } else if (req.query.lessPrice && req.query.greaterPrice && req.query.SmartDiscount) {
        value = { $and: [{ $or: [{ lastMinuteDiscount: true }, { offPicDiscount: true }] }, { price: { $gte: parseInt(req.query.greaterPrice), $lte: parseInt(req.query.lessPrice) } }] }
      } else if (req.query.lessPrice && req.query.greaterPrice && req.query.topVenue) {
        value = { $and: [{ topVenue: { $gt: 0 } }, { price: { $gte: parseInt(req.query.greaterPrice), $lte: parseInt(req.query.lessPrice) } }] }
      } else if (req.query.SmartDiscount && req.query.topVenue) {
        value = { $and: [{ topVenue: { $gt: 0 } }, { $or: [{ lastMinuteDiscount: true }, { offPicDiscount: true }] }] }
      } else if (req.query.SmartDiscount) {
        value = { $or: [{ lastMinuteDiscount: true }, { offPicDiscount: true }] }
      } else if (req.query.lessPrice && req.query.greaterPrice) {
        value = { price: { $gte: parseInt(req.query.greaterPrice), $lte: parseInt(req.query.lessPrice) } }
      } else if (req.query.topVenue) {
        value = { topVenue: { $gt: 0 } }
      }
    }

    Users.aggregate([
      // {
      //   $geoNear: {
      //     near: {
      //         type: "Point", coordinates: [0,0]
      // //      type: "Point", coordinates: req.body.location1
      //     },
      //      distanceField: "distance",
      //     includeLocs: "location",
      //     distanceMultiplier : 1/1000,
      //     maxDistance: distance * 1000,
      //    // query: req.matchquery,
      //     spherical: true,
      //   }
      // },
      { $match: { userType: { $in: ["Salon"] } } },
      {
        $lookup: {
          from: "discounts",
          localField: "_id",
          foreignField: "salonid",
          as: "discountInfo",
        },
      },
      {
        $lookup: {
          from: "salonservices",
          localField: "_id",
          foreignField: "salonid",
          as: "serviceInfo",
        },
      },
      {
        $lookup: {
          from: "bookings",
          localField: "_id",
          foreignField: "salonid",
          as: "bookingInfo",
        },
      },
      {
        $project: {
          _id: 1,
          //sorting
          recommended: { $ifNull: [{ $size: "$bookingInfo" }, 0] },
          highAvgRating: { $ifNull: [{ $avg: "$rewiews.overall" }, 0] },
          minAvgduration: { $ifNull: [{ $avg: "$serviceInfo.minduration" }, 0] },
          loweAvgPrice: { $ifNull: [{ $avg: "$serviceInfo.minprice" }, 0] },
          highAvgPrice: { $ifNull: [{ $avg: "$serviceInfo.maxprice" }, 0] },
          generalAvgDiscount: { $avg: "$discountInfo.general.discount" },
          //filter
          price: { $ifNull: ["$serviceInfo.minprice", []] },
          topVenue: { $ifNull: [{ $size: "$salonDetail.awards" }, 0] },
          lastMinuteDiscount: { $ifNull: [{ $first: "$discountInfo.lastMinute.enableDiscount" }, false] },
          offPicDiscount: { $ifNull: [{ $first: "$discountInfo.offPic.enableDiscount" }, false] },
          //filter
          salonName: { $ifNull: ["$salonDetail.salonName", ""] },
          postalCode: { $ifNull: ["$location.postalCode", ""] },
          city: { $ifNull: ["$location.city", ""] },
          salonImage: { $ifNull: ["$salonDetail.verifiedShopImages", []] },
          country: { $ifNull: ["$location.country", ""] },
          serviceName: { $ifNull: ["$serviceInfo.name", []] },
          serviceid: { $ifNull: ["$serviceInfo.serviceid", []] },
          portfolio: { $ifNull: ["$portfolio", []] },
          award: { $ifNull: ["$salonDetail.awards", []] },
          overallRating: { $ifNull: ["$averageRating.overall", 0] },
          reviewCount: { $ifNull: ["$reviewCount", 0] },
          shopStatus: { $cond: { if: { $lte: [{ $dateDiff: { startDate: "$salonDetail.approvedAt", endDate: new Date(), unit: "day", }, }, 15,], }, then: "New", else: null, }, },
          categoryid: { $ifNull: ["$list_service.categoryid", []] },
          monday: { $ifNull: ["$workingHour.monday.isOpen", ""] },
          mondayStartTime: { $toInt: { $first: { $split: ["$workingHour.monday.startTime", ":"] }, }, },
          mondayEndTime: { $toInt: { $first: { $split: ["$workingHour.monday.endtime", ":"] }, }, },

          tuesday: { $ifNull: ["$workingHour.tuesday.isOpen", ""] },
          tuesdayStartTime: { $toInt: { $first: { $split: ["$workingHour.tuesday.startTime", ":"] }, }, },
          tuesdayEndTime: { $toInt: { $first: { $split: ["$workingHour.tuesday.endtime", ":"] }, }, },

          wednesday: { $ifNull: ["$workingHour.wednesday.isOpen", ""] },
          wednesdayStartTime: { $toInt: { $first: { $split: ["$workingHour.wednesday.startTime", ":"] }, }, },
          wednesdayEndTime: { $toInt: { $first: { $split: ["$workingHour.wednesday.endtime", ":"] }, }, },

          thursday: { $ifNull: ["$workingHour.thursday.isOpen", ""] },
          thursdayStartTime: { $toInt: { $first: { $split: ["$workingHour.thursday.startTime", ":"] }, }, },
          thursdayEndTime: { $toInt: { $first: { $split: ["$workingHour.thursday.endtime", ":"] }, }, },

          friday: { $ifNull: ["$workingHour.friday.isOpen", ""] },
          fridayStartTime: { $toInt: { $first: { $split: ["$workingHour.friday.startTime", ":"] }, }, },
          fridayEndTime: { $toInt: { $first: { $split: ["$workingHour.friday.endtime", ":"] }, }, },

          saturday: { $ifNull: ["$workingHour.saturday.isOpen", ""] },
          saturdayStartTime: { $toInt: { $first: { $split: ["$workingHour.saturday.startTime", ":"] }, }, },
          saturdayEndTime: { $toInt: { $first: { $split: ["$workingHour.saturday.endtime", ":"] }, }, },

          sunday: { $ifNull: ["$workingHour.sunday.isOpen", ""] },
          sundayStartTime: { $toInt: { $first: { $split: ["$workingHour.sunday.startTime", ":"] }, }, },
          sundayEndTime: { $toInt: { $first: { $split: ["$workingHour.sunday.endtime", ":"] }, }, },

        },
      },
      { $match: query },
      { $match: value },
      { $sort: sortBy },
      { $facet: { docs: [{ $skip: (page - 1) * pagesize }, { $limit: pagesize }], totalDocs: [{ $count: "count" }], }, },
    ]).exec(async (err, results) => {
      console.log(err)
      if (err) reject({ message: err })
      if (!results) reject({ message: "ERROR_DATA_RETRIVED" })
      resolve(results)
    })
  })
}


module.exports = {
  getCustomerService,
  customerProfileInfoService,
  updateCustomerService,
  getSalonListService,
  getSalonListByCategoryService,
  getSalonListByServiceService,
  customerBookingHistoryService,
  customerDeleteService,
  getTeamPortfolioService,
  employeeWorkDetailService,
}
