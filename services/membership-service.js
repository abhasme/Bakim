const { Membership } = require("../models/MembershipModel")
const { MembershipAddOn } = require("../models/MembershipAddOn")
var ObjectID = require("mongoose").Types.ObjectId
const { Subscription } = require("../models/SubscriptionModel")
const { Setting } = require("../models/SettingModel")
const Utility = require("../helpers/Utility")

//Create Membership Service by Admin
const createMembershipServices = req => {
  return new Promise(async (resolve, reject) => {
    const query = new Membership(req.body)
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

//Create Membership Addon Service by Admin
const createMembershipAddonServices = req => {
  return new Promise(async (resolve, reject) => {
    const query = new MembershipAddOn(req.body)
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

//Update Membership Plan by Admin
const updateMembershipServices = async req => {
  return new Promise(async (resolve, reject) => {
    Membership.findOneAndUpdate(
      { _id: req.body.membershipid },
      { $set: req.body },
      { new: true, useFindAndModify: false }
    )
      .then(membership => {
        if (!membership) reject({ message: "MEMBERSHIP_NOT_FOUND" })
        resolve(membership)
      })
      .catch(err => reject({ message: "MEMBERSHIP_NOT_FOUND" }))
  })
}

//Update MembershipAddon Plan by Admin
const updateMembershipAddonServices = async req => {
  return new Promise(async (resolve, reject) => {
    MembershipAddOn.findOneAndUpdate(
      { _id: req.body.membershipaddonid },
      { $set: req.body },
      { new: true, useFindAndModify: false }
    )
      .then(membershipaddon => {
        if (!membershipaddon) reject({ message: "MEMBERSHIP_ADDON_NOT_FOUND" })
        resolve(membershipaddon)
      })
      .catch(err => reject({ message: "MEMBERSHIP_ADDON_NOT_FOUND" }))
  })
}

//Get MembershipAddonList Service With Paginate
const membershipAddonListService = async req => {
  return new Promise(async (resolve, reject) => {
    var { pagesize, page, sortBy } = await Utility.convertReqtoPaginate(
      req.query
    )
    var query = {}
    if (req.query.search) {
      query = {
        $or: [{ planAddonName: RegExp(req.query.search, "i") }],
      }
    }
    MembershipAddOn.aggregate([
      { $match: { isDeleted: false } },
      {
        $project: {
          _id: 1,
          planAddonName: { $ifNull: ["$planAddonName", ""] },
          staffLimit: { $ifNull: ["$staffLimit", 0] },
          subDomain: { $ifNull: ["$subDomain", false] },
          uniqueDomain: { $ifNull: ["$uniqueDomain", false] },
          price: { $ifNull: ["$price", 0] },
          discount: { $ifNull: ["$discount", 0] },
          active: { $ifNull: ["$active", false] },
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

//Get MembershipList For Dropdown
const membershipNameListService = async req => {
  return new Promise(async (resolve, reject) => {
    Membership.aggregate([
      { $match: {} },
      {
        $project: {
          _id: 1,
          planName: { $ifNull: ["$planName", ""] },
        },
      },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err })
      if (!results) reject({ message: "ERROR_DATA_RETRIVED" })
      resolve(results)
    })
  })
}

//Get MembershipList Service With Paginate
const membershipListService = async req => {
  return new Promise(async (resolve, reject) => {
    var { pagesize, page, sortBy } = await Utility.convertReqtoPaginate(
      req.query
    )
    var query = {}
    if (req.query.search === "Monthly" || req.query.search === "Both") {
      query = { planType: { $in: ["Monthly", "Both"] } }
    } else if (req.query.search === "Yearly" || req.query.search === "Both") {
      query = { planType: { $in: ["Yearly", "Both"] } }
    } else {
      query = {}
    }
    Membership.aggregate([
      { $match: { isDeleted: false } },
      {
        $project: {
          _id: 1,
          planName: { $ifNull: ["$planName", ""] },
          bookingWidget: { $ifNull: ["$bookingWidget", false] },
          subDomain: { $ifNull: ["$subDomain", false] },
          uniqueDomain: { $ifNull: ["$uniqueDomain", false] },
          staffLimit: { $ifNull: ["$staffLimit", 0] },
          commisionPercent: { $ifNull: ["$commisionPercent", ""] },
          planType: { $ifNull: ["$planType", ""] },
          monthlyPrice: { $ifNull: ["$monthlyPrice", 0] },
          price: {
            $cond: {
              if: req.query.search === "Monthly",
              then: "$monthlyPrice",
              else: "$yearlyPrice",
            },
          },
          yearlyPrice: { $ifNull: ["$yearlyPrice", 0] },
          discount: { $ifNull: ["$discount", 0] },
          active: { $ifNull: ["$active", false] },
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

//Purchase Membership by Provider
const purchaseMembershipService = req => {
  return new Promise(async (resolve, reject) => {
    req.body.salonid = req.body.salonid ? req.body.salonid : req.user._id
    const query = new Subscription(req.body)
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

const membershipDeleteServices = async req => {
  return new Promise(async (resolve, reject) => {
    Membership.findOneAndUpdate(
      { _id: req.body.membershipid },
      { isDeleted: true, deletedAt: new Date() },
      { new: true, useFindAndModify: false }
    )
      .then(membership => {
        if (!membership) reject({ message: "MEMBERSHIP_NOT_FOUND" })
        resolve(membership)
      })
      .catch(err => reject({ message: "MEMBERSHIP_NOT_FOUND" }))
  })
}

const membershipAddonDeleteServices = async req => {
  return new Promise(async (resolve, reject) => {
    MembershipAddOn.findOneAndUpdate(
      { _id: req.body.membershipaddonid },
      { isDeleted: true, deletedAt: new Date() },
      { new: true, useFindAndModify: false }
    )
      .then(membershipaddon => {
        if (!membershipaddon) reject({ message: "MEMBERSHIP_ADDON_NOT_FOUND" })
        resolve(membershipaddon)
      })
      .catch(err => reject({ message: "MEMBERSHIP_ADDON_NOT_FOUND" }))
  })
}

const membershipAutoRenewServices = async req => {
  return new Promise(async (resolve, reject) => {
    req.body.salonid = req.body.salonid ? req.body.salonid : req.user._id
    Setting.findOneAndUpdate(
      { userid: ObjectID(req.body.salonid) },
      {
        "membership.enableAutoRenew": req.body.enableAutoRenew,
      },
      { new: true, useFindAndModify: false }
    )
      .then(membership => {
        if (!membership) reject({ message: "MEMBERSHIP_NOT_FOUND" })
        resolve(membership)
      })
      .catch(err => reject({ message: "MEMBERSHIP_NOT_FOUND" }))
  })
}

const getmembershipInfoServices = async req => {
  return new Promise(async (resolve, reject) => {
    Membership.aggregate([
      { $match: { _id: ObjectID(req.body.membershipid) } },
      {
        $project: {
          _id: 1,
          planName: { $ifNull: ["$planName", ""] },
          staffLimit: { $ifNull: ["$staffLimit", 0] },
          commisionPercent: { $ifNull: ["$commisionPercent", 0] },
          planType: { $ifNull: ["$planType", ""] },
          monthlyPrice: { $ifNull: ["$monthlyPrice", 0] },
          yearlyPrice: { $ifNull: ["$yearlyPrice", 0] },
          bookingWidget: { $ifNull: ["$bookingWidget", ""] },
          subDomain: { $ifNull: ["$subDomain", ""] },
          uniqueDomain: { $ifNull: ["$uniqueDomain", ""] },
          discount: { $ifNull: ["$discount", 0] },
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
const getmembershipAddonInfoServices = async req => {
  return new Promise(async (resolve, reject) => {
    MembershipAddOn.aggregate([
      { $match: { _id: ObjectID(req.body.membershipaddonid) } },
      {
        $project: {
          _id: 1,
          planAddonName: { $ifNull: ["$planAddonName", ""] },
          staffLimit: { $ifNull: ["$staffLimit", 0] },
          price: { $ifNull: ["$price", 0] },
          subDomain: { $ifNull: ["$subDomain", ""] },
          uniqueDomain: { $ifNull: ["$uniqueDomain", ""] },
          discount: { $ifNull: ["$discount", 0] },
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

const activeMembershipService = async req => {
  return new Promise(async (resolve, reject) => {
    req.body.salonid = req.body.salonid ? req.body.salonid : req.user._id
    Subscription.aggregate([
      {
        $match: {
          salonid: ObjectID(req.body.salonid),
          startDate: { $lte: new Date() },
          endDate: { $gte: new Date() },
        },
      },
      {
        $project: {
          _id: 1,
          salonid: { $ifNull: ["$salonid", ""] },
          activateMembershipId: { $ifNull: ["$membershipid", ""] },
          amount: { $ifNull: ["$amount", 0] },
          description: { $ifNull: ["$description", ""] },
          transactionid: { $ifNull: ["$transactionid", ""] },
          active: { $ifNull: ["$active", false] },
          expDate: { $ifNull: ["$endDate", ""] },
          expDay: {
            $dateDiff: {
              startDate: "$startDate",
              endDate: "$endDate",
              unit: "day",
            },
          },
          createdAt: { $ifNull: ["$createdAt", ""] },
          isDeleted: { $ifNull: ["$isDeleted", false] },
        },
      },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err })
      if (!results) reject({ message: "ERROR_DATA_RETRIVED" })
      if (results.length === 0) {
        resolve({})
      } else {
        resolve(results[0])
      }
    })
  })
}

const activeMembershipAddOnService = async req => {
  return new Promise(async (resolve, reject) => {
    req.body.salonid = req.body.salonid ? req.body.salonid : req.user._id
    Subscription.aggregate([
      {
        $match: {
          salonid: ObjectID(req.body.salonid),
          membershipAddonid: { $ne: null },
          startDate: { $lte: new Date() },
          endDate: { $gte: new Date() },
        },
      },
      {
        $project: {
          _id: 1,
          salonid: { $ifNull: ["$salonid", ""] },
          activateMembershipId: { $ifNull: ["$membershipAddonid", ""] },
          amount: { $ifNull: ["$amount", 0] },
          description: { $ifNull: ["$description", ""] },
          transactionid: { $ifNull: ["$transactionid", ""] },
          active: { $ifNull: ["$active", false] },
          expDate: { $ifNull: ["$endDate", ""] },
          expDay: {
            $dateDiff: {
              startDate: "$startDate",
              endDate: "$endDate",
              unit: "day",
            },
          },
          createdAt: { $ifNull: ["$createdAt", ""] },
          isDeleted: { $ifNull: ["$isDeleted", false] },
        },
      },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err })
      if (!results) reject({ message: "ERROR_DATA_RETRIVED" })
      if (results.length === 0) {
        resolve({})
      } else {
        resolve(results[0])
      }
    })
  })
}

const getSalonInvocingService = async req => {
  return new Promise(async (resolve, reject) => {
    req.body.salonid = req.body.salonid ? req.body.salonid : req.user._id
    Subscription.aggregate([
      { $match: { salonid: ObjectID(req.body.salonid) } },
      {
        $lookup: {
          from: "settings",
          localField: "salonid",
          foreignField: "userid",
          as: "settingInfo",
        },
      },
      { $unwind: "$settingInfo" },
      {
        $lookup: {
          from: "memberships",
          localField: "membershipid",
          foreignField: "_id",
          as: "membershipInfo",
        },
      },
      {
        $project: {
          _id: 1,
          salonid: { $ifNull: ["$salonid", ""] },
          membershipid: { $ifNull: ["$membershipid", ""] },
          amount: { $ifNull: ["$amount", 0] },
          planName: { $ifNull: [{ $first: "$membershipInfo.planName" }, ""] },
          planType: { $ifNull: [{ $first: "$membershipInfo.planType" }, ""] },
          transactionid: { $ifNull: ["$transactionid", ""] },
          active: { $ifNull: ["$active", false] },
          financeInfo: { $ifNull: ["$settingInfo.financeInfo", ""] },
          startDate: { $ifNull: ["$startDate", ""] },
          renewalDate: { $ifNull: ["$endDate", ""] },
          createdAt: { $ifNull: ["$createdAt", ""] },
          isDeleted: { $ifNull: ["$isDeleted", false] },
        },
      },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err })
      if (!results) reject({ message: "ERROR_DATA_RETRIVED" })
      resolve(results)
    })
  })
}

const purchaseMembershipAddOnService = req => {
  return new Promise(async (resolve, reject) => {
    req.body.salonid = req.body.salonid ? req.body.salonid : req.user._id
    const query = new Subscription({
      salonid: req.body.salonid,
      membershipAddonid: req.body.membershipid,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      amount: req.body.amount,
      transactionid: req.body.transactionid,
      description: req.body.description,
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

module.exports = {
  createMembershipServices,
  createMembershipAddonServices,
  updateMembershipServices,
  updateMembershipAddonServices,
  membershipNameListService,
  membershipAddonListService,
  membershipListService,
  purchaseMembershipService,
  membershipDeleteServices,
  membershipAddonDeleteServices,
  membershipAutoRenewServices,
  getmembershipInfoServices,
  getmembershipAddonInfoServices,
  activeMembershipService,
  activeMembershipAddOnService,
  getSalonInvocingService,
  purchaseMembershipAddOnService,
}
