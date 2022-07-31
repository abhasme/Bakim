var ObjectID = require("mongoose").Types.ObjectId
const Utility = require("../helpers/Utility")
const { Product } = require("../models/ProductModel")
const { Voucher } = require("../models/VoucherModel")

const addProductServices = req => {
  return new Promise(async (resolve, reject) => {
    req.body.salonid = req.body.salonid ? req.body.salonid : req.user._id
    const query = new Product(req.body)
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

const updateProductServices = req => {
  return new Promise(async (resolve, reject) => {
    Product.findOneAndUpdate(
      { _id: req.body.productid },
      {
        $set: {
          name: req.body.name,
          price: req.body.price,
          stock: req.body.stock,
        },
      },
      { new: true, useFindAndModify: false }
    )
      .then(user => {
        if (!user) reject({ message: "PRODUCT_NOT_FOUND" })
        resolve(user)
      })
      .catch(err => reject({ message: "PRODUCT_NOT_FOUND" }))
  })
}

const getProductService = async req => {
  return new Promise(async (resolve, reject) => {
    var salonid = req.body.salonid ? req.body.salonid : req.user._id;
    var query = {}
    if (req.body.productid) {
      query = { _id: ObjectID(req.body.productid) }
    } else if (req.body.search) {
      query = { name: RegExp(req.body.search, "i") }
    }
    Product.aggregate([
      { $match: { salonid: ObjectID(salonid), isDeleted: false } },
      {
        $project: {
          _id: 1,
          name: { $ifNull: ["$name", ""] },
          price: { $ifNull: ["$price", 0] },
          stock: { $ifNull: ["$stock", 0] },
          manageInventory: { $ifNull: ["$manageInventory", ""] },
          active: { $ifNull: ["$active", true] },
          createdAt: { $ifNull: ["$createdAt", ""] },
        },
      },
      { $match: query },

    ]).exec(async (err, results) => {
      if (err) reject({ message: err });
      if (!results)
        reject({
          message: "Product Not Found",
        });
      resolve(results);
    });
  })
}

const deleteProductServices = async req => {
  return new Promise(async (resolve, reject) => {
    await Product.findOneAndUpdate(
      { _id: req.body.productid },
      { isDeleted: true },
      { new: true, useFindAndModify: false }
    )
      .then(category => {
        if (!category) reject({ message: "product not found." })
        resolve(category)
      })
      .catch(err => reject({ message: "product not found." }))
  })
}

/*================ Voucher Controller ================*/
const getVoucherService = async req => {
  return new Promise(async (resolve, reject) => {
    var salonid = req.body.salonid ? req.body.salonid : req.user._id
    var query = {}
    if (req.body.voucherid) {
      query = { _id: ObjectID(req.body.voucherid) }
    } else if (req.body.search) {
      query = { name: RegExp(req.body.search, "i") }
    }
    Voucher.aggregate([
      { $match: { salonid: ObjectID(salonid), isDeleted: false } },
      {
        $project: {
          _id: 1,
          code: { $ifNull: ["$code", ""] },
          stock: { $ifNull: ["$stock", 0] },
          price: { $ifNull: ["$price", 0] },
          discount: { $ifNull: ["$discount", 0] },
          startDate: { $substr: ["$startDate", 0, 10] },
          endDate: { $substr: ["$endDate", 0, 10] },
          active: { $ifNull: ["$active", true] },
          createdAt: { $ifNull: ["$createdAt", ""] },
          name: { $ifNull: ["$name", ""] },
        },
      },
      { $match: query },
      { $sort: { _id: -1 } },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err })
      if (!results)
        reject({
          message: "VOUCHER_NOT_FOUND",
        })
      resolve(results)
    })
  })
}

const addVoucherServices = req => {
  return new Promise(async (resolve, reject) => {
    req.body.salonid = req.body.salonid ? req.body.salonid : req.user._id
    const query = new Voucher(req.body)
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

const updateVoucherServices = req => {
  return new Promise(async (resolve, reject) => {
    Voucher.findOneAndUpdate(
      { _id: req.body.voucherid },
      { $set: req.body },
      { new: true, useFindAndModify: false }
    )
      .then(user => {
        if (!user) reject({ message: "VOUCHER_NOT_FOUND" })
        resolve(user)
      })
      .catch(err => reject({ message: "VOUCHER_NOT_FOUND" }))
  })
}

const deleteVoucherServices = async req => {
  return new Promise(async (resolve, reject) => {
    await Voucher.findOneAndUpdate(
      { _id: req.body.voucherid },
      { isDeleted: true },
      { new: true, useFindAndModify: false }
    )
      .then(category => {
        if (!category) reject({ message: "VOUCHER_NOT_FOUND" })
        resolve(category)
      })
      .catch(err => reject({ message: "VOUCHER_NOT_FOUND" }))
  })
}

module.exports = {
  getProductService,
  updateProductServices,
  addProductServices,
  deleteProductServices,
  addVoucherServices,
  updateVoucherServices,
  getVoucherService,
  deleteVoucherServices,
}
