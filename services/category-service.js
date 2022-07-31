const { Category } = require("../models/CategoryModel");
const { Service } = require("../models/ServiceModel");
const { SalonServices } = require("../models/SalonServiceModel");
var ObjectID = require("mongoose").Types.ObjectId;
const Utility = require('../helpers/Utility')

const createCategoryServices = (req) => {
  return new Promise(async (resolve, reject) => {
    var imageName;
    req.files.image.map((file) => {
      imageName = file.path;
    });
    req.files.thumbnail.map((file) => {
      thumbnailName = file.path;
    });
    req.body.image = imageName;
    req.body.thumbnail = thumbnailName;
    const query = new Category(req.body);
    query
      .save()
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

const updateCategoryServices = async (req) => {
  return new Promise(async (resolve, reject) => {
    await Category.findOne({ _id: req.body.categoryid })
      .then(async (category) => {
        if (req.body.name) {
          category.name = req.body.name;
        }
        if (req.files.image) {
          await Utility.removeFileFromPath(category.image)
          req.files.image.map((file) => {
            imageName = file.path;
          });
          category.image = imageName;
        }
        if (req.files.thumbnail) {
          await Utility.removeFileFromPath(category.thumbnail)
          req.files.thumbnail.map((file) => {
            thumbnailName = file.path;
          });
          category.thumbnail = thumbnailName;
        }
        return category.save();
      })
      .then((category) => {
        resolve(category);
      });
  });
};

const headerMenuListService = async (req) => {
  return new Promise(async (resolve, reject) => {
    Category.aggregate([
      { $match: { isDeleted: false } },
      { $match: { active: true } },
      {
        $lookup: {
          from: "services",
          localField: "_id",
          foreignField: "categoryid",
          pipeline: [{ $match: { isDeleted: false, active: true } }],
          as: "serviceinfo",
        },
      },
      {
        $project: {
          _id: 1,
          name: { $ifNull: ["$name", ""] },
          services: { $ifNull: ["$serviceinfo", []] },
        },
      },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err });
      if (!results)
        reject({
          message: "Category Not Found",
        });
      resolve(results);
    });
  });
};

const getCategoryService = async (req) => {
  return new Promise(async (resolve, reject) => {
    var { pagesize, page, sortBy } = await Utility.convertReqtoPaginate(req.query)
    var query = {};
    if (req.query.search) {
      query = { $or: [{ name: RegExp(req.query.search, "i") }] };
    }
    Category.aggregate([
      { $match: { isDeleted: false } },
      { $match: { active: true } },
      {
        $lookup:
        {
          from: "services",
          localField: "_id",
          foreignField: "categoryid",
          as: "categoryInfo"
        }
      },
      {
        $project: {
          _id: 1,
          name: { $ifNull: ["$name", ""] },
          image: { $ifNull: ["$image", ""] },
          thumbnail: { $ifNull: ["$thumbnail", ""] },
          active: { $ifNull: ["$active", ""] },
          createdAt: { $ifNull: ["$createdAt", ""] },
          createdBy: { $ifNull: ["$createdBy", ""] },
          servicecount: { $size: "$categoryInfo.categoryid" },
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
      if (err) reject({ message: err });
      if (!results) reject({ message: "ERROR_DATA_RETRIVED" });
      resolve(results);
    });
  });
};

/*========= Category Active Deactive ==============*/
const activeDeactiveCategoryService = async (req) => {
  return new Promise(async (resolve, reject) => {
    Category.findOneAndUpdate(
      { _id: req.body.categoryid },
      { $set: { active: req.body.active === "true" ? true : false } },
      { new: true, useFindAndModify: false }
    )
      .then((category) => {
        if (!category) reject({ message: "CATEGORY_NOT_FOUND" });
        resolve(category);
      })
      .catch((err) => reject({ message: "CATEGORY_NOT_FOUND" }));
  });
};

const categoryDeleteServices = async (req) => {
  return new Promise(async (resolve, reject) => {
    await Service.updateMany(
      { categoryid: req.body.categoryid },
      { $set: { isDeleted: true, deletedAt: new Date() } },
      { new: true, useFindAndModify: false }
    )
    await Category.findOneAndUpdate(
      { _id: req.body.categoryid },
      { isDeleted: true, deletedAt: new Date() },
      { new: true, useFindAndModify: false }
    )
      .then((category) => {
        if (!category) reject({ message: "CATEGORY_NOT_FOUND" });
        resolve(category);
      })
      .catch((err) => reject({ message: "CATEGORY_NOT_FOUND" }));
  });
};

const getCategoryInfoService = async (req) => {
  return new Promise(async (resolve, reject) => {
    Category.aggregate([
      { $match: { _id: ObjectID(req.body.categoryid) } },
      {
        $project: {
          _id: 1,
          name: { $ifNull: ["$name", ""] },
          image: { $ifNull: ["$image", ""] },
          thumbnail: { $ifNull: ["$thumbnail", ""] },
          active: { $ifNull: ["$active", ""] },
          createdAt: { $ifNull: ["$createdAt", ""] },
          isDeleted: { $ifNull: ["$isDeleted", ""] },
        },
      },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err });
      if (!results) reject({ message: "ERROR_DATA_RETRIVED" });
      resolve(results);
    });
  });
};

const categoryListService = async (req) => {
  return new Promise(async (resolve, reject) => {
    Category.aggregate([
      { $match: {} },
      {
        $project: {
          _id: 1,
          name: { $ifNull: ["$name", ""] },
          image: { $ifNull: ["$image", ""] }
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
  createCategoryServices,
  headerMenuListService,
  updateCategoryServices,
  getCategoryService,
  activeDeactiveCategoryService,
  categoryDeleteServices,
  getCategoryInfoService,
  categoryListService
};
