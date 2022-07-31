const { Membership } = require('../../models/MembershipModel');
var ObjectID = require('mongoose').Types.ObjectId

const createMembershipServices = (req) => {
  return new Promise(async (resolve, reject) => {
    const query = new Membership(req.body)
    query.save().then((result) => {
      resolve(result)
    }).catch((err) => {
      reject(err)
    });
  })
}
  module.exports = {
    createMembershipServices,
  };