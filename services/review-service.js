const { Users } = require("../models/UserModel")
var ObjectID = require("mongoose").Types.ObjectId
const Utility = require("../helpers/Utility")

const getReviewService = async req => {
  return new Promise(async (resolve, reject) => {
    var { pagesize, page, sortBy } = await Utility.convertReqtoPaginate(
      req.query
    )
    var query = {}
    if (req.body.search) {
      query = { $or: [{ salonName: RegExp(req.body.search, "i") }] }
    }
    Users.aggregate([
      { $unwind: "$rewiews" },
      { $match: { "rewiews.active": true } },
      { $match: { "rewiews.isDeleted": false } },
      {
        $lookup: {
          from: "users",
          localField: "rewiews.userid",
          foreignField: "_id",
          as: "customerInfo",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "rewiews.employee.employeeid",
          foreignField: "_id",
          as: "employeeInfo",
        },
      },
      {
        $lookup: {
          from: "services",
          localField: "rewiews.service.serviceid",
          foreignField: "_id",
          as: "serviceInfo",
        },
      },
      { $unwind: "$customerInfo" },
      // { $unwind: "$serviceInfo" },
      // { $unwind: "$employeeInfo" },
      {
        $project: {
          _id: 1,
          customerName: { $concat: [{ $ifNull: ["$customerInfo.firstName", ""] }, " ", { $ifNull: ["$customerInfo.lastName", ""] },], },
          overallRating: { $ifNull: ["$rewiews.overall", 0] },
          ambience: { $ifNull: ["$rewiews.ambience", ''] },
          cleanliness: { $ifNull: ["$rewiews.cleanliness", 0] },
          employeeRating: { $ifNull: ["$rewiews.employee.employeeRating", 0] },
          employeeName: {
            $map: {
              input: "$employeeInfo",
              as: "employee",
              in: {
                name: { $concat: [{ $ifNull: ["$$employee.firstName", ""] }, " ", { $ifNull: ["$$employee.lastName", ""] },], },
              },
            },
          },
          serviceRating: { $ifNull: ["$rewiews.service.serviceRating", 0] },
          serviceName: { $ifNull: ["$serviceInfo.name", ""] },
          review: { $ifNull: ["$rewiews.review", ""] },
          createdAt: { $substr: ["$createdAt", 0, 10] },
          salonName: { $ifNull: ["$salonDetail.salonName", ""] },
          active: { $ifNull: ["$active", ""] },
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
// Users.aggregate([
//   { $match: { "rewiews.isDeleted": false } },
//   // { $match: { _id: ObjectID(req.body.salonid) } },
//   { $unwind: "$rewiews" },
//   {
//     $lookup: {
//       from: "users",
//       localField: "rewiews.userid",
//       foreignField: "_id",
//       as: "customerInfo",
//     },
//   },
//   {
//     $lookup: {
//       from: "services",
//       localField: "rewiews.service.serviceid",
//       foreignField: "_id",
//       as: "serviceInfo",
//     },
//   },
//   { $unwind: "$customerInfo" },
//   { $unwind: "$serviceInfo" },
//   {
//     $project: {
//       _id: 1,
//       reviewid: { $ifNull: ["$rewiews._id", ""] },
//       customerName: {
//         $concat: [
//           { $ifNull: ["$customerInfo.firstName", ""] },
//           " ",
//           { $ifNull: ["$customerInfo.lastName", ""] },
//         ],
//       },
//       overallRating: { $ifNull: ["$rewiews.overall", ""] },
//       // reviewDescription: [{
//       // }],
//       ambience: { $ifNull: ["$rewiews.ambience", ""] },
//       staff: { $ifNull: ["$rewiews.staff", ""] },
//       cleanliness: { $ifNull: ["$rewiews.cleanliness", ""] },
//       review: { $ifNull: ["$rewiews.review", ""] },
//       salonName: { $ifNull: ["$salonDetail.salonName", ""] },
//       serviceName: { $ifNull: ["$serviceInfo.name", ""] },
//       createdAt: { $substr: ["$createdAt", 0, 10] },
//       active: { $ifNull: ["$active", ""] },
//     },
//   },

const addReviewSalonService = async req => {
  return new Promise(async (resolve, reject) => {
    var customerid = req.body.customerid ? req.body.customerid : req.user._id;
    await Users.findOne({ _id: req.body.salonid })
      .then(async user => {
        user.rewiews.push({
          overall: req.body.overall,
          ambience: req.body.ambience,
          cleanliness: req.body.cleanliness,
          userid: customerid,
          bookingid: ObjectID(req.body.bookingid),
          service: req.body.service,
          employee: req.body.employee,
          review: req.body.review,
          userName: req.body.userName,
          userNameShow: req.body.userNameShow,
        })
        return user.save()
      })
      .then(user => {
        resolve(user)
      })
  })
}

const getReviewSalonService = async req => {
  return new Promise(async (resolve, reject) => {
    req.body.userid = req.body.userid ? req.body.userid : req.user._id
    var { pagesize, page, sortBy } = await Utility.convertReqtoPaginate(
      req.query
    )
    Users.aggregate([
      { $unwind: "$rewiews" },
      {
        $match: {
          "rewiews.userid": ObjectID(req.body.userid),
        },
      },
      { $group: { _id: "$_id", list: { $push: "$rewiews" } } },
      { $unwind: "$list" },
      ,
      //  { "$lookup": {
      //     "from": "users",
      //     "let": { "answerId": "$rewiews.userid" },
      //     "pipeline": [{ "$match": { "$expr": { "$eq": ["$_id", "$$answerId"] }}}],
      //     "as": "dates"
      //   }}

      // {
      //   $lookup: {
      //     from: "users",
      //     localField: "users.rewiews.userid",
      //     foreignField: "_id",
      //     as: "customerInfo",
      //   },
      // },
      // {
      //   $lookup: {
      //     from: "services",
      //     localField: "rewiews.serviceid",
      //     foreignField: "_id",
      //     as: "serviceInfo",
      //   },
      // },
      // { $unwind: "$rewiews" },
      // { $unwind: "$customerInfo" },
      // { $unwind: "$serviceInfo" },
      // {
      //   $project: {
      //     _id: 1,
      //     salonName: { $ifNull: ["$salonDetail.salonName", ""] },
      //     overallRating: { $ifNull: ["$rewiews.overall", ""] },
      //     reviewDescription: [
      //       {
      //         ambience: { $ifNull: ["$rewiews.ambience", ""] },
      //         staff: { $ifNull: ["$rewiews.staff", ""] },
      //         cleanliness: { $ifNull: ["$rewiews.cleanliness", ""] },
      //         review: { $ifNull: ["$rewiews.review", ""] },
      //       },
      //     ],
      //     active: { $ifNull: ["$active", ""] },
      //     customerName: {
      //       $concat: [
      //         { $ifNull: ["$customerInfo.firstName", ""] },
      //         " ",
      //         { $ifNull: ["$customerInfo.lastName", ""] },
      //       ],
      //     },
      //     serviceName: { $ifNull: ["$serviceInfo.name", ""] },
      //     createdAt: { $ifNull: ["$createdAt", ""] },
      //   },
      // },
      // { $match: query },
      // { $sort: sortBy },
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

const updateResponseReviewServices = async req => {
  return new Promise(async (resolve, reject) => {
    Users.findOneAndUpdate(
      { "rewiews._id": req.body.reviewid },
      { $push: { "rewiews.$.replied": { response: req.body.response } } },

      { new: true, useFindAndModify: false }
    )
      .then(users => {
        if (!users) reject({ message: "USER_NOT_FOUND" })
        resolve(users)
      })
      .catch(err => reject({ message: "USER_NOT_FOUND" }))
  })
}

const getSalonReviewService = async req => {
  return new Promise(async (resolve, reject) => {
    req.body.salonid = req.body.salonid ? req.body.salonid : req.user._id
    var { pagesize, page, sortBy } = await Utility.convertReqtoPaginate(
      req.query
    )
    var query = {}
    if (req.query.search) {
      query = { customerName: RegExp(req.query.search, "i") }
    }
    Users.aggregate([
      { $match: { _id: ObjectID(req.body.salonid) } },
      { $unwind: "$rewiews" },
      // { $match: { "rewiews.active": false } },
      {
        $lookup: {
          from: "users",
          localField: "rewiews.userid",
          foreignField: "_id",
          as: "customerInfo",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "rewiews.employee.employeeid",
          foreignField: "_id",
          as: "employeeInfo",
        },
      },
      {
        $lookup: {
          from: "services",
          localField: "rewiews.service.serviceid",
          foreignField: "_id",
          as: "serviceInfo",
        },
      },
      { $unwind: "$customerInfo" },
      // { $unwind: "$serviceInfo" },
      // { $unwind: "$employeeInfo" },
      {
        $project: {
          _id: 1,
          customerName: { $concat: [{ $ifNull: ["$customerInfo.firstName", ""] }, " ", { $ifNull: ["$customerInfo.lastName", ""] },], },
          overallRating: { $ifNull: ["$rewiews.overall", 0] },
          ambience: { $ifNull: ["$rewiews.ambience", ''] },
          cleanliness: { $ifNull: ["$rewiews.cleanliness", 0] },
          employeeRating: { $ifNull: ["$rewiews.employee.employeeRating", 0] },
          employeeName: {
            $map: {
              input: "$employeeInfo",
              as: "employee",
              in: {
                name: { $concat: [{ $ifNull: ["$$employee.firstName", ""] }, " ", { $ifNull: ["$$employee.lastName", ""] },], },
              },
            },
          },
          serviceRating: { $ifNull: ["$rewiews.service.serviceRating", 0] },
          serviceName: { $ifNull: ["$serviceInfo.name", ""] },
          review: { $ifNull: ["$rewiews.review", ""] },
          createdAt: { $substr: ["$rewiews.createdAt", 0, 10] },
          salonName: { $ifNull: ["$salonDetail.salonName", ""] },
          active: { $ifNull: ["$rewiews.active", ""] },
          isDeleted: { $ifNull: ["$rewiews.isDeleted", ""] },
          // employeeInfo:1,
          // employeeName: { $concat: [{ $ifNull: ["$employeeInfo.firstName", ""] }, " ", { $ifNull: ["$employeeInfo.lastName", ""] },], },
        },
      },
      { $match: { active: true } },
      { $match: { isDeleted: false } },
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
      // console.log(results[0])
      resolve(results)
    })
  })
}

// const getSalonAvergeReviewService = async req => {
//   return new Promise(async (resolve, reject) => {
//     req.body.userid = req.body.userid ? req.body.userid : req.user._id
//     Users.aggregate([{ $match: { _id: ObjectID(req.body.userid) } }]).exec(
//       async (err, results) => {
//         if (err) reject({ message: err })
//         if (!results) reject({ message: "ERROR_DATA_RETRIVED" })
//         resolve(results)
//       }
//     )
//   })
// }
const getSalonAvergeReviewService = async req => {
  return new Promise(async (resolve, reject) => {
    req.body.salonid = req.body.salonid ? req.body.salonid : req.user._id;
    Users.aggregate([
      { $match: { _id: ObjectID(req.body.salonid) } },
      // { $unwind: "$rewiews" },
      {
        $project: {
          _id: 1,
          overallRating: { $ifNull: [{ $avg: "$rewiews.overall" }, 0] },
          ambience: { $ifNull: [{ $avg: "$rewiews.ambience" }, 0] },
          cleanliness: { $ifNull: [{ $avg: "$rewiews.cleanliness" }, 0] },
          serviceRating: { $ifNull: ["$rewiews.service", 0] },
          employeeRating: { $ifNull: ["$rewiews.employee", 0] },
          reviewCount: { $ifNull: [{ $size: "$rewiews" }, 0] },
          createdAt: { $substr: ["$createdAt", 0, 10] },
          active: { $ifNull: ["$active", ""] },
        },
      },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err })
      if (!results) reject({ message: "ERROR_DATA_RETRIVED" })
      let zeroservice = 0;
      let zerocount = 0;
      let serviceAverage;
      let service = results[0].serviceRating;
      for await (const servicedata of service) {
        for await (const finalservicedata of servicedata) {
          zeroservice += parseInt(finalservicedata.serviceRating);
          zerocount++;
        }
        serviceAverage = zeroservice / zerocount;
      }
      let zerostaff = 0;
      let zerostaffcount = 0;
      let staffAverage;
      let staff = results[0].employeeRating;
      for await (const staffdata of staff) {
        for await (const finalstaffedata of staffdata) {
          zerostaff += parseInt(finalstaffedata.employeeRating);
          zerostaffcount++;
        }
        staffAverage = zerostaff / zerostaffcount;
      }
      let data = {
        _id: results[0]._id,
        overallRating: results[0].overallRating,
        reviewCount: results[0].reviewCount,
        ambience: results[0].ambience,
        cleanliness: results[0].cleanliness,
        serviceRating: Number(serviceAverage.toFixed(1)),
        employeeRating: Number(staffAverage.toFixed(1)),
      }
      resolve(data)
    })
  })
}

const deleteReviewServices = async (req) => {
  return new Promise(async (resolve, reject) => {
    await Users.findOneAndUpdate(
      { "rewiews._id": ObjectID(req.body.reviewid) },
      { $set: { "rewiews.$.isDeleted": true } },
      { new: true, useFindAndModify: false }
    )
      .then((review) => {
        if (!review) reject({ message: "REVIEW_NOT_FOUND" });
        resolve(review);
      })
      .catch((err) => reject({ message: "REVIEW_NOT_FOUND" }));
  });
};

module.exports = {
  //addReviewServices,
  getReviewService,
  addReviewSalonService,
  getReviewSalonService,
  updateResponseReviewServices,
  getSalonReviewService,
  getSalonAvergeReviewService,
  deleteReviewServices,
}
