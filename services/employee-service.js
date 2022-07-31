const { Users } = require('../models/UserModel');
const { ServiceGroup } = require('../models/ServiceGroupModel');
var ObjectID = require('mongoose').Types.ObjectId
const Utility = require('../helpers/Utility')

const getEmployeeListService = async (req) => {
    return new Promise(async (resolve, reject) => {
        var { pagesize, page, sortBy } = await Utility.convertReqtoPaginate(req.query)
        var query = { userType: { $in: ["Employee"] } }
        if (req.query.search) {
            query = {
                $or: [
                    { firstName: RegExp(req.query.search, "i") },
                    { lastName: RegExp(req.query.search, "i") }]
            }
        }
        if (req.query.active === "true") {
            Users.aggregate([
                {
                    $match: {
                        $and: [{ salonid: ObjectID(req.query.salonid) }, { active: true }]
                    }
                },
                {
                    $project: {
                        _id: 1,
                        customerName: { $concat: [{ $ifNull: ["$firstName", ""] }, " ", { $ifNull: ["$lastName", ""] }] },
                        profileImage: { $ifNull: ["$profileImage", ""] },
                        mobile: { $ifNull: ["$mobile", ""] },
                        email: { $ifNull: ["$email", ""] },
                        userType: { $ifNull: ["$userType", ""] },
                        active: { $ifNull: ["$active", ""] },
                        createdAt: { $ifNull: ["$createdAt", ""] },
                        updatedAt: { $ifNull: ["$updatedAt", ""] }
                    }
                },
                { $match: query },
                { $sort: sortBy },
                {
                    $facet: {
                        docs: [{ $skip: (page - 1) * pagesize }, { $limit: pagesize }],
                        totalDocs: [{ $count: 'count' }],
                    }
                }
            ])
                .exec(async (err, results) => {
                    if (err) reject({ message: err });
                    if (!results)
                        reject({ message: "ERROR_DATA_RETRIVED" });
                    resolve(results);
                })
        } else {
            Users.aggregate([
                {
                    $match: {
                        // $and: [{ salonid: ObjectID(req.body.salonid), $or:[ {active:true}]}]
                        $and: [{ salonid: ObjectID(req.query.salonid) }, { active: false }]
                    }
                },
                {
                    $project: {
                        _id: 1,
                        customerName: { $concat: [{ $ifNull: ["$firstName", ""] }, " ", { $ifNull: ["$lastName", ""] }] },
                        profileImage: { $ifNull: ["$profileImage", ""] },
                        mobile: { $ifNull: ["$mobile", ""] },
                        email: { $ifNull: ["$email", ""] },
                        userType: { $ifNull: ["$userType", ""] },
                        active: { $ifNull: ["$active", ""] },
                        createdAt: { $ifNull: ["$createdAt", ""] },
                        updatedAt: { $ifNull: ["$updatedAt", ""] }
                    }
                },
                { $match: query },
                { $sort: sortBy },
                {
                    $facet: {
                        docs: [{ $skip: (page - 1) * pagesize }, { $limit: pagesize }],
                        totalDocs: [{ $count: 'count' }],
                    }
                }
            ])
                .exec(async (err, results) => {
                    if (err) reject({ message: err });
                    if (!results)
                        reject({ message: "ERROR_DATA_RETRIVED" });
                    resolve(results);
                })
        }
    });
}
// const getEmployeeListService = async (req) => {
//     return new Promise(async (resolve, reject) => {
//         var pagesize = req.body.pagesize ? parseInt(req.body.pagesize) : 25
//         var page = req.body.page ? parseInt(req.body.page) : 1
//         var query = { userType: { $in: ["Employee"] } }
//         if (req.body.search) {
//             query = {
//                 $or: [
//                     { firstName: { $regex: req.body.search } },
//                     { lastName: { $regex: req.body.search } }]
//             }
//         }
//         if (req.body.active === "true") {
//             Users.aggregate([
//                 {
//                     $match: {
//                         // $and: [{ salonid: ObjectID(req.body.salonid), $or:[ {active:true}]}]
//                         $and: [{ salonid: ObjectID(req.body.salonid) }, { active: true }]
//                     }
//                 },
//                 {
//                     $project: {
//                         _id: 1,
//                         customerName: { $concat: [{ $ifNull: ["$firstName", ""] }, " ", { $ifNull: ["$lastName", ""] }] },
//                         profileImage: { $ifNull: ["$profileImage", ""] },
//                         mobile: { $ifNull: ["$mobile", ""] },
//                         email: { $ifNull: ["$email", ""] },
//                         userType: { $ifNull: ["$userType", ""] },
//                         active: { $ifNull: ["$active", ""] },
//                         createdAt: { $ifNull: ["$createdAt", ""] },
//                         updatedAt: { $ifNull: ["$updatedAt", ""] }
//                     }
//                 },
//                 { $match: query },
//                 { $sort: req.body.sort_by },
//                 {
//                     $facet: {
//                         docs: [{ $skip: (page - 1) * pagesize }, { $limit: pagesize }],
//                         totalDocs: [{ $count: 'count' }],
//                     }
//                 }
//             ])
//                 .exec(async (err, results) => {
//                     if (err) reject({ message: err });
//                     if (!results)
//                         reject({ message: "ERROR_DATA_RETRIVED" });
//                     resolve(results);
//                 })
//         } else {
//             Users.aggregate([
//                 {
//                     $match: {
//                         // $and: [{ salonid: ObjectID(req.body.salonid), $or:[ {active:true}]}]
//                         $and: [{ salonid: ObjectID(req.body.salonid) }, { active: false }]
//                     }
//                 },
//                 {
//                     $project: {
//                         _id: 1,
//                         customerName: { $concat: [{ $ifNull: ["$firstName", ""] }, " ", { $ifNull: ["$lastName", ""] }] },
//                         profileImage: { $ifNull: ["$profileImage", ""] },
//                         mobile: { $ifNull: ["$mobile", ""] },
//                         email: { $ifNull: ["$email", ""] },
//                         userType: { $ifNull: ["$userType", ""] },
//                         active: { $ifNull: ["$active", ""] },
//                         createdAt: { $ifNull: ["$createdAt", ""] },
//                         updatedAt: { $ifNull: ["$updatedAt", ""] }
//                     }
//                 },
//                 { $match: query },
//                 { $sort: req.body.sort_by },
//                 {
//                     $facet: {
//                         docs: [{ $skip: (page - 1) * pagesize }, { $limit: pagesize }],
//                         totalDocs: [{ $count: 'count' }],
//                     }
//                 }
//             ])
//                 .exec(async (err, results) => {
//                     if (err) reject({ message: err });
//                     if (!results)
//                         reject({ message: "ERROR_DATA_RETRIVED" });
//                     resolve(results);
//                 })
//         }
//     });
// }

const updateEmployeeService = async (req) => {
    return new Promise(async (resolve, reject) => {
        if (req.file && req.file.path) { req.body.profileImage = req.file.path }
        if (req.body.provideService) { req.body.provideService }
        if (req.body.firstName) { req.body.firstName }
        if (req.body.lastName) { req.body.lastName }
        if (req.body.access) { req.body.access }
        // if (req.body.provideService) {
        //     employeeDetail.provideService = req.body.provideService;
        // }
        /*==== Controle Access Logic Start ====*/
        var employeeDetail;
        if (req.body.basicAccess === "basicAccess") {
            employeeDetail = { permission: [{ ownCalendar: true }] }
        } else if (req.body.ownerAccess === "ownerAccess") {
            employeeDetail = {
                permission: [
                    {
                        ownCalendar: true,
                        allCalendar: true,
                        menu: true,
                        team: true,
                        client: true,
                        marketingTool: true,
                        settings: true,
                        reports: true,
                    }
                ]
            }
        } else if (req.body.customiseAccess === "customiseAccess") {
            employeeDetail = {
                permission: [
                    {
                        ownCalendar: req.body.ownCalendar,
                        allCalendar: req.body.allCalendar,
                        menu: req.body.menu,
                        team: req.body.team,
                        client: req.body.client,
                        marketingTool: req.body.marketingTool,
                        settings: req.body.settings,
                        reports: req.body.reports,
                    }
                ],
            }
        }
        /*==== Controle Access Logic End ====*/
        // await Users.findOneAndUpdate(
        //     { _id: ObjectID(req.body.employeeid) },
        //     {
        //         $set: req.body
        //     },
        //     { new: true, useFindAndModify: false }
        // )
        await Users.findOneAndUpdate(
            { _id: ObjectID(req.body.employeeid) },
            {
                $set: {
                    "employeeDetail.permission": employeeDetail.permission,
                    "employeeDetail.provideService": req.body.provideService,
                    profileImage: req.body.profileImage,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    "employeeDetail.access": req.body.access,
                }
            },
            { new: true, useFindAndModify: false }
        )
            .then((users) => {
                if (!users) reject({ message: "USER_NOT_FOUND" });
                resolve(users);
            })
            .catch((err) => reject({ message: "USER_NOT_FOUND" }));
    });
};

const updateTeamMemberDetailServices = async (req) => {
    return new Promise(async (resolve, reject) => {
        var employeeid = req.body.employeeid;
        Users.findOneAndUpdate(
            { _id: ObjectID(employeeid) },
            {
                aboutUs: req.body.aboutUs,
                "employeeDetail.jobTitle": req.body.jobTitle,
            },
            { new: true, useFindAndModify: false }
        )
            .then(async (portfolio) => {
                if (!portfolio) reject({ message: "USER_NOT_FOUND" });
                resolve(portfolio);
            })
            .catch((err) => {
                reject({ message: err });
            });
    });
};

const addTeamMemberServiceService = async (req) => {
    return new Promise(async (resolve, reject) => {
        await Users.findOneAndUpdate(
            {
                $and: [
                    { _id: ObjectID(req.body.employeeid) },
                    { "employeeDetail.provideService ": true },
                ],
            },
            {
                $set: {
                    "employeeDetail.assignedService":
                        req.body.employeeDetail.assignedService,
                },
            },
            { new: true, useFindAndModify: false }
        )
            .then((users) => {
                if (!users) reject({ message: "USER_NOT_FOUND" });
                resolve(users);
            })
            .catch((err) => reject({ message: "USER_NOT_FOUND" }));
    });
};

const getTeamMemberServiceService = async (req) => {
    return new Promise(async (resolve, reject) => {
        req.body.salonid = req.body.salonid ? req.body.salonid : req.user._id;
        var serviceInfo = await Users.EmployeeServiceInfo(req.body.employeeid, req.body.salonid)
        await ServiceGroup.aggregate([
            {
                $lookup: {
                    from: "services",
                    localField: "services",
                    foreignField: "_id",
                    as: "servicesinfo"
                }
            },
            {
                $project: {
                    _id: 1,
                    name: { $ifNull: ["$name", ""] },
                    servicelist: {
                        $map: {
                            input: {
                                $filter: {
                                    input: "$servicesinfo",
                                    as: "servicesrow",
                                    cond: "$$servicesrow.active"
                                }
                            },
                            as: "servicesls",
                            in: {
                                name: "$$servicesls.name",
                                serviceid: "$$servicesls._id",
                                has_service: {
                                    $in: ["$$servicesls._id", serviceInfo]
                                },
                            }
                        }
                    }
                },
            },
        ]).exec(async (err, results) => {
            if (err) reject({ message: err });
            if (!serviceInfo) reject({ message: "ERROR_DATA_RETRIVED" });
            var data = { groupservice: results }
            resolve(data);
        });
    });

};

const getEmployeeInfoService = async (req) => {
    return new Promise(async (resolve, reject) => {
        salonid = req.body.salonid ? req.body.salonid : req.user._id;
        employeeid = req.body.employeeid;
        Users.aggregate([
            { $match: { _id: ObjectID(employeeid) } },
            { $match: { userType: "Employee" } },
            { $unwind: '$employeeDetail' },
            {
                $project: {
                    _id: 1,
                    profileImage: { $ifNull: ["$profileImage", ""] },
                    customerName: { $concat: [{ $ifNull: ["$firstName", ""] }, " ", { $ifNull: ["$lastName", ""] }] },
                    mobile: { $ifNull: ["$mobile", ""] },
                    email: { $ifNull: ["$email", ""] },
                    provideService: { $ifNull: ["$employeeDetail.provideService", ""] },
                    permission: { $ifNull: ["$employeeDetail.permission", []] },
                    userType: { $ifNull: ["$userType", ""] },
                    active: { $ifNull: ["$active", ""] },
                    updatedAt: { $ifNull: ["$updatedAt", ""] }
                }
            },
        ])
            .exec(async (err, results) => {
                if (err) reject({ message: err });
                if (!results)
                    reject({ message: "ERROR_DATA_RETRIVED" });
                resolve(results[0]);
            })
    });
}

const deleteEmployeeService = async (req) => {
    return new Promise(async (resolve, reject) => {
        var salonid = req.body.salonid;
        await Users.updateMany(
            { "salonDetail.prefferedLanguage.languageid": ObjectID(salonid) },
            { $pull: { "salonDetail.prefferedLanguage": { salonid: ObjectID(salonid) } } },
        )
        await Users.findByIdAndDelete(
            { _id: req.body.salonid },
        )
            .then((salon) => {
                if (!salon) reject({ message: "USER_NOT_FOUND" });
                resolve(salon);
            })
            .catch((err) => reject({ message: "USER_NOT_FOUND" }));
    });
};

module.exports = {
    getEmployeeListService,
    updateEmployeeService,
    updateTeamMemberDetailServices,
    addTeamMemberServiceService,
    getTeamMemberServiceService,
    getEmployeeInfoService,
    deleteEmployeeService,
}