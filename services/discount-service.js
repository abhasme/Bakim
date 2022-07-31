const { Discount } = require("../models/DiscountModel")
const { SalonServices } = require("../models/SalonServiceModel")
const { ServiceGroup } = require("../models/ServiceGroupModel")
var ObjectID = require("mongoose").Types.ObjectId
const Utility = require("../helpers/Utility")

const addSalonDiscountService = req => {
  return new Promise(async (resolve, reject) => {
    req.body.salonid = req.body.salonid ? req.body.salonid : req.user._id
    const query = new Discount({ ...req.body, salonid: req.body.salonid })
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

const getSalonDiscountService = async req => {
  return new Promise(async (resolve, reject) => {
    req.body.salonid = req.body.salonid ? req.body.salonid : req.user._id
    Discount.aggregate([
      { $match: { salonid: ObjectID(req.body.salonid) } },
      { $match: { isDeleted: false } },
      {
        $project: {
          _id: 1,
          name: { $ifNull: ["$name", ""] },
          active: { $ifNull: ["$active", false] },
          generalDiscount: { $ifNull: ["$general.enableDiscount", false] },
          lastMinuteDiscount: {
            $ifNull: ["$lastMinute.enableDiscount", false],
          },
          offPicDiscount: { $ifNull: ["$offPic.enableDiscount", false] },
          services: { $size: "$services" },
        },
      },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err })
      if (!results) reject({ message: "ERROR_DATA_RETRIVED" })
      resolve(results)
    })
  })
}

const addSalonDiscountServiceService = async req => {
  return new Promise(async (resolve, reject) => {
    Discount.findByIdAndUpdate(
      { _id: ObjectID(req.body.discountid) },
      {
        ...req.body,
      },
      { new: true, useFindAndModify: false }
    )
      .then(service => {
        if (!service) reject({ message: "DISCOUNT_NOT_FOUND" })
        resolve(service)
      })
      .catch(err => reject({ message: "DISCOUNT_NOT_FOUND" }))
  })
}

const getSalonDiscountInfoService = async req => {
  return new Promise(async (resolve, reject) => {
    req.body.salonid = req.body.salonid ? req.body.salonid : req.user._id
    var salonservices = await SalonServices.SalonServiceIDSArray(
      req.body.salonid
    )
    Discount.aggregate([
      { $match: { _id: ObjectID(req.query.discountid) } },
      { $match: { isDeleted: false } },
      {
        $project: {
          _id: 1,
          name: { $ifNull: ["$name", ""] },
          general: { $ifNull: ["$general", {}] },
          lastMinute: { $ifNull: ["$lastMinute", {}] },
          offPic: { $ifNull: ["$offPic", {}] },
          monday: { $ifNull: ["$monday", {}] },
          tuesday: { $ifNull: ["$tuesday", {}] },
          wednesday: { $ifNull: ["$wednesday", {}] },
          thursday: { $ifNull: ["$thursday", {}] },
          friday: { $ifNull: ["$friday", {}] },
          saturday: { $ifNull: ["$saturday", {}] },
          sunday: { $ifNull: ["$sunday", {}] },
        },
      },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err })
      if (!results) reject({ message: "ERROR_DATA_RETRIVED" })
      resolve(results)
    })
  })
}

const getSalonDiscountServiceInfoService = async req => {
  return new Promise(async (resolve, reject) => {
    req.body.salonid = req.body.salonid ? req.body.salonid : req.user._id
    var serviceids
    if (req.query.discountid) {
      var discountervices = await Discount.SalonDiscountInfo(
        req.query.discountid
      )
      serviceids = discountervices.services.map(data => data.serviceid)
    } else {
      serviceids = []
    }
    var salonservices = await SalonServices.SalonServiceIDSArray(
      req.body.salonid
    )
    await ServiceGroup.aggregate([
      { $match: { services: { $in: salonservices } } },
      {
        $lookup: {
          from: "services",
          localField: "services",
          foreignField: "_id",
          as: "servicesinfo",
        },
      },
      {
        $lookup: {
          from: "salonservices",
          localField: "servicesinfo._id",
          foreignField: "serviceid",
          as: "servicesinfo1",
        },
      },
      {
        $project: {
          _id: 1,
          name: { $ifNull: ["$name", ""] },
          servicelist: {
            $map: {
              input: {
                $filter: {
                  input: "$servicesinfo1",
                  as: "servicesrow",
                  cond: "$$servicesrow.active",
                },
              },
              as: "servicesls",
              in: {
                _id: "$$servicesls._id",
                name: "$$servicesls.name",
                serviceid: "$$servicesls.serviceid",
                has_service: {
                  $in: ["$$servicesls.serviceid", serviceids],
                },
              },
            },
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
const deleteDiscountServices = async (req) => {
  return new Promise(async (resolve, reject) => {
    Discount.findByIdAndDelete(req.body.discountid).then(service => {
      if (!service) reject({ message: "DISCOUNT_NOT_FOUND" })
      resolve(service)
    })
      .catch(err => reject({ message: "DISCOUNT_NOT_FOUND" }))
  })
}

module.exports = {
  addSalonDiscountService,
  getSalonDiscountService,
  addSalonDiscountServiceService,
  getSalonDiscountInfoService,
  getSalonDiscountServiceInfoService,
  deleteDiscountServices,
}
