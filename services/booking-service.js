const { Booking } = require("../models/BookingModel")
const { MyBasket } = require("../models/MyBasketModel")
const { Users } = require("../models/UserModel")
const { SalonServices } = require("../models/SalonServiceModel")
const { Rota } = require("../models/RotaModel")
const Utility = require("../helpers/Utility")
var ObjectID = require("mongoose").Types.ObjectId

const addToBasketServices = async req => {
  return new Promise(async (resolve, reject) => {
    req.body.userid = req.body.userid ? req.body.userid : req.user._id
    const query = new MyBasket(req.body)
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
const addBookingServices = async req => {
  return new Promise(async (resolve, reject) => {
    req.body.userid = req.body.userid ? req.body.userid : req.user._id
    const orderRef = Utility.generateOrderId()
    const query = new Booking({ ...req.body, orderRef: `#${orderRef}` })
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

const getBookingListServices = async req => {
  return new Promise(async (resolve, reject) => {
    var { pagesize, page, sortBy } = await Utility.convertReqtoPaginate(
      req.query
    )
    var query = {}
    if (req.query.search) {
      query = {
        $or: [
          { orrderId: RegExp(req.query.search, "i") },
          { customerName: RegExp(req.query.search, "i") },
          { appointmentDate: RegExp(req.query.search, "i") },
          { salonName: RegExp(req.query.search, "i") },
          { serviceName: RegExp(req.query.search, "i") },
          { status: RegExp(req.query.search, "i") },
          { paymentstatus: RegExp(req.query.search, "i") },
          { orderDate: RegExp(req.query.search, "i") },
          { value: RegExp(req.query.search, "i") },
        ],
      }
    }
    Booking.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "salonid",
          foreignField: "_id",
          as: "salonInfo",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userid",
          foreignField: "_id",
          as: "userInfo",
        },
      },
      {
        $lookup: {
          from: "services",
          localField: "services.serviceid",
          foreignField: "_id",
          as: "serviceInfo",
        },
      },
      { $unwind: "$salonInfo" },
      { $unwind: "$userInfo" },
      // { $unwind: "$serviceInfo" },
      // { $unwind: "$services" },
      {
        $project: {
          _id: 1,
          orrderId: { $ifNull: ["$services.orderrefid", ""] },
          customerName: { $ifNull: ["$userInfo.firstName", ""] },
          appointmentDate: { $ifNull: ["$bookingdate", ""] },
          salonName: { $ifNull: ["$salonInfo.salonDetail.salonName", ""] },
          serviceName: { $ifNull: ["$serviceInfo.name", ""] },
          // clienstatustName: {$concat: [{ $ifNull: ["$status", ""] }," ",{ $ifNull: ["$paymentstatus", ""] }]}, /*both status*/
          status: { $ifNull: ["$status", ""] },
          paymentstatus: { $ifNull: ["$paymentstatus", ""] },
          orderDate: { $ifNull: ["$createdAt", ""] },
          value: { $ifNull: ["$totalAmount", ""] },
          active: { $ifNull: ["$active", ""] },
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

const getBookingService = async req => {
  return new Promise(async (resolve, reject) => {
    req.body.salonid = req.body.salonid ? req.body.salonid : req.user._id
    var { pagesize, page, sortBy } = await Utility.convertReqtoPaginate(
      req.query
    )
    var query = {}
    if (req.query.search) {
      query = {
        $or: [
          { status: req.query.search },
          { serviceName: RegExp(req.query.search, "i") },
          { paymentstatus: req.query.search },
          {
            orderDate: {
              $gte: new Date(
                new Date() - `${req.query.search}` * 60 * 60 * 24 * 1000
              ),
              $lt: new Date(),
            },
          },
        ],
      }
    }
    Booking.aggregate([
      { $match: { salonid: ObjectID(req.body.salonid) } },
      {
        $lookup: {
          from: "users",
          localField: "services.teamid",
          foreignField: "_id",
          as: "salonInfo",
        },
      },
      {
        $lookup: {
          from: "services",
          localField: "services.serviceid",
          foreignField: "_id",
          as: "serviceInfo",
        },
      },
      {
        $project: {
          _id: 1,
          orderRef: { $ifNull: ["$orderRef", ""] },
          orderDate: { $ifNull: ["$createdAt", ""] },
          appointmentDate: { $ifNull: ["$bookingdate", ""] },
          employeeName: {
            $concat: [
              { $ifNull: [{ $first: "$salonInfo.firstName" }, ""] },
              " ",
              { $ifNull: [{ $first: "$salonInfo.lastName" }, ""] },
            ],
          },
          serviceName: { $ifNull: [{ $first: "$serviceInfo.name" }, ""] },
          customerName: { $ifNull: ["$fullname", ""] },
          status: { $ifNull: ["$status", ""] },
          paymentstatus: { $ifNull: ["$paymentstatus", ""] },
          totalAmount: { $ifNull: ["$totalAmount", ""] },
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

const getBookingStatusService = req => {
  return new Promise(async (resolve, reject) => {
    req.body.salonid = req.body.salonid ? req.body.salonid : req.user._id
    var query = {}
    if (req.body.bookingid) {
      query = {
        _id: ObjectID(req.body.bookingid),
      }
    }
    Booking.aggregate([
      { $match: { salonid: ObjectID(req.body.salonid) } },
      {
        $match: {
          $or: [
            { paymentstatus: req.body.paymentstatus },
            { status: req.body.status },
          ],
        },
      },
      {
        $project: {
          _id: 1,
          orderRef: { $ifNull: ["$orderRef", ""] },
          customerName: { $ifNull: ["$fullname", ""] },
          customerEmail: { $ifNull: ["$email", ""] },
          customerPhone: { $ifNull: ["$phone", ""] },
          notes: { $ifNull: ["$notes", ""] },
          bookingDate: { $ifNull: ["$bookingdate", ""] },
          createdDate: { $ifNull: ["$createdAt", ""] },
          source: { $ifNull: ["$source", ""] },
          discount: { $ifNull: ["$discount", ""] },
          services: {
            $map: {
              input: {
                $filter: {
                  input: "$services",
                  as: "serviceinfo",
                  cond: "$$serviceinfo.active",
                },
              },
              as: "serviceStatus",
              in: {
                duration: { $ifNull: ["$$serviceStatus.duration", ""] },
                time: { $ifNull: ["$$serviceStatus.time", ""] },
                price: { $ifNull: ["$$serviceStatus.price", ""] },
                status: { $ifNull: ["$$serviceStatus.status", ""] },
                paymentstatus: {
                  $ifNull: ["$$serviceStatus.paymentstatus", ""],
                },
                notes: { $ifNull: ["$$serviceStatus.notes", ""] },
                createdDate: { $ifNull: ["$$serviceStatus.createdAt", ""] },
              },
            },
          },
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

const getBookingTeamNameService = req => {
  return new Promise(async (resolve, reject) => {
    req.body.salonid = req.body.salonid ? req.body.salonid : req.user._id
    Booking.aggregate([
      {
        $match: {
          salonid: ObjectID(req.body.salonid),
          _id: ObjectID(req.body.bookingid),
        },
      },
      { $unwind: "$services" },
      {
        $lookup: {
          from: "users",
          localField: "services.teamid",
          foreignField: "_id",
          as: "teamInfo",
        },
      },
      {
        $lookup: {
          from: "salonservices",
          localField: "services.serviceid",
          foreignField: "serviceid",
          as: "serviceInfo",
        },
      },
      {
        $project: {
          _id: 1,
          teamName: {
            $concat: [
              { $ifNull: [{ $first: "$teamInfo.firstName" }, ""] },
              " ",
              { $ifNull: [{ $first: "$teamInfo.lastName" }, ""] },
            ],
          },
          serviceName: { $ifNull: [{ $first: "$serviceInfo.name" }, ""] },
        },
      },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err })
      if (!results) reject({ message: "ERROR_DATA_RETRIVED" })
      resolve(results)
    })
  })
}

const addServiceInBookingServices = req => {
  return new Promise(async (resolve, reject) => {
    Booking.findByIdAndUpdate(
      { _id: ObjectID(req.body.bookingid) },
      {
        $push: {
          services: {
            ...req.body,
          },
        },
      },
      { new: true, useFindAndModify: false }
    )
      .then(service => {
        if (!service) reject({ message: "BOOKING_NOT_FOUND" })
        resolve(service.services)
      })
      .catch(err => reject({ message: "BOOKING_NOT_FOUND" }))
  })
}

const getServiceEmployeeServices = req => {
  return new Promise(async (resolve, reject) => {
    let service = []
    req.body.serviceid.forEach(element => {
      service.push(ObjectID(element))
    })

    SalonServices.aggregate([
      { $match: { salonid: ObjectID(req.body.salonid) } },
      { $match: { serviceid: { $in: service } } },
      {
        $lookup: {
          from: "users",
          localField: "serviceid",
          foreignField: "employeeDetail.assignedService.serviceid",
          pipeline: [
            { $match: { salonid: ObjectID(req.body.salonid), active: true } },
          ],
          as: "employeeInfo",
        },
      },
      {
        $project: {
          _id: 1,
          serviceName: { $ifNull: ["$name", ""] },
          serviceid: { $ifNull: ["$serviceid", ""] },
          employeelist: {
            $map: {
              input: {
                $filter: {
                  input: "$employeeInfo",
                  as: "employeerow",
                  //cond: {  $in: ["$$employeerow.employeeDetail.assignedService.serviceid", postData]}  ,
                  cond: [
                    "$$employeerow.employeeDetail.assignedService.serviceid",
                    service,
                  ],
                },
              },
              as: "servicesls",
              in: {
                serviceid: "$$servicesls.serviceid",
                employeeid: "$$servicesls._id",
                firstName: "$$servicesls.firstName",
                lastName: "$$servicesls.lastName",
                profileImage: "$$servicesls.profileImage",
                jobTitle: "$$servicesls.employeeDetail.jobTitle",
                rating: { $ifNull: ["$$servicesls.reviewCount", 0] },
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

const getSelectedServiceServices = req => {
  return new Promise(async (resolve, reject) => {
    let service = []
    let price = []
    let checkserviceOpening = {}
    let date
    req.body.serviceid.forEach(element => {
      service.push(ObjectID(element))
    })
    req.body.pricingOption.forEach(element => {
      price.push(ObjectID(element))
    })

    if (req.body.date) {
      date = new Date(req.body.date)
    } else {
      date = new Date()
    }
    let days = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ]
    let day = new Date(date).getDay()
    let dayName = days[day]
    if (dayName == "sunday") {
      checkserviceOpening = { "serviceAvailbility.sunday": true }
    } else if (dayName == "monday") {
      checkserviceOpening = { "serviceAvailbility.monday": true }
    } else if (dayName == "tuesday") {
      checkserviceOpening = { "serviceAvailbility.tuesday": true }
    } else if (dayName == "wednesday") {
      checkserviceOpening = { "serviceAvailbility.wednesday": true }
    } else if (dayName == "thursday") {
      checkserviceOpening = { "serviceAvailbility.thursday": true }
    } else if (dayName == "friday") {
      checkserviceOpening = { "serviceAvailbility.friday": true }
    } else if (dayName == "saturday") {
      checkserviceOpening = { "serviceAvailbility.saturday": true }
    }

    await SalonServices.aggregate([
      { $match: { salonid: ObjectID(req.body.salonid) } },
      { $match: { serviceid: { $in: service } } },
      { $match: checkserviceOpening },
      {
        $project: {
          serviceName: { $ifNull: ["$name", ""] },
          serviceid: { $ifNull: ["$serviceid", ""] },
          cleanUpTime: { $ifNull: ["$cleanUpTime", 0] },
          appointmentleadTime: { $ifNull: ["$appointmentleadTime", 0] },
          serviceAvailbility: 1,
          service: {
            $first: {
              $map: {
                input: {
                  $filter: {
                    input: "$pricingOption",
                    as: "pricingrow",
                    cond: { $in: ["$$pricingrow._id", price] },
                  },
                },
                as: "servicesls",
                in: {
                  name: "$$servicesls.name",
                  duration: "$$servicesls.duration",
                  price: "$$servicesls.price",
                  priceid: "$$servicesls._id",
                },
              },
            },
          },
        },
      },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err })
      if (!results) reject({ message: "ERROR_DATA_RETRIVED" })
      let totalAmount = 0
      let totalTime = 0
      let totalCleanUpTime = 0
      let totalLeadTime = 0

      for await (const ele of results) {
        totalCleanUpTime += ele.cleanUpTime
        totalLeadTime += ele.appointmentleadTime
        totalAmount += ele.service.price
        totalTime += ele.service.duration
      }
      let data = {
        service: results,
        totalAmount: totalAmount,
        totalTime: totalCleanUpTime + totalTime + totalLeadTime,
      }
      resolve(data)
    })
  })
}

const getBookingDateAndTimeServices = req => {
  return new Promise(async (resolve, reject) => {
    let team = []
    req.body.teamid.forEach(element => {
      team.push(ObjectID(element))
    })
    let date
    let query = {}
    if (req.body.date) {
      query = { bookingdate: new Date(req.body.date) }
      date = new Date(req.body.date)
    } else {
      query = { bookingdate: new Date() }
      date = new Date()
    }
    let checkSaolnOpening = {}
    let checkTeamOpening = {}
    let days = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ]
    let day = new Date(date).getDay()
    let dayName = days[day]

    if (dayName == "sunday") {
      checkSaolnOpening = { sunday: true }
      checkTeamOpening = { "checkOpen.sunday": true }
    } else if (dayName == "monday") {
      checkSaolnOpening = { monday: true }
      checkTeamOpening = { "checkOpen.monday": true }
    } else if (dayName == "tuesday") {
      checkSaolnOpening = { tuesday: true }
      checkTeamOpening = { "checkOpen.tuesday": true }
    } else if (dayName == "wednesday") {
      checkSaolnOpening = { wednesday: true }
      checkTeamOpening = { "checkOpen.wednesday": true }
    } else if (dayName == "thursday") {
      checkSaolnOpening = { thursday: true }
      checkTeamOpening = { "checkOpen.thursday": true }
    } else if (dayName == "friday") {
      checkSaolnOpening = { friday: true }
      checkTeamOpening = { "checkOpen.friday": true }
    } else if (dayName == "saturday") {
      checkSaolnOpening = { saturday: true }
      checkTeamOpening = { "checkOpen.saturday": true }
    }
    await Booking.aggregate([
      {
        $match: {
          "services.teamid": { $in: team },
          bookingdate: { $gte: new Date() },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "salonid",
          foreignField: "_id",
          as: "salonInfo",
        },
      },

      {
        $lookup: {
          from: "users",
          localField: "services.teamid",
          foreignField: "_id",
          as: "teamInfo",
        },
      },
      {
        $project: {
          _id: 1,
          teamid: { $ifNull: ["$services.teamid", ""] },
          bookingdate: { $ifNull: ["$bookingdate", ""] },
          bookingtime: { $ifNull: ["$bookingtime", ""] },
          endTime: { $ifNull: ["$endTime", ""] },
          price: { $ifNull: ["$price", ""] },
          status: {
            $cond: [{ $eq: ["$status", "Confirmed"] }, "Selected", "Choose"],
          },
          monday: {
            $ifNull: [{ $first: "$salonInfo.workingHour.monday.isOpen" }, ""],
          },
          tuesday: {
            $ifNull: [{ $first: "$salonInfo.workingHour.tuesday.isOpen" }, ""],
          },
          wednesday: {
            $ifNull: [
              { $first: "$salonInfo.workingHour.wednesday.isOpen" },
              "",
            ],
          },
          thursday: {
            $ifNull: [{ $first: "$salonInfo.workingHour.thursday.isOpen" }, ""],
          },
          friday: {
            $ifNull: [{ $first: "$salonInfo.workingHour.friday.isOpen" }, ""],
          },
          saturday: {
            $ifNull: [{ $first: "$salonInfo.workingHour.saturday.isOpen" }, ""],
          },
          sunday: {
            $ifNull: [{ $first: "$salonInfo.workingHour.sunday.isOpen" }, ""],
          },

          checkOpen: {
            $map: {
              input: {
                $filter: {
                  input: "$teamInfo",
                  as: "teamrow",
                  cond: { $in: ["$$teamrow._id", team] },
                },
              },
              as: "team",
              in: {
                teamid: { $ifNull: ["$$team._id", ""] },
                sunday: { $ifNull: ["$$team.workingHour.sunday.isOpen", true] },
                monday: { $ifNull: ["$$team.workingHour.monday.isOpen", true] },
                tuesday: {
                  $ifNull: ["$$team.workingHour.tuesday.isOpen", true],
                },
                wednesday: {
                  $ifNull: ["$$team.workingHour.wednesday.isOpen", true],
                },
                thursday: {
                  $ifNull: ["$$team.workingHour.thursday.isOpen", true],
                },
                friday: { $ifNull: ["$$team.workingHour.friday.isOpen", true] },
                saturday: {
                  $ifNull: ["$$team.workingHour.saturday.isOpen", true],
                },
              },
            },
          },
        },
      },
      { $match: checkSaolnOpening },
      { $match: checkTeamOpening },
      { $match: query },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err })
      if (!results) reject({ message: "ERROR_DATA_RETRIVED" })
      resolve(results)
    })
  })
}

const getResourceAvailableServices = req => {
  return new Promise(async (resolve, reject) => {
    let date
    let query = {}
    if (req.body.date) {
      query = { bookingdate: new Date(req.body.date) }
      date = new Date(req.body.date)
    } else {
      query = { bookingdate: new Date() }
      date = new Date()
    }

    await Booking.aggregate([
      { $match: query },
      { $match: { salonid: ObjectID(req.body.salonid) } },
      //   {
      //     $lookup:
      //       {
      //         from: "resources",
      //         localField: "salonid",
      //         foreignField: "salonid",
      //         as: "resourceInfo"
      //       }
      //  },
      {
        $project: {
          service: { $ifNull: ["$services.serviceid", []] },
          // checkOpen: {
          //   $map: {
          //     input: {
          //       $filter: {
          //         input: "$resourceInfo",
          //         as: "resourcerow",
          //         cond: "$$resourcerow.salonid"
          //       },
          //     },
          //     as: "resource",
          //     in: {
          //       serviceid: { $ifNull: ["$$resource.services.serviceid", ""] },
          //     },
          //   },
          // },
        },
      },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err })
      if (!results) reject({ message: "ERROR_DATA_RETRIVED" })
      // let remeaningResource = [];
      for await (const service of results) {
        console.log(service.service)
        //   for await (const resource of service.checkOpen) {
        //     if(JSON.stringify(resource.serviceid) === JSON.stringify(service.service))
        //     remeaningResource.push(resource.serviceid)
        //   }
      }
      // console.log(remeaningResource)
      resolve(results)
    })
  })
}

const getEmployeeSlotsServices = req => {
  return new Promise(async (resolve, reject) => {
    let date;
    let query = {}
    let checkSaolnOpening = {}
    let checkTeamOpening = {}
    if (req.body.date) {
      query = { bookingdate: new Date(req.body.date) }
      date = new Date(req.body.date)
    } else {
      query = { bookingdate: new Date() }
      date = new Date()
    }
    let dateSlots = []
    const checkBooking = await Booking.find({
      salonid: ObjectID(req.body.salonid),
      "services.teamid": ObjectID(req.body.teamid),
      bookingdate: date,
    })
    
    for await (const team of checkBooking) {
      for await (const slotid of team.services) {
        if (req.body.teamid === slotid.teamid.toString())
          dateSlots.push(slotid.slotid)
      }
    }
    let days = ["sunday","monday", "tuesday","wednesday","thursday", "friday", "saturday",]
    let day = new Date(date).getDay()
    let dayName = days[day]

    if (dayName == "sunday") {
      checkSaolnOpening = { "workingHour.sunday.isOpen": true }
      checkTeamOpening = { "checkOpen.sunday": true }
    } else if (dayName == "monday") {
      checkSaolnOpening = { "workingHour.monday.isOpen": true }
      checkTeamOpening = { "checkOpen.monday": true }
    } else if (dayName == "tuesday") {
      checkSaolnOpening = { "workingHour.tuesday.isOpen": true }
      checkTeamOpening = { "checkOpen.tuesday": true }
    } else if (dayName == "wednesday") {
      checkSaolnOpening = { "workingHour.wednesday.isOpen": true }
      checkTeamOpening = { "checkOpen.wednesday": true }
    } else if (dayName == "thursday") {
      checkSaolnOpening = { "workingHour.thursday.isOpen": true }
      checkTeamOpening = { "checkOpen.thursday": true }
    } else if (dayName == "friday") {
      checkSaolnOpening = { "workingHour.friday.isOpen": true }
      checkTeamOpening = { "checkOpen.friday": true }
    } else if (dayName == "saturday") {
      checkSaolnOpening = { "workingHour.saturday.isOpen": true }
      checkTeamOpening = { "checkOpen.saturday": true }
    }
    await Users.aggregate([
      { $match: { _id: ObjectID(req.body.salonid) } },
      { $match: checkSaolnOpening },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "salonid",
          as: "employeeInfo",
        },
      },
      {
        $lookup: {
          from: "bookings",
          localField: "employeeInfo._id",
          foreignField: "services.teamid",
          as: "bookingInfo",
        },
      },
      {
        $lookup: {
          from: "rotas",
        //  let: { teamid: ObjectID(req.body.teamid), date: date },
        let: { teamid: ObjectID(req.body.teamid) },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$teamid", "$$teamid"] },
                   // { $eq: ["$date", "$$date"] },
                  ],
                },
              },
            },
          ],
          as: "RotaInfo",
        },
      },
      {
        $project: {
          bookingdate: {
            $ifNull: ["$bookingInfo.bookingdate" , ""],
          },
          rotaCheck: { $ifNull: [{ $first: "$RotaInfo.active" }, true] },
          startTime: {
            $toInt: {
              $first: { $split: [{ $first: "$RotaInfo.startTime" }, ":"] },
            },
          },
          startMinute: {
            $toInt: {
              $arrayElemAt: [
                { $split: [{ $first: "$RotaInfo.startTime" }, ":"] },
                1,
              ],
            },
          },
          endTime: {
            $toInt: {
              $first: { $split: [{ $first: "$RotaInfo.endtime" }, ":"] },
            },
          },
          endMinute: {
            $toInt: {
              $arrayElemAt: [
                { $split: [{ $first: "$RotaInfo.endtime" }, ":"] },
                1,
              ],
            },
          },

          checkOpen: {
            $map: {
              input: {
                $filter: {
                  input: "$employeeInfo",
                  as: "employeerow",
                  cond: {
                    $eq: ["$$employeerow._id", ObjectID(req.body.teamid)],
                  },
                },
              },
              as: "team",
              in: {
                teamid: { $ifNull: ["$$team._id", ""] },
                sunday: { $ifNull: ["$$team.workingHour.sunday.isOpen", true] },
                monday: { $ifNull: ["$$team.workingHour.monday.isOpen", true] },
                tuesday: {
                  $ifNull: ["$$team.workingHour.tuesday.isOpen", true],
                },
                wednesday: {
                  $ifNull: ["$$team.workingHour.wednesday.isOpen", true],
                },
                thursday: {
                  $ifNull: ["$$team.workingHour.thursday.isOpen", true],
                },
                friday: { $ifNull: ["$$team.workingHour.friday.isOpen", true] },
                saturday: {
                  $ifNull: ["$$team.workingHour.saturday.isOpen", true],
                },
                schedule: {
                  $map: {
                    input: {
                      $filter: {
                        input: "$$team.workingHour.schedule",
                        as: "schedulerow",
                        cond: "schedulerow._id",
                      },
                    },
                    as: "daySchedule",
                    in: {
                      scheduleid: { $ifNull: ["$$daySchedule._id", ""] },
                      time: { $ifNull: ["$$daySchedule.time", ""] },

                      has_service: {
                        $in: ["$$daySchedule._id", dateSlots],
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      { $match: checkTeamOpening },
      { $match: { rotaCheck: true } },
      { $match: query },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err })
      if (!results) reject({ message: "ERROR_DATA_RETRIVED" })
     if(results.length>0){
      let array = []
      let startTime = (results[0].startTime * 60 + results[0].startMinute);
      let endTime = (results[0].endTime * 60 + results[0].endMinute)
       results[0].checkOpen[0].schedule.forEach(ele => {    
        if ((startTime <= ele.time.slice(0, 2) * 60 + parseInt(ele.time.slice(3, 5)) 
        && ele.time.slice(0, 2) * 60 + parseInt(ele.time.slice(3, 5)) <= endTime)) {
          array.push(ele.scheduleid)
        }
      })
      console.log(array)
      const array1 = results[0].checkOpen[0].schedule.filter(val => !array.includes(val?.scheduleid));
      resolve(
        {
          salonid: results[0]._id,
          teamid: results[0].checkOpen[0].teamid,
          bookingdate:req.body.date,
          Schedule: array1,
        }
     )
      
     }else{
      resolve({ message: "SLOTS_NOT_AVAILABLE" })
     }
   
    })
  })
}

module.exports = {
  addToBasketServices,
  addBookingServices,
  getBookingListServices,
  getBookingService,
  getBookingStatusService,
  getBookingTeamNameService,
  addServiceInBookingServices,
  getServiceEmployeeServices,
  getSelectedServiceServices,
  getBookingDateAndTimeServices,
  getResourceAvailableServices,
  getEmployeeSlotsServices,
}

