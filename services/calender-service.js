const { Booking } = require("../models/BookingModel");
const { Users } = require("../models/UserModel");
const { Rota } = require("../models/RotaModel");
const ObjectID = require("mongoose").Types.ObjectId

const createAppointmentServices = (req) => {
    return new Promise(async (resolve, reject) => {
        let salonid = req.body.salonid ? req.body.salonid : req.user._id;
        const client = await Users.findOne({ salonid: ObjectID(salonid), userType: "User", isDeleted: false })
        const query = new Booking({
            userid: client._id,
            email: client.email,
            phone: client.mobile,
            fullname: client.firstName + client.lastName,
            salonid: client.salonid,
            ...req.body
        });
        query.save()
            .then((result) => { resolve(result) })
            .catch((err) => { reject(err)});
    });
}

const getEmployeeCalenderService = async req => {
    return new Promise(async (resolve, reject) => {
        let query = {};
        let team = {};
        if (req.body.date) {
            query = { bookingdate: new Date(req.body.date) }
        } else {
            query = { bookingdate: { $gte: new Date() } }
        }

        if (req.body.teamid) {
            team = { teamid: ObjectID(req.body.teamid) }
        }
        req.body.salonid = req.body.salonid ? req.body.salonid : req.user._id
        await Booking.aggregate([
            { $match: { salonid: ObjectID(req.body.salonid), } },
            { $match: query },
            { $unwind: "$services" },
            {
                $lookup:
                {
                    from: "users",
                    localField: "userid",
                    foreignField: "_id",
                    as: "userInfo"
                }
            },
            {
                $lookup:
                {
                    from: "salonservices",
                    localField: "services.serviceid",
                    foreignField: "serviceid",
                    as: "serviceInfo"
                }
            },
            {
                $lookup:
                {
                    from: "users",
                    localField: "services.slotid",
                    foreignField: "workingHour.schedule._id",
                    as: "slotInfo"
                }
            },
            {
                $project: {
                    _id: 1,
                    salonid: { $ifNull: ["$salonid", ""] },
                    bookingdate: { $ifNull: ["$bookingdate", ""] },
                    teamid: { $ifNull: ["$services.teamid", ""] },
                    paymentstatus: { $ifNull: ["$paymentstatus", ""] },
                    status: { $ifNull: ["$status", ""] },
                    serviceName: { $ifNull: [{ $first: "$serviceInfo.name" }, ""] },
                    customerFirstName: { $ifNull: [{ $first: "$userInfo.firstName" }, ""] },
                    customerLastName: { $ifNull: [{ $first: "$userInfo.lastName" }, ""] },
                    slotid: { $ifNull: ["$services.slotid", ""] },
                    time: {
                        $first:
                        {
                            $map: {
                                input: {
                                    $filter: {
                                        input: "$slotInfo",
                                        as: "slotrow",
                                        cond: { $eq: ["$$slotrow._id", "$services.teamid"] }
                                    },
                                },
                                as: "slotsls",
                                in: {
                                    time: {
                                        $map: {
                                            input: {
                                                $filter: {
                                                    input: "$$slotsls.workingHour.schedule",
                                                    as: "schedulerow",
                                                    cond: { $eq: ["$$schedulerow._id", "$services.slotid"] }
                                                },
                                            },
                                            as: "servicesls",
                                            in: {
                                                slotid: "$$servicesls._id",
                                                time: "$$servicesls.time",

                                            },
                                        },
                                    },
                                },
                            },
                        }
                    },

                }
            },
            { $match: team }
        ]).exec(async (err, results) => {
            if (err) reject({ message: err })
            if (!results) reject({ message: "ERROR_DATA_RETRIVED" })
            resolve(results)
        })
    })
}

const createBlockService = (req) => {
    return new Promise(async (resolve, reject) => {
        let salonid = req.body.salonid ? req.body.salonid : req.user._id;
        let Obj = {};
          let day;
        if(req.body.active){
            day=false
        }else{
            day=true
        }
        if(req.body.repeat === "None"){
       Obj = {
            repeat:"None",
            teamid:req.body.teamid,
            description:req.body.description,
            startTime:req.body.startTime,
            endTime:req.body.endTime,
            date:req.body.date,
            endDate:req.body.endDate,
            active:day,
        }
        }else if(req.body.repeat === "EveryDay"){
            Obj = {
            repeat:"EveryDay",
            teamid:req.body.teamid,
            description:req.body.description,
            startTime:req.body.startTime,
            endTime:req.body.endTime,
            date:req.body.date,
        }
        }else if(req.body.repeat === "EveryWeek"){
            Obj = {
            repeat:"EveryWeek",
            teamid:req.body.teamid,
            description:req.body.description,
            startTime:req.body.startTime,
            endTime:req.body.endTime,
            date:req.body.date,
            endDate:req.body.endDate,
            everyWeek:req.body.everyWeek
        }
        }  
        
        const query = new Rota({ ...Obj, salonid: salonid,setTimeType:'CustomHours'});
        query.save()
            .then((result) => { resolve(result) })
            .catch((err) => { reject(err)});
    });
};

const getEmployeeBlockService = async (req) => {
    return new Promise(async (resolve, reject) => {
        let days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
        let query = {};
        let team = {};
        let blockDay = {};
        let date;

        if (req.body.date) {
            date =new Date(req.body.date)
        } else {
            date = new Date()  
        }
        let dayName = date.getDay();
        query = { date: { $gte: date } }
        blockDay = {
            $or: [
                { repeat: "None", date: { $lte: date }, endDate: { $gte: date } },
                { repeat: "EveryDay", date: { $lte: date } },
                { repeat: "EvecryWeek", date: { $lte: date }, everyWeek:days[dayName]},
                // { repeat: "EveryOtherWeek", date: { $lte: date }, endDate: { $gte: date } },
            ]
        }
        if (req.body.teamid) {
            team = { teamid: ObjectID(req.body.teamid) }
        }
        req.body.salonid = req.body.salonid ? req.body.salonid : req.user._id
        Rota.aggregate([{ $match: { salonid: ObjectID(req.body.salonid), } },
        { $match: team },
        {
            $project: {
                _id: 1,
                teamid: { $ifNull: ["$teamid", ""] },
                description: { $ifNull: ["$description", ""] },
                repeat: { $ifNull: ["$repeat", "EveryDay"] },
                startTime: 1,
                endTime: 1,
                date: 1,
                endDate: 1,
                everyWeek:1,
                active:1
            },
        },
        { $match: blockDay }
        ]).exec(async (err, results) => {
            if (err) reject({ message: err });
            if (!results) reject({ message: "ERROR_DATA_RETRIVED" });
            resolve(results);
        });
    });
};

module.exports = {
    createAppointmentServices,
    getEmployeeCalenderService,
    createBlockService,
    getEmployeeBlockService
}


