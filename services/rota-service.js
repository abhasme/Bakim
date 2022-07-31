const { Users } = require("../models/UserModel")
const { Rota } = require("../models/RotaModel")
var ObjectID = require("mongoose").Types.ObjectId
const Utility = require("../helpers/Utility")

const getRotaService = async req => {
  return new Promise(async (resolve, reject) => {
    req.body.salonid = req.body.salonid ? req.body.salonid : req.user._id;
    var query = {}
    if (req.body.teamid) {
      query = { _id: ObjectID(req.body.teamid), }
    } else {
      query = {}
    }

    Users.aggregate([
      {
        $match: { salonid: ObjectID(req.body.salonid), userType: "Employee", isDeleted: false },
      },
      {
        $project: {
          employeeName: { $concat: [{ $ifNull: ["$firstName", ""] }, " ", { $ifNull: ["$lastName", ""] }] },
          profileImage: { $ifNull: ["$profileImage", ""] },
          active: { $ifNull: ["$active", true] },
          workingHour: { $ifNull: ["$workingHour", {}] },
        },
      },
      { $match: query },
      { $sort: { _id: -1 } },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err })
      if (!results) reject({ message: "ERROR_DATA_RETRIVED" })
      var data = []
      results.forEach(ele => {
        var monday = ele.workingHour.monday
        var tuesday = ele.workingHour.tuesday
        var wednesday = ele.workingHour.wednesday
        var thursday = ele.workingHour.thursday
        var friday = ele.workingHour.friday
        var saturday = ele.workingHour.saturday
        var sunday = ele.workingHour.sunday
        var dayCount =
          Utility.countTime(monday) +
          Utility.countTime(tuesday) +
          Utility.countTime(thursday) +
          Utility.countTime(wednesday) +
          Utility.countTime(friday) +
          Utility.countTime(saturday) +
          Utility.countTime(sunday)
        var result = {
          _id: ele._id,
          employeeName: ele.employeeName,
          profileImage: ele.profileImage,
          date: ele.date,
          totalWorkingHour: dayCount,
          workingHour: ele.workingHour,
          active: ele.active,
        }
        data.push(result)
      })

      resolve(data)
    })
  })
}

const getDayDetailService = async req => {
  return new Promise(async (resolve, reject) => {
    req.body.salonid = req.body.salonid ? req.body.salonid : req.user._id
    Users.aggregate([
      { $match: { _id: ObjectID(req.body.teamid) } },
      {
        $project: {
          firstName: { $ifNull: ["$firstName", ""] },
          lastName: { $ifNull: ["$lastName", ""] },
          profileImage: { $ifNull: ["$profileImage", ""] },
          scheduletype: { $ifNull: ["$scheduletype", "Weekly"] },
          workingHour: { $ifNull: ["$workingHour", 0] },
          active: { $ifNull: ["$active", true] },
        },
      },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err })
      if (!results) reject({ message: "ERROR_DATA_RETRIVED" })
      var tuesday = results[0].workingHour.tuesday
      var monday = results[0].workingHour.monday
      var wednesday = results[0].workingHour.wednesday
      var thursday = results[0].workingHour.thursday
      var friday = results[0].workingHour.friday
      var saturday = results[0].workingHour.saturday
      var sunday = results[0].workingHour.sunday
      var totalHour =
        Utility.countTime(monday) +
        Utility.countTime(tuesday) +
        Utility.countTime(thursday) +
        Utility.countTime(wednesday) +
        Utility.countTime(friday) +
        Utility.countTime(saturday) +
        Utility.countTime(sunday)
      resolve({
        _id: results[0]._id,
        firstName: results[0].firstName,
        lastName: results[0].lastName,
        profileImage: results[0].profileImage,
        date: req.body.date,
        workingHour: totalHour,
      })
    })
  })
}

const addTeamMemberRotaServices = async req => {
  return new Promise(async (resolve, reject) => {
    const salonid = await Users.SalonPortfolio(req.body.teamid)
    const user = await Rota.findOne({ teamid: ObjectID(req.body.teamid), date: req.body.date })
    if (user) {
      await Rota.findOneAndUpdate(
        { teamid: req.body.teamid, date: req.body.date },
        { ...req.body, salonid: salonid.salonid },
        { new: true, useFindAndModify: false }
      )
        .then(result => { resolve(result) })
        .catch(err => { reject(err) })
    } else {
      const query = new Rota({ ...req.body })
      query.save()
        .then(result => { resolve(result) })
        .catch(err => { reject(err) })
    }
  })
}

const getTeamDutyTimeRotaService = async req => {
  return new Promise(async (resolve, reject) => {
    var salonid = req.body.salonid ? req.body.salonid : req.user._id
    let query = { teamid: ObjectID(req.body.teamid), date: new Date(req.body.date) }

    Rota.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "teamid",
          foreignField: "_id",
          as: "userinfo",
        },
      },

      {
        $project: {
          teamid: 1,
          date: { $ifNull: ["$date", ""] },
          active: { $ifNull: ["$active", true] },
          startTime: { $ifNull: ["$startTime", ""] },
          endtime: { $ifNull: ["$endtime", ""] },
          employeeName: { $concat: [{ $ifNull: [{ $first: "$userinfo.firstName" }, ""] }, " ", { $ifNull: [{ $first: "$userinfo.lastName" }, ""] },], },
          profileImage: { $ifNull: [{ $first: "$userinfo.profileImage" }, ""] },
          setTimeType: { $ifNull: ["$setTimeType", "StandardTimes"] },
          scheduletype: { $ifNull: ["$scheduletype", "Weekly"] },
        },
      },
      { $match: query },


    ]).exec(async (err, results) => {
      if (err) reject({ message: err })
      if (!results) reject({ message: "ERROR_DATA_RETRIVED" })
      resolve(results)
    })
  })
}

const updateTeamDutyTimeRota = async req => {
  return new Promise(async (resolve, reject) => {
    await Rota.findOneAndUpdate(
      { _id: ObjectID(req.body.rotaid) },
      {},
      { new: true, useFindAndModify: false }
    )
      .then(rota => {
        if (!rota) reject({ message: "ROTA_NOT_FOUND" })
        resolve(rota)
      })
      .catch(err => reject({ message: "ROTA_NOT_FOUND" }))
  })
}

const getWorkingHourService = async req => {
  return new Promise(async (resolve, reject) => {
    Rota.aggregate([
      { $match: { teamid: ObjectID(req.body.teamid), }, },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err })
      if (!results) reject({ message: "ERROR_DATA_RETRIVED" })
      var data = []
      results.forEach(ele => {
        var dayCount = Utility.countTime(ele)
        data.push(dayCount)
      })
      const sum = data.reduce((partialSum, a) => partialSum + a, 0)
      resolve(sum)
    })
  })
}
const getWeekWorkingHourService = async req => {
  return new Promise(async (resolve, reject) => {
    Users.aggregate([
      { $match: { _id: ObjectID(req.body.employeeid), }, },
      { $limit: 1 },
      {
        $project: {
          _id: 1,
          monday: { $ifNull: ["$workingHour.monday", {}] },
          tuesday: { $ifNull: ["$workingHour.tuesday", {}] },
          wednesday: { $ifNull: ["$workingHour.wednesday", {}] },
          thursday: { $ifNull: ["$workingHour.thursday", {}] },
          friday: { $ifNull: ["$workingHour.friday", {}] },
          saturday: { $ifNull: ["$workingHour.saturday", {}] },
          sunday: { $ifNull: ["$workingHour.sunday", {}] },
        },
      },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err })
      if (!results) reject({ message: "ERROR_DATA_RETRIVED" })
      resolve(results[0])
    })
  })
}

module.exports = {
  getRotaService,
  getDayDetailService,
  addTeamMemberRotaServices,
  updateTeamDutyTimeRota,
  getTeamDutyTimeRotaService,
  getWorkingHourService,
  getWeekWorkingHourService
}
