const { SalonServiceGroup } = require("../models/SalonServiceGroupModel")
const { Package } = require("../models/PackageModel")
var ObjectID = require("mongoose").Types.ObjectId
const Utility = require("../helpers/Utility")

const addsalonServiceGroupService = async req => {
  return new Promise(async (resolve, reject) => {
    req.body.salonid = req.body.salonid ? req.body.salonid : req.user._id
    const query = new SalonServiceGroup({
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

const updateServiceGroupService = async req => {
  return new Promise(async (resolve, reject) => {
    req.body.salonid = req.body.salonid ? req.body.salonid : req.user._id
    const checkGroup = await SalonServiceGroup.findOne({
      groupid: ObjectID(req.body.groupid),
      salonid: req.body.salonid,
    })
    if (checkGroup) {
      await SalonServiceGroup.findOneAndUpdate(
        { groupid: ObjectID(req.body.groupid), salonid: req.body.salonid },
        { $push: { services: req.body.services } },
        { new: true, useFindAndModify: false }
      )
        .then(async services => {
          if (!services) reject({ message: "GROUP_NOT_FOUND" })
          resolve(services)
        })
        .catch(err => {
          reject({ message: err })
        })
    } else {
      const query = new SalonServiceGroup({
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
    }
  })
}

const updateServiceGroupNameService = async req => {
  return new Promise(async (resolve, reject) => {
    req.body.salonid = req.body.salonid ? req.body.salonid : req.user._id
    await SalonServiceGroup.findOne({
      _id: ObjectID(req.body.servicegroupid),
      salonid: ObjectID(req.body.salonid),
    })
      .then(async group => {
        if (req.body.name) {
          group.name = req.body.name
        }
        return group.save()
      })
      .then(group => {
        resolve(group)
      })
  })
}

const serviceGroupListService = async req => {
  return new Promise(async (resolve, reject) => {
    req.body.salonid = req.body.salonid ? req.body.salonid : req.user._id
    var query = {}
    var serviceids
    if (req.body.groupid) {
      query = { $or: [{ _id: ObjectID(req.body.groupid) }] }
    } else {
      query = { $or: [{}] }
    }
    if (req.body.packageid) {
      var packageInfo = await Package.SalonPackageInfo(
        req.body.packageid,
        req.body.salonid
      )
      serviceids = packageInfo.servicesgroup.map(data => data.pricingOptionid)
    } else {
      serviceids = []
    }
    SalonServiceGroup.aggregate([
      {
        $lookup: {
          from: "salonservices",
          localField: "services",
          foreignField: "serviceid",
          as: "serviceInfo",
        },
      },
      {
        $project: {
          _id: 1,
          groupName: { $ifNull: ["$name", ""] },
          service: {
            $map: {
              input: {
                $filter: {
                  input: "$serviceInfo",
                  as: "serviceInforow",
                  cond: "$$serviceInforow.active",
                },
              },
              as: "services",
              in: {
                serviceName: "$$services.name",
                serviceid: "$$services.serviceid",
                price: {
                  $map: {
                    input: {
                      $filter: {
                        input: "$$services.pricingOption",
                        as: "pricingOptionrow",
                        cond: "$$pricingOptionrow.active",
                      },
                    },
                    as: "prices",
                    in: {
                      name: "$$prices.name",
                      _id: "$$prices._id",
                      duration: "$$prices.duration",
                      price: "$$prices.price",
                      saleprice: "$$prices.saleprice",

                      has_service: {
                        $in: ["$$prices._id", serviceids],
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      { $match: query },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err })
      if (!results) reject({ message: "ERROR_DATA_RETRIVED" })
      if (req.body.groupid) {
        resolve(results[0])
      } else {
        resolve(results)
      }
    })
  })
}
module.exports = {
  addsalonServiceGroupService,
  updateServiceGroupService,
  updateServiceGroupNameService,
  serviceGroupListService,
}
