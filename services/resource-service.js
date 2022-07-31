const { Resource } = require("../models/ResourceModel");
const { ServiceGroup } = require("../models/ServiceGroupModel")
const { SalonServiceGroup } = require("../models/SalonServiceGroupModel")
const ObjectID = require("mongoose").Types.ObjectId;
const Utility = require("../helpers/Utility");

const addResourcesServices = async (req) => {
  return new Promise(async (resolve, reject) => {
    req.body.salonid = req.body.salonid ? req.body.salonid : req.user._id;
    const query = new Resource(req.body);
    query.save()
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

const getResourcesService = async (req) => {
  return new Promise(async (resolve, reject) => {
    var salonid = req.body.salonid ? req.body.salonid : req.user._id;
    Resource.aggregate([
      { $match: { salonid: ObjectID(salonid) } },
      { $match: { isDeleted: false } },
      {
        $project: {
          name: { $ifNull: ["$name", ""] },
          quantity: { $ifNull: ["$quantity", ""] },
          services: { $size: "$services" },
        },
      },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err });
      if (!results)
        reject({
          message: "RESOURCE_NOT_FOUND",
        });
      resolve(results);
    });
  });
};

const getResourcesInfoService = async (req) => {
  return new Promise(async (resolve, reject) => {
    req.body.salonid = req.body.salonid ? req.body.salonid : req.user._id;
    var resourceInfo = await Resource.SalonResourceInfo(req.body.resourceid, req.body.salonid)
    var resouceCheck = await Resource.find({
      _id: resourceInfo._id,
      isDeleted: false,
    })
    if (resouceCheck.length === 0) {
      resolve({ message: "ERROR_DATA_RETRIVED" })
    } else {
      var serviceids = resourceInfo.services.map(data => data.serviceid)
      await SalonServiceGroup.aggregate([
        {
          $lookup: {
            from: "salonservices",
            localField: "services",
            foreignField: "serviceid",
            as: "servicesinfo"
          }
        },
        {
          $project: {
            _id: 1,
            name: { $ifNull: ["$name", ""] },
            servicelist: {
              $map: {
                input: {
                  $filter: {
                    input: "$servicesinfo",
                    as: "servicesrow",
                    cond: "$$servicesrow.active"
                  }
                },
                as: "servicesls",
                in: {
                  name: "$$servicesls.name",
                  serviceid: "$$servicesls.serviceid",
                  has_service: {
                    $in: ["$$servicesls.serviceid", serviceids]
                  },
                }
              }
            }
          },
        },
      ]).exec(async (err, results) => {
        if (err) reject({ message: err });
        if (!resourceInfo) reject({ message: "ERROR_DATA_RETRIVED" });
        var data = {
          _id: resourceInfo._id,
          name: resourceInfo.name,
          quantity: resourceInfo.quantity,
          groupservice: results,
        }
        resolve(data);
      });
    }
  });
};

const getServiceSalonResourcesService = async (req) => {
  return new Promise(async (resolve, reject) => {
    req.body.salonid = req.body.salonid ? req.body.salonid : req.user._id;
    var resourceInfo = await Resource.SalonResourceInfo(req.body.salonid)
    var resouceCheck = await Resource.find({
      _id: resourceInfo._id,
      isDeleted: false,
    })
    if (resouceCheck.length === 0) {
      resolve({ message: "ERROR_DATA_RETRIVED" })
    } else {
      var serviceids = resourceInfo.services.map(data => data.serviceid)
      await ServiceGroup.aggregate([
        {
          $lookup: {
            from: "services",
            localField: "services",
            foreignField: "_id",
            as: "servicesinfo"
          }
        },
        {
          $project: {
            _id: 1,
            name: { $ifNull: ["$name", ""] },
            servicelist: {
              $map: {
                input: {
                  $filter: {
                    input: "$servicesinfo",
                    as: "servicesrow",
                    cond: "$$servicesrow.active"
                  }
                },
                as: "servicesls",
                in: {
                  name: "$$servicesls.name",
                  serviceid: "$$servicesls._id",
                  has_service: {
                    $in: ["$$servicesls._id", serviceids]
                  },
                }
              }
            }
          },
        },
      ]).exec(async (err, results) => {
        if (err) reject({ message: err });
        if (!resourceInfo) reject({ message: "ERROR_DATA_RETRIVED" });
        var data = {
          _id: resourceInfo._id,
          name: resourceInfo.name,
          //services : resourceInfo.services,
          quantity: resourceInfo.quantity,
          groupservice: results,
        }
        resolve(data);
      });
    }
  });
};

const updateResourcesService = async (req) => {
  return new Promise(async (resolve, reject) => {
    Resource.findOneAndUpdate(
      { _id: ObjectID(req.body.resourceid) },
      {
        name: req.body.name,
        salonid: req.body.salonid,
        quantity: req.body.quantity,
        services: req.body.services,
      },
      { new: true, useFindAndModify: false }
    )
      .then((result) => {
        if (!result) reject({ message: "RESOURCE_NOT_FOUND" });
        resolve(result);
      })
      .catch((err) => reject({ message: "RESOURCE_NOT_FOUND" }));
  });
}

const deleteResourcesService = async (req) => {
  return new Promise(async (resolve, reject) => {
    await Resource.findOneAndUpdate(
      { _id: req.body.resourceid },
      { isDeleted: true },
      { new: true, useFindAndModify: false }
    )
      .then((resource) => {
        if (!resource) reject({ message: "RESOURCE_NOT_FOUND" });
        resolve(resource);
      })
      .catch((err) => reject({ message: "RESOURCE_NOT_FOUND" }));
  });
};

module.exports = {
  addResourcesServices,
  getResourcesService,
  getResourcesInfoService,
  updateResourcesService,
  deleteResourcesService,
  getServiceSalonResourcesService
};
