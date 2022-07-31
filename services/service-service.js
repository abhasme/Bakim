const { Service } = require("../models/ServiceModel")
const { ServiceGroup } = require("../models/ServiceGroupModel")
const { SalonServiceGroup } = require("../models/SalonServiceGroupModel")
const { SalonServices } = require("../models/SalonServiceModel")
var ObjectID = require("mongoose").Types.ObjectId
const Utility = require("../helpers/Utility")

const addServicesService = async req => {
  return new Promise(async (resolve, reject) => {
   //req.body.image = req.file.path ? req.file.path : ""
   if (req.file && req.file.path) {
    req.body.image = req.file.path ? req.file.path : "";
  }
    const query = new Service(req.body)
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

const updateServicesService = async req => {
  return new Promise(async (resolve, reject) => {
    await Service.findOne({ _id: req.body.serviceid })
      .then(async service => {
        if (req.file && req.file.path) {
          await Utility.removeFileFromPath(service.image)
          service.image = req.file.path
        }
        if (req.body.name) {
          service.name = req.body.name
        }
        if (req.body.description) {
          service.description = req.body.description
        }
        if (req.body.restriction) {
          service.restriction = req.body.restriction
        }
        if (req.body.goodToKnow) {
          service.goodToKnow = req.body.goodToKnow
        }
        if (req.body.categoryid) {
          service.categoryid = req.body.categoryid
        }
        return service.save()
      })
      .then(service => {
        resolve(service)
      })
  })
}

const getServicesService = async req => {
  return new Promise(async (resolve, reject) => {
    var { pagesize, page, sortBy } = await Utility.convertReqtoPaginate(
      req.query
    )
    var query = {}
    if (req.body.search) {
      query = { $or: [{ name: RegExp(req.query.search, "i") }] }
    }
    Service.aggregate([
      { $match: { isDeleted: false } },
      { $match: { active: true } },
      {
        $lookup: {
          from: "categories",
          localField: "categoryid",
          foreignField: "_id",
          as: "category",
        },
      },
      { $unwind: "$category" },
      {
        $project: {
          _id: 1,
          image: { $ifNull: ["$image", ""] },
          name: { $ifNull: ["$name", ""] },
          categoryid: { $ifNull: ["$category._id", ""] },
          categoryName: { $ifNull: ["$category.name", ""] },
          description: { $ifNull: ["$description", ""] },
          restriction: { $ifNull: ["$restriction", ""] },
          goodToKnow: { $ifNull: ["$goodToKnow", ""] },
          active: { $ifNull: ["$active", ""] },
          createdAt: { $ifNull: ["$createdAt", ""] },
          createdBy: { $ifNull: ["$createdBy", ""] },
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

const activeDeactiveServiceService = async req => {
  return new Promise(async (resolve, reject) => {
    req.body.active = req.body.active === "true" ? true : false
    Service.findOneAndUpdate(
      { _id: req.body.serviceid },
      { active: req.body.active },
      { new: true, useFindAndModify: false }
    )
      .then(service => {
        if (!service) reject({ message: "SERVICE_NOT_FOUND" })
        resolve(service)
      })
      .catch(err => reject({ message: "SERVICE_NOT_FOUND" }))
  })
}

const addServiceGroupService = async req => {
  return new Promise(async (resolve, reject) => {
    // req.body.image = req.file.path ? req.file.path : "";
    const query = new ServiceGroup(req.body)
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
    await ServiceGroup.findOne({ _id: req.body.servicegroupid })
      .then(async service => {
        // if (req.file && req.file.path) {
        //   service.image = req.file.path;
        // }
        if (req.body.name) {
          service.name = req.body.name
        }
        if (req.body.services) {
          service.services = req.body.services
        }
        return service.save()
      })
      .then(service => {
        resolve(service)
      })
  })
}

const activeDeactiveServiceGroupService = async req => {
  return new Promise(async (resolve, reject) => {
    ServiceGroup.findOneAndUpdate(
      { _id: req.body.servicegroupid },
      { active: req.body.active },
      { new: true, useFindAndModify: false }
    )
      .then(service => {
        if (!service) reject({ message: "SERVICE_NOT_FOUND" })
        resolve(service)
      })
      .catch(err => reject({ message: "SERVICE_NOT_FOUND" }))
  })
}

const getServiceGroupListService = async req => {
  return new Promise(async (resolve, reject) => {
    var { pagesize, page, sortBy } = await Utility.convertReqtoPaginate(
      req.query
    )
    var query = {}
    if (req.body.search) {
      query = {
        $or: [{ groupName: RegExp(req.query.search, "i") }],
      }
    }
    ServiceGroup.aggregate([
      { $match: { isDeleted: false } },
      { $match: { active: true } },
      {
        $lookup: {
          from: "services",
          localField: "services",
          foreignField: "_id",
          as: "service",
        },
      },
      {
        $project: {
          _id: 1,
          groupName: { $ifNull: ["$name", ""] },
          active: { $ifNull: ["$active", ""] },
          // serviceName: { $ifNull: ["$service.name", ""] },
          // serviceId: { $ifNull: ["$service._id", ""] },
          createdAt: { $ifNull: ["$createdAt", ""] },
          createdBy: { $ifNull: ["$createdBy", ""] },
          servicelist: {
            $map: {
              input: {
                $filter: {
                  input: "$service",
                  as: "servicesrow",
                  cond: "$$servicesrow.active",
                },
              },
              as: "servicesls",
              in: {
                name: "$$servicesls.name",
                serviceId: "$$servicesls._id",
              },
            },
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
      if (!results) reject({ message: "ERROR_DATA_RETRIVED" })
      resolve(results)
    })
  })
}

const salonServiceListService = async req => {
  return new Promise(async (resolve, reject) => {
    req.body.salonid = req.body.salonid ? req.body.salonid : req.user._id
    var query = {};
    if (req.body.categoryid) {
      query = { categoryid: ObjectID(req.body.categoryid) }
    } else {
      query = {}
    }
    var salonservices = await SalonServices.SalonServiceIDSArray(
      req.body.salonid
    )
    var salonPricingOptions = await SalonServices.SalonServicePricingOption(
      req.body.salonid
    )
    await ServiceGroup.aggregate([
      { $match: { isDeleted: false } },
      { $match: { active: true } },
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
          localField: "services",
          foreignField: "serviceid",
          pipeline: [{ $match: { salonid: ObjectID(req.body.salonid) } }],
          as: "salonservicesinfo",
        },
      },
      {
        $project: {
          _id: 1,
          name: { $ifNull: ["$name", ""] },
          categoryid: { $first: "$servicesinfo.categoryid" },
          data: {
            $map: {
              input: {
                $filter: {
                  input: "$servicesinfo",
                  as: "servicesrow",
                  cond: "$$servicesrow.active",
                },
              },
              as: "servicesls",
              in: {
                name:"$$servicesls.name",
                serviceid: "$$servicesls._id",
                services: {
                  $filter: {
                    input: salonPricingOptions,
                    as: "item",
                   // cond: { $eq: ["$$item.serviceid", "$$servicesls._id"] },
                    cond: { $and:[{$eq: ["$$item.serviceid", "$$servicesls._id"]},{$eq: ["$$item.active", true]}] },
                    
                  },
                },
                has_service: {
                  $in: ["$$servicesls._id", salonservices],
                },
              },
            },
          },
        },
      },
      { $match: query }
    ]).exec(async (err, results) => {
      if (err) reject({ message: err })
      if (!results) reject({ message: "ERROR_DATA_RETRIVED" })
      resolve(results)
    })
  })
}

const salonGropuAndServiceListService = async req => {
  return new Promise(async (resolve, reject) => {
    req.body.salonid = req.body.salonid ? req.body.salonid : req.user._id
    await SalonServiceGroup.aggregate([
      { $match: { salonid: ObjectID(req.body.salonid) } },
      {
        $lookup: {
          from: "salonservices",
          localField: "services",
          foreignField: "serviceid",
          pipeline: [{ $match: { salonid: ObjectID(req.body.salonid) } }],
          as: "servicesinfo",
        },
      },
      {
        $project: {
          _id: 1,
          name: { $ifNull: ["$name", ""] },
          services: {
            $map: {
              input: {
                $filter: {
                  input: "$servicesinfo",
                  as: "servicesrow",
                  cond: "$$servicesrow.active",
                },
              },
              as: "servicesls",
              in: {
                name: "$$servicesls.name",
                serviceid: "$$servicesls.serviceid",
                pricingOption: "$$servicesls.pricingOption",
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

const salonServiceGroupListService = async req => {
  return new Promise(async (resolve, reject) => {
    req.body.salonid = req.body.salonid ? req.body.salonid : req.user._id
    await SalonServiceGroup.aggregate([
      {
        $lookup: {
          from: "salonservices",
          localField: "services",
          foreignField: "serviceid",
          as: "servicesinfo",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          servicesinfo: {
            $map: {
              input: "$servicesinfo",
              as: "service",
              in: {
                name: "$$service.name",
                _id: "$$service.serviceid",
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

const addSalonServicePricingService = async req => {
  return new Promise(async (resolve, reject) => {
    req.body.salonid = req.body.salonid ? req.body.salonid : req.user._id
    var minDuratio = []
    var minPrice = []
    if (req.body.pricingOption) {
      const duration = req.body.pricingOption
      for await (const du of duration) {
        minDuratio.push(du.duration)
        minPrice.push(du.price)
      }
      var mD = Math.min(...minDuratio)
      var mP = Math.min(...minPrice)
      var maxP =Math.max(...minPrice)
    }
    const findservice = await SalonServices.findOne({
      salonid: ObjectID(req.body.salonid),
      serviceid: ObjectID(req.body.serviceid),
    })
    if (findservice) {
      await SalonServices.findOneAndUpdate(
        {
          salonid: ObjectID(req.body.salonid),
          serviceid: ObjectID(req.body.serviceid),
        },
        {
          ...req.body,
          minprice: mP,
          minduration: mD,
          maxprice:maxP,
        },
        { new: true, useFindAndModify: false }
      )
        .then(async result => {
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    } else {
      const query = new SalonServices({
        ...req.body,
        minprice: mP,
        minduration: mD,
      })
      query
        .save()
        .then(async result => {
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    }
  })
}

const salonServiceInfoService = async req => {
  return new Promise(async (resolve, reject) => {
    req.body.salonid = req.body.salonid ? req.body.salonid : req.user._id

    await SalonServices.aggregate([
      {
        $match: {
          $and: [
            { serviceid: ObjectID(req.body.serviceid) },
            { salonid: ObjectID(req.body.salonid) },
          ],
        },
      },
      { $limit: 1 },
      {
        $lookup: {
          from: "users",
          localField: "teams.teamid",
          foreignField: "_id",
          as: "teamInfo",
        },
      },
      {
        $lookup: {
          from: "discounts",
          localField: "discountid",
          foreignField: "_id",
          as: "discountInfo",
        },
      },
      {
        $lookup: {
          from: "services",
          localField: "serviceid",
          foreignField: "_id",
          as: "serviceInfo",
        },
      },
      {
        $project: {
          _id: 1,
          serviceid: 1,
          name: { $ifNull: ["$name", ""] },
          description: { $ifNull: ["$description", ""] },
          restriction: { $ifNull: ["$restriction", ""] },
          goodToKnow: { $ifNull: ["$goodToKnow", ""] },
          minprice: { $ifNull: ["$minprice", 0] },
          maxprice: { $ifNull: ["$maxprice", 0] },
          minduration: { $ifNull: ["$minduration", 0] },
          cleanUpTime: { $ifNull: ["$cleanUpTime", 0] },
          isFeatured: { $ifNull: ["$isFeatured", false] },
          active: { $ifNull: ["$active", false] },
          multipleService: { $ifNull: ["$multipleService", false] },
          sellServiceOnline: { $ifNull: ["$sellServiceOnline", false] },
          appointmentleadTime: { $ifNull: ["$appointmentleadTime", 0] },
          serviceAvailbility: { $ifNull: ["$serviceAvailbility", {}] },
          serviceName: { $ifNull: [{ $first: "$serviceInfo.name" }, ""] },
          discountid: 1,
          discountName: { $ifNull: [{ $first: "$discountInfo.name" }, ""] },
          pricingOption: { $ifNull: ["$pricingOption", []] },
          teamInfo: {
            $map: {
              input: "$teamInfo",
              as: "team",
              in: {
                name: "$$team.name",
                teamid: "$$team._id",
                teamMemberName: {
                  $concat: [
                    { $ifNull: ["$$team.firstName", ""] },
                    " ",
                    { $ifNull: ["$$team.lastName", ""] },
                  ],
                },
              },
            },
          },
        },
      },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err })
      if (!results) reject({ message: "ERROR_DATA_RETRIVED" })
      resolve(results[0])
    })
  })
}

const deleteServiceService = async req => {
  return new Promise(async (resolve, reject) => {
    // await Users.findOneAndUpdate(
    //   { "employeeDetail.assignedService.serviceid": req.body.serviceid },
    //   { "employeeDetail.assignedService.$.isDeleted": true, "employeeDetail.assignedService.$.deletedAt": new Date() },
    //   { new: true, useFindAndModify: false }
    // )
    // await Users.findOneAndUpdate(
    //   { "portfolio.serviceid": req.body.serviceid },
    //   { "portfolio.$.isDeleted": true, "portfolio.$.deletedAt": new Date() },
    //   { new: true, useFindAndModify: false }
    // )
    // await Users.findOneAndUpdate(
    //   { "rewiews.serviceid": req.body.serviceid },
    //   { "rewiews.$.isDeleted": true, "rewiews.$.deletedAt": new Date() },
    //   { new: true, useFindAndModify: false }
    // )
    // await Booking.findOneAndUpdate(
    //   { "services.serviceid": req.body.serviceid },
    //   { "services.$.isDeleted": true, "services.$.deletedAt": new Date() },
    //   { new: true, useFindAndModify: false }
    // )
    // await SalonServices.findOneAndUpdate(
    //   { serviceid: req.body.serviceid },
    //   { isDeleted: true, deletedAt: new Date() },
    //   { new: true, useFindAndModify: false }
    // )
    await ServiceGroup.updateMany(
      { services: ObjectID(req.body.serviceid) },
      { $pull: { services: ObjectID(req.body.serviceid) } }
    )
    await Service.findOneAndUpdate(
      { _id: req.body.serviceid },
      { isDeleted: true, deletedAt: new Date() },
      { new: true, useFindAndModify: false }
    )
      .then(service => {
        if (!service) reject({ message: "SERVICE_NOT_FOUND" })
        resolve(service)
      })
      .catch(err => reject({ message: "SERVICE_NOT_FOUND" }))
  })
}

const salonServiceDropDownService = async req => {
  return new Promise(async (resolve, reject) => {
    req.body.salonid = req.body.salonid ? req.body.salonid : req.user._id
    SalonServices.aggregate([
      { $match: { isDeleted: false, salonid: ObjectID(req.body.salonid) } },

      {
        $project: {
          serviceid: 1,
          name: { $ifNull: ["$name", ""] },
        },
      },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err })
      if (!results) reject({ message: "ERROR_DATA_RETRIVED" })
      resolve(results)
    })
  })
}

const updateServiceDescriptionServices = async req => {
  return new Promise(async (resolve, reject) => {
    req.body.salonid = req.body.salonid ? req.body.salonid : req.user._id
    await SalonServices.findOne({
      serviceid: req.body.salonserviceid,
      salonid: req.body.salonid,
    })
      .then(async service => {
        if (req.body.description) {
          service.description = req.body.description
        }
        return service.save()
      })
      .then(service => {
        resolve(service)
      })
  })
}

const updateServiceFinePrintServices = async req => {
  return new Promise(async (resolve, reject) => {
    req.body.salonid = req.body.salonid ? req.body.salonid : req.user._id
    await SalonServices.findOne({
      serviceid: req.body.salonserviceid,
      salonid: req.body.salonid,
    })
      .then(async service => {
        if (req.body.restriction || req.body.goodToKnow) {
          service.restriction = req.body.restriction
          service.goodToKnow = req.body.goodToKnow
        }
        return service.save()
      })
      .then(service => {
        resolve(service)
      })
  })
}

const updateServiceDistributionServices = async req => {
  return new Promise(async (resolve, reject) => {
    req.body.salonid = req.body.salonid ? req.body.salonid : req.user._id
    await SalonServices.findOne({
      serviceid: req.body.salonserviceid,
      salonid: req.body.salonid,
    })
      .then(async service => {
        service.isFeatured = req.body.isFeatured
        service.sellServiceOnline = req.body.sellServiceOnline
        service.appointmentleadTime = req.body.appointmentleadTime
        service.serviceAvailbility.monday = req.body.monday
        service.serviceAvailbility.tuesday = req.body.tuesday
        service.serviceAvailbility.wednesday = req.body.wednesday
        service.serviceAvailbility.thursday = req.body.thursday
        service.serviceAvailbility.friday = req.body.friday
        service.serviceAvailbility.saturday = req.body.saturday
        service.serviceAvailbility.sunday = req.body.sunday

        return service.save()
      })
      .then(service => {
        resolve(service)
      })
  })
}

const addMultipleSalonServicePriceService = async req => {
  return new Promise(async (resolve, reject) => {
    req.body.salonid = req.body.salonid ? req.body.salonid : req.user._id
    for await (const services of req.body.services) {
      const query = new SalonServices({
        ...services,
        salonid: req.body.salonid,
      })
      query
        .save()
        .then(async result => {
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    }
  })
}

const getServiceInfoService = async req => {
  return new Promise(async (resolve, reject) => {
    Service.aggregate([
      { $match: { _id: ObjectID(req.body.serviceid) } },
      {
        $lookup: {
          from: "categories",
          localField: "categoryid",
          foreignField: "_id",
          as: "categoryInfo",
        },
      },
      { $unwind: "$categoryInfo" },
      {
        $project: {
          _id: 1,
          name: { $ifNull: ["$name", ""] },
          categoryid: { $ifNull: ["$categoryInfo.name", ""] },
          description: { $ifNull: ["$description", ""] },
          restriction: { $ifNull: ["$restriction", ""] },
          goodToKnow: { $ifNull: ["$goodToKnow", ""] },
          active: { $ifNull: ["$active", ""] },
          createdAt: { $ifNull: ["$createdAt", ""] },
          isDeleted: { $ifNull: ["$isDeleted", ""] },
        },
      },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err })
      if (!results) reject({ message: "ERROR_DATA_RETRIVED" })
      resolve(results)
    })
  })
}

const getServiceGroupinfoService = async req => {
  return new Promise(async (resolve, reject) => {
    ServiceGroup.aggregate([
      { $match: { _id: ObjectID(req.body.servicegroupid) } },
      {
        $lookup: {
          from: "services",
          localField: "services",
          foreignField: "_id",
          as: "serviceInfo",
        },
      },
      {
        $project: {
          _id: 1,
          name: { $ifNull: ["$name", ""] },
          serviceName: { $ifNull: ["$serviceInfo.name", ""] },
          active: { $ifNull: ["$active", ""] },
          createdAt: { $ifNull: ["$createdAt", ""] },
          isDeleted: { $ifNull: ["$isDeleted", ""] },
        },
      },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err })
      if (!results) reject({ message: "ERROR_DATA_RETRIVED" })
      resolve(results)
    })
  })
}
const salonServiceListByIdService = async req => {
  return new Promise(async (resolve, reject) => {
    req.body.salonid = req.body.salonid ? req.body.salonid : req.user._id
    var salonservices = await SalonServices.SalonServiceIDSArray(
      req.body.salonid
    )
    var salonPricingOptions = await SalonServices.SalonServicePricingOption(
      req.body.salonid
    )
    await ServiceGroup.aggregate([
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
          localField: "services",
          foreignField: "serviceid",
          pipeline: [{ $match: { salonid: ObjectID(req.body.salonid) } }],
          as: "salonservicesinfo",
        },
      },
      {
        $project: {
          _id: 1,
          name: { $ifNull: ["$name", ""] },
          data: {
            $map: {
              input: {
                $filter: {
                  input: "$servicesinfo",
                  as: "servicesrow",
                  cond: "$$servicesrow.active",
                },
              },
              as: "servicesls",
              in: {
                name: "$$servicesls.name",
                serviceid: "$$servicesls._id",

                services: {
                  $filter: {
                    input: salonPricingOptions,
                    as: "item",
                    cond: { $eq: ["$$item.serviceid", "$$servicesls._id"] },
                  },
                },

                has_service: {
                  $in: ["$$servicesls._id", salonservices],
                },
              },
            },
          },
        },
      },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err })
      if (!results) reject({ message: "ERROR_DATA_RETRIVED" })
      var groupdata = []
      var results =
        results &&
        results.map(async item => {
          var servicedata = []
          item &&
            item.data.map(async itemrow => {
              var pricingOption = []
              itemrow &&
                itemrow.services.map(async pricing => {
                  pricingOption = pricing.pricingOption
                })
              var list = {
                serviceid: itemrow.serviceid,
                name: itemrow.name,
                has_service: itemrow.has_service,
                pricingOption: pricingOption,
              }
              servicedata.push(list)
            })
          var group = {
            _id: item._id,
            name: item.name,
            data: servicedata,
          }
          groupdata.push(group)
        })
      resolve(groupdata)
    })
  })
}

const deleteServiceGroupService = async req => {
  return new Promise(async (resolve, reject) => {
    // await ServiceGroup.findOneAndUpdate(
    //   { _id: ObjectID(req.body.servicegroupid) },
    //   { $pull: { "services": ObjectID(req.body.servicegroupid) } },
    // )
    await ServiceGroup.findOneAndUpdate(
      { _id: ObjectID(req.body.servicegroupid) },
      { isDeleted: true, deletedAt: new Date() },
      { new: true, useFindAndModify: false }
    )
      .then(servicegroup => {
        if (!servicegroup) reject({ message: "SERVICEGROUP_NOT_FOUND" })
        resolve(servicegroup)
      })
      .catch(err => reject({ message: "SERVICEGROUP_NOT_FOUND" }))
  })
}


const updateSalonServiceService = async req => {
  return new Promise(async (resolve, reject) => {
    SalonServices.findOneAndUpdate(
      { serviceid: req.body.serviceid },
      { active: req.body.active },
      { new: true, useFindAndModify: false }
    )
      .then(service => {
        if (!service) reject({ message: "SERVICE_NOT_FOUND" })
        resolve(service)
      })
      .catch(err => reject({ message: "SERVICE_NOT_FOUND" }))
  })
}

module.exports = {
  addServicesService,
  updateServicesService,
  getServicesService,
  activeDeactiveServiceService,
  addServiceGroupService,
  updateServiceGroupService,
  getServiceGroupListService,
  salonServiceListService,
  salonGropuAndServiceListService,
  addSalonServicePricingService,
  salonServiceInfoService,
  deleteServiceService,
  salonServiceDropDownService,
  updateServiceDescriptionServices,
  updateServiceFinePrintServices,
  updateServiceDistributionServices,
  salonServiceGroupListService,
  addMultipleSalonServicePriceService,
  activeDeactiveServiceGroupService,
  getServiceInfoService,
  getServiceGroupinfoService,
  salonServiceListByIdService,
  deleteServiceGroupService,
  updateSalonServiceService
}
