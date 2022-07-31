var ObjectID = require("mongoose").Types.ObjectId
const { Package } = require("../models/PackageModel")
const Utility = require("../helpers/Utility")

const addpackageServices = async req => {
  return new Promise(async (resolve, reject) => {
    req.body.salonid = req.body.salonid ? req.body.salonid : req.user._id
    const query = new Package({ ...req.body, salonid: req.body.salonid })
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

const getpackageService = async req => {
  return new Promise(async (resolve, reject) => {
    req.body.salonid = req.body.salonid ? req.body.salonid : req.user._id
    var serviceInfo = await Package.SalonPackageInfo(
      ObjectID(req.body.packageid),
      ObjectID(req.body.salonid)
    )
    var pricinds = serviceInfo.servicesgroup.map(data => data.pricingOptionid)
    console.log(pricinds)
    var query = {}
    if (req.body.packageid) {
      query = { _id: ObjectID(req.body.packageid) }
    } else {
      query = { salonid: ObjectID(req.body.salonid) }
    }
    Package.aggregate([
      { $match: query },
      {
        $lookup: {
          from: "discounts",
          localField: "discountid",
          foreignField: "_id",
          as: "discountfo",
        },
      },
      {
        $lookup: {
          from: "salonservices",
          localField: "servicesgroup.pricingOptionid",
          foreignField: "pricingOption._id",
          as: "groupinfo",
        },
      },
      {
        $project: {
          _id: 1,
          serviceTitle: { $ifNull: ["$serviceTitle", ""] },
          price: { $ifNull: ["$price", 0] },
          priceType: { $ifNull: ["$priceType", ""] },
          cleanupTime: { $ifNull: ["$cleanupTime", 0] },
          discountName: { $ifNull: [{ $first: "$discountfo.name" }, ""] },
          discountid: { $ifNull: ["$discountid", ""] },
          description: { $ifNull: ["$description", ""] },
          restriction: { $ifNull: ["$restriction", ""] },
          goodToKnow: { $ifNull: ["$goodToKnow", ""] },
          isFeatured: { $ifNull: ["$isFeatured", false] },
          sellServiceOnline: { $ifNull: ["$sellServiceOnline", false] },
          appointmentleadTime: { $ifNull: ["$appointmentleadTime", 0] },
          serviceAvailbility: 1,
          servicesgroup: { $ifNull: ["$servicesgroup", []] },
          // servicesgroup: {
          //   $map: {
          //     input: {
          //       $filter: {
          //         input: "$groupinfo",
          //         as: "grouprow",
          //         cond: "$$grouprow.active",
          //       },
          //     },
          //     as: "group",
          //     in: {
          //       serviceName: { $ifNull: ["$$group.name", ""] },
          //       serviceid: { $ifNull: ["$$group.serviceid", ""] },
          //       pricingOptionid: { $ifNull: ["$$group.pricingOptionid", ""] },
          //       _id: { $ifNull: ["$$group._id", ""] },
          //       // pricingOptionid: { $ifNull: ["$$group.pricingOption", ""] },
          //       pricingOptionid:{
          //         $map: {
          //           input: {
          //             $filter: {
          //               input: "$$group.pricingOption",
          //               as: "pricingsrow",
          //               cond: { $eq: ["$$pricingsrow._id", "$$group.pricingOptionid"] }
          //             },
          //           },
          //           as: "pricing",
          //           in: {
          //             serviceName: { $ifNull: ["$$pricing.name", ""] },
          //           },
          //         },
          //       },
          //     },
          //   },
          // },
        },
      },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err })
      if (!results) reject({ message: "ERROR_DATA_RETRIVED" })
      if (req.body.packageid) {
        resolve(results[0])
      } else {
        resolve(results)
      }
    })
  })
}

const updatePackageDescriptionServices = async req => {
  return new Promise(async (resolve, reject) => {
    req.body.salonid = req.body.salonid ? req.body.salonid : req.user._id
    await Package.findOneAndUpdate(
      { _id: req.body.packageid },
      { description: req.body.description },
      { new: true, useFindAndModify: false }
    )
      .then(package => {
        if (!package) reject({ message: "PACKAGE_NOT_FOUND" })
        resolve(package)
      })
      .catch(err => reject({ message: "PACKAGE_NOT_FOUND" }))
  })
}

const updatePackageServices = async req => {
  return new Promise(async (resolve, reject) => {
    req.body.salonid = req.body.salonid ? req.body.salonid : req.user._id
    await Package.findOneAndUpdate(
      { _id: req.body.packageid },
      { ...req.body, servicesgroup: req.body.servicesgroup },
      { new: true, useFindAndModify: false }
    )
      .then(package => {
        if (!package) reject({ message: "PACKAGE_NOT_FOUND" })
        resolve(package)
      })
      .catch(err => reject({ message: "PACKAGE_NOT_FOUND" }))
  })
}

const updatePackageFinePrintServices = async req => {
  return new Promise(async (resolve, reject) => {
    req.body.salonid = req.body.salonid ? req.body.salonid : req.user._id
    await Package.findOneAndUpdate(
      { _id: req.body.packageid },
      {
        restriction: req.body.restriction,
        goodToKnow: req.body.goodToKnow,
      },
      { new: true, useFindAndModify: false }
    )
      .then(package => {
        if (!package) reject({ message: "PACKAGE_NOT_FOUND" })
        resolve(package)
      })
      .catch(err => reject({ message: "PACKAGE_NOT_FOUND" }))
  })
}

const updatePackageDistributionServices = async req => {
  return new Promise(async (resolve, reject) => {
    req.body.salonid = req.body.salonid ? req.body.salonid : req.user._id
    await Package.findOneAndUpdate(
      { _id: req.body.packageid },
      {
        isFeatured: req.body.isFeatured,
        sellServiceOnline: req.body.sellServiceOnline,
        appointmentleadTime: req.body.appointmentleadTime,
        "serviceAvailbility.monday": req.body.monday,
        "serviceAvailbility.tuesday": req.body.tuesday,
        "serviceAvailbility.wednesday": req.body.wednesday,
        "serviceAvailbility.thursday": req.body.thursday,
        " serviceAvailbility.friday": req.body.friday,
        "serviceAvailbility.saturday": req.body.saturday,
        "serviceAvailbility.sunday": req.body.sunday,
      },
      { new: true, useFindAndModify: false }
    )
      .then(package => {
        if (!package) reject({ message: "PACKAGE_NOT_FOUND" })
        resolve(package)
      })
      .catch(err => reject({ message: "PACKAGE_NOT_FOUND" }))
  })
}

module.exports = {
  addpackageServices,
  getpackageService,
  updatePackageServices,
  updatePackageDescriptionServices,
  updatePackageFinePrintServices,
  updatePackageDistributionServices,
}

