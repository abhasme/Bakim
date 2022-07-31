const { Users } = require("../models/UserModel");
var ObjectID = require("mongoose").Types.ObjectId;
const Utility = require("../helpers/Utility");
const { Setting } = require("../models/SettingModel");

const getInvoiceSettingService = async (req) => {
  return new Promise(async (resolve, reject) => {
    var userid = req.body.userid ? req.body.userid : req.user._id;
    Setting.aggregate([
      { $match: { userid: ObjectID(userid) } },
      {
        $lookup: {
          from: "users",
          localField: "userid",
          foreignField: "_id",
          as: "userinfo",
        },
      },
      { $unwind: "$userinfo" },
      { $limit: 1 },
      {
        $project: {
          _id: 1,
          salonName: { $ifNull: ["$userinfo.salonDetail.salonName", ""] },
          postalCode: {
            $cond: {
              if: { $ne: ["", "$financeInfo.postalCode"] },
              then: "$financeInfo.postalCode",
              else: "$userinfo.location.postalCode",
            },
          },
          address: {
            $cond: {
              if: { $ne: ["", "$financeInfo.address"] },
              then: "$financeInfo.address",
              else: "$userinfo.location.address",
            },
          },
          city: {
            $cond: {
              if: { $ne: ["", "$financeInfo.city"] },
              then: "$financeInfo.city",
              else: "$userinfo.location.city",
            },
          },
          state: {
            $cond: {
              if: { $ne: ["", "$financeInfo.state"] },
              then: "$financeInfo.state",
              else: "$userinfo.location.state",
            },
          },
          country: {
            $cond: {
              if: { $ne: ["", "$financeInfo.country"] },
              then: "$financeInfo.country",
              else: "$userinfo.location.country",
            },
          },
          contactPersion: {
            $cond: {
              if: { $ne: ["", "$financeInfo.contactPersion"] },
              then: "$financeInfo.contactPersion",
              else: {
                $concat: ["$userinfo.firstName", " ", "$userinfo.lastName"],
              },
            },
          },
          bussinessEmail: {
            $cond: {
              if: { $ne: ["", "$financeInfo.bussinessEmail"] },
              then: "$financeInfo.bussinessEmail",
              else: "$userinfo.email",
            },
          },
          bussinessPhone: {
            $cond: {
              if: { $ne: ["", "$financeInfo.bussinessPhone"] },
              then: "$financeInfo.bussinessPhone",
              else: "$userinfo.mobile",
            },
          },
          vatNO: { $ifNull: ["$financeInfo.vatNO", ""] },
          registrationNo: { $ifNull: ["$financeInfo.registrationNo", ""] },
        },
      },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err });
      if (!results)
        reject({
          message: "Invoice Details Not Found",
        });
      resolve(results[0]);
    });
  });
};

const updateInvoiceSettingService = async (req) => {
  return new Promise(async (resolve, reject) => {
    var userid = req.body.userid ? req.body.userid : req.user._id;
    Setting.findOneAndUpdate(
      { userid: ObjectID(userid) },
      {
        $set: {
          financeInfo: {
            postalCode: req.body.postalCode,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            bussinessEmail: req.body.bussinessEmail,
            bussinessPhone: req.body.bussinessPhone,
            vatNO: req.body.vatNO,
            registrationNo: req.body.registrationNo,
            contactPersion: req.body.contactPersion,
          },
        },
      },
      { new: true, useFindAndModify: false }
    )
      .then((setting) => {
        if (!setting) reject({ message: "USER_NOT_FOUND" });
        resolve(setting.financeInfo);
      })
      .catch((err) => reject({ message: "USER_NOT_FOUND" }));
  });
};

const getBookingSettingService = async (req) => {
  return new Promise(async (resolve, reject) => {
    var userid = req.body.userid ? req.body.userid : req.user._id;
    Setting.aggregate([
      { $match: { userid: ObjectID(userid) } },
      { $limit: 1 },
      {
        $project: {
          _id: 1,
          calendarTimeScale: { $ifNull: ["$booking.calendarTimeScale", 0] },
          onlineBookingInterval: {
            $ifNull: ["$booking.onlineBookingInterval", 0],
          },
          cancellationPolicy: { $ifNull: ["$booking.cancellationPolicy", 0] },
          allowMultiEmployee: {
            $ifNull: ["$booking.allowMultiEmployee", false],
          },
          advanceBookingDayLimit: {
            $ifNull: ["$booking.advanceBookingDayLimit", 0],
          },
          afternoonStartedAt: {
            $ifNull: ["$booking.afternoonStartedAt", "12:00"],
          },
          eveningStartedAt: { $ifNull: ["$booking.eveningStartedAt", "18:00"] },
          bookingConfirmationPhone: {
            $ifNull: ["$booking.bookingConfirmationPhone", ""],
          },
          bookingConfirmationSms: {
            $ifNull: ["$booking.bookingConfirmationSms", false],
          },
        },
      },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err });
      if (!results)
        reject({
          message: "Invoice Details Not Found",
        });
      resolve(results[0]);
    });
  });
};

const updateBookingSettingService = async (req) => {
  return new Promise(async (resolve, reject) => {
    var userid = req.body.userid ? req.body.userid : req.user._id;
    Setting.findOneAndUpdate(
      { userid: ObjectID(userid) },
      {
        $set: {
          booking: {
            calendarTimeScale: req.body.calendarTimeScale,
            onlineBookingInterval: req.body.onlineBookingInterval,
            cancellationPolicy: req.body.cancellationPolicy,
            allowMultiEmployee: req.body.allowMultiEmployee,
            advanceBookingDayLimit: req.body.advanceBookingDayLimit,
            afternoonStartedAt: req.body.afternoonStartedAt,
            eveningStartedAt: req.body.eveningStartedAt,
            bookingConfirmationPhone: req.body.bookingConfirmationPhone,
            bookingConfirmationSms: req.body.bookingConfirmationSms,
          },
        },
      },
      { new: true, useFindAndModify: false }
    )
      .then((setting) => {
        if (!setting) reject({ message: "USER_NOT_FOUND" });
        resolve(setting.booking);
      })
      .catch((err) => reject({ message: "USER_NOT_FOUND" }));
  });
};

const getNotificationForClientSettingService = async (req) => {
  return new Promise(async (resolve, reject) => {
    var salonid = req.body.salonid ? req.body.salonid : req.user._id;
    Setting.aggregate([
      {
        $match: {
          $and: [
            { userid: ObjectID(salonid) },
            { _id: ObjectID(req.body.notificationsettingid) },
          ],
        },
      },
      {
        $project: {
          _id: 0,
          userid: 1,

          usereceviceTextMessagers: {
            $ifNull: ["$notification.receviceTextMessage", ""],
          },
          usreceviceEmailMessageers: {
            $ifNull: ["$notification.receviceEmailMessage", ""],
          },
        },
      },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err });
      if (!results) reject({ message: "ERROR_DATA_RETRIVED" });
      resolve(results);
    });
  });
};

const getNotificationForTeamSettingService = async (req) => {
  return new Promise(async (resolve, reject) => {
    var salonid = req.body.salonid ? req.body.salonid : req.user._id;
    Setting.aggregate([
      {
        $match: {
          $and: [
            { userid: ObjectID(salonid) },
            { _id: ObjectID(req.body.notificationsettingid) },
          ],
        },
      },
      {
        $project: {
          _id: 0,
          userid: 1,
          booking: {
            $ifNull: ["$notification.booking", ""],
          },
          changeCalendar: {
            $ifNull: ["$notification.changeCalendar", ""],
          },
          reviewOnPost: {
            $ifNull: ["$notification.reviewOnPost", ""],
          },
          beforeAppointment: {
            $ifNull: ["$notification.beforeAppointment", ""],
          },
        },
      },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err });
      if (!results) reject({ message: "ERROR_DATA_RETRIVED" });
      resolve(results);
    });
  });
};

const updateNotificationForClientSettingServices = async (req) => {
  return new Promise(async (resolve, reject) => {
    var salonid = req.body.salonid ? req.body.salonid : req.user._id;
    Setting.findOneAndUpdate(
      {
        userid: ObjectID(salonid),
        _id: ObjectID(req.body.notificationsettingid),
      },
      {
        $set: {
          "notification.receviceTextMessage": req.body.receviceTextMessage,
          "notification.receviceEmailMessage": req.body.receviceEmailMessage,
        },
      },
      { new: true, useFindAndModify: false }
    )
      .then((setting) => {
        if (!setting) reject({ message: "USER_NOT_FOUND" });

        resolve(setting.notification);
      })
      .catch((err) => reject({ message: "USER_NOT_FOUND" }));
  });
};

const updateNotificationForTeamSettingServices = async (req) => {
  return new Promise(async (resolve, reject) => {
    var salonid = req.body.salonid ? req.body.salonid : req.user._id;
    Setting.findOneAndUpdate(
      {
        userid: ObjectID(salonid),
        _id: ObjectID(req.body.notificationsettingid),
      },
      {
        $set: {
          "notification.booking": req.body.booking,
          "notification.changeCalendar": req.body.changeCalendar,
          "notification.reviewOnPost": req.body.reviewOnPost,
          "notification.beforeAppointment": req.body.beforeAppointment,
        },
      },
      { new: true, useFindAndModify: false }
    )
      .then((setting) => {
        if (!setting) reject({ message: "USER_NOT_FOUND" });
        resolve(setting.notification);
      })
      .catch((err) => reject({ message: "USER_NOT_FOUND" }));
  });
};

module.exports = {
  getInvoiceSettingService,
  updateInvoiceSettingService,
  updateBookingSettingService,
  getBookingSettingService,
  getNotificationForClientSettingService,
  getNotificationForTeamSettingService,
  updateNotificationForClientSettingServices,
  updateNotificationForTeamSettingServices,
};
