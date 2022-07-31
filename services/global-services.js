const { Category } = require('../models/CategoryModel');
const { Service } = require('../models/ServiceModel');
const { Users } = require('../models/UserModel');
const { Membership } = require('../models/MembershipModel');
var ObjectID = require('mongoose').Types.ObjectId

const topCategoryListService = async (req) => {
  return new Promise(async (resolve, reject) => {
    Category.aggregate([
      { $match: { active: true } },
      {
        $project: {
          _id: 1,
          name: { $ifNull: ["$name", ""] },
          thumbnail: { $ifNull: ["$thumbnail", ""] },
          servicecount: { $ifNull: ["$servicecount", ""] },
          image: { $ifNull: ["$image", ""] },
          createdAt: { $ifNull: ["$createdAt", ""] },
        },
      },
      { $sort: { servicecount: -1 } },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err });
      if (!results) reject({ message: "ERROR_DATA_RETRIVED" });
      resolve(results);
    });
  });
};

const getAllServiceListService = async (req) => {
  return new Promise(async (resolve, reject) => {
    Service.aggregate([
      { $match: { isDeleted: false } },
      { $match: { active: true } },
      {
        $project: {
          _id: 1,
          name: { $ifNull: ["$name", ""] },
        },
      },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err });
      if (!results) reject({ message: "ERROR_DATA_RETRIVED" });
      resolve(results);
    });
  });
};

const getAllCategoryListService = async (req) => {
  return new Promise(async (resolve, reject) => {
    Category.aggregate([
      { $match: { isDeleted: false } },
      { $match: { active: true } }, {
        $project: {
          _id: 1,
          name: { $ifNull: ["$name", ""] },
        },
      },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err });
      if (!results) reject({ message: "ERROR_DATA_RETRIVED" });
      resolve(results);
    });
  });
};

const getAllSalonListService = async (req) => {
  return new Promise(async (resolve, reject) => {
    Users.aggregate([
      { $match: { active: true, userType: "Salon" } },
      {
        $project: {
          _id: 1,
          salonName: { $ifNull: ["$salonDetail.salonName", ""] },
        },
      },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err });
      if (!results) reject({ message: "ERROR_DATA_RETRIVED" });
      resolve(results);
    });
  });
};

const getAllMembershipPlanListService = async (req) => {
  return new Promise(async (resolve, reject) => {
    Membership.aggregate([
      { $match: { isDeleted: false } },
      { $match: { active: true } }, {
        $project: {
          _id: 1,
          planName: { $ifNull: ["$planName", ""] },
        },
      },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err });
      if (!results) reject({ message: "ERROR_DATA_RETRIVED" });
      resolve(results);
    });
  });
};

const getAllUserListService = async (req) => {
  return new Promise(async (resolve, reject) => {
    Users.aggregate([
      { $match: { active: true, userType: "User" } },
      {
        $project: {
          _id: 1,
          userName: { $concat: [{ $ifNull: ["$firstName", ""] }, " ", { $ifNull: ["$lastName", ""] },], },
        },
      },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err });
      if (!results) reject({ message: "ERROR_DATA_RETRIVED" });
      resolve(results);
    });
  });
};

module.exports = {
  topCategoryListService,
  getAllServiceListService,
  getAllCategoryListService,
  getAllSalonListService,
  getAllMembershipPlanListService,
  getAllUserListService,
};