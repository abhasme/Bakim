const { Category } = require('../../models/CategoryModel');
var ObjectID = require('mongoose').Types.ObjectId

const createCategoryServices = (req) => {
  return new Promise(async (resolve, reject) => {
    const query = new Category(req.body)
    query.save().then((result) => {
      resolve(result)
    }).catch((err) => {
      reject(err)
    });
  })
}
  module.exports = {
    createCategoryServices,
  };