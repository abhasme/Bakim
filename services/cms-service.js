const { Cms } = require("../models/CmsModel");
var ObjectID = require("mongoose").Types.ObjectId;

const addCmsServices = (req) => {
    return new Promise(async (resolve, reject) => {
        // var content = `<html>${req.body.content}</html>`
        const query = new Cms({
            pageName: req.body.pageName,
            content: req.body.content,
            pageUrl: req.body.pageUrl,
        })
        query
            .save()
            .then((result) => {
                resolve(result);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

const updateCmsServices = (req) => {
    return new Promise(async (resolve, reject) => {
        await Cms.findOne({ _id: ObjectID(req.body.cmsid) })
            .then(async (cms) => {
                if (req.body.pageName) {
                    cms.pageName = req.body.pageName;
                }
                if (req.body.pageUrl) {
                    cms.pageUrl = req.body.pageUrl;
                }
                if (req.body.content) {
                    cms.content = req.body.content;
                }
                return cms.save();
            })
            .then((cms) => {
                resolve(cms);
            });
    });
};

const getCmsService = async (req) => {
    return new Promise(async (resolve, reject) => {
        let query = {};
        if (req.body.cmsid) {
            query = { _id: ObjectID(req.body.cmsid) }
        }
        Cms.aggregate([
            { $match: { active: true } },
            {
                $project: {
                    _id: 1,
                    pageName: { $ifNull: ["$pageName", ""] },
                    pageUrl: { $ifNull: ["$pageUrl", ""] },
                    content: { $ifNull: ["$content", ""] },
                    active: { $ifNull: ["$active", ""] },
                    createdAt: { $ifNull: ["$createdAt", ""] },
                    isDeleted: { $ifNull: ["$isDeleted", ""] },
                },
            },
            { $match: query }
        ])
            .exec(async (err, results) => {
                if (err) reject({ message: err });
                if (!results) reject({ message: "ERROR_DATA_RETRIVED" });
                resolve(results);
            });
    });
};

const activeDactiveCmsServices = async (req) => {
    return new Promise(async (resolve, reject) => {
        Cms.findOneAndUpdate(
            { _id: ObjectID(req.body.cmsid) },
            { $set: { active: req.body.active === "true" ? true : false } },
            { new: true, useFindAndModify: false }
        )
            .then((cms) => {
                if (!cms) reject({ message: "CMS_NOT_FOUND" });
                resolve(cms);
            })
            .catch((err) => reject({ message: "CMS_NOT_FOUND" }));
    });
};

module.exports = {
    addCmsServices,
    getCmsService,
    updateCmsServices,
    activeDactiveCmsServices,
};
