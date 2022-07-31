const { GiftCard } = require("../models/GiftCardModel");
var ObjectID = require("mongoose").Types.ObjectId;
const Utility = require("../helpers/Utility");

const addGiftCardServices = (req) => {
    return new Promise(async (resolve, reject) => {
        const query = new GiftCard(req.body);
        query
            .save()
            .then((result) => {
                resolve(result);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

const updateGiftCardServices = async (req) => {
    return new Promise(async (resolve, reject) => {
        await GiftCard.findOneAndUpdate(
            { _id: ObjectID(req.body.giftid) },
            { $set: req.body },
            { new: true, useFindAndModify: false }
        )
            .then((gift) => {
                if (!gift) reject({ message: "GIFT_NOT_FOUND" });
                resolve(gift);
            })
            .catch((err) => reject({ message: "GIFT_NOT_FOUND" }));
    });
};

const getGiftCardService = async (req) => {
    return new Promise(async (resolve, reject) => {
        var { pagesize, page, sortBy } = await Utility.convertReqtoPaginate(req.query)
        var query = {};
        if (req.query.search) {
            query = { $or: [{ name: RegExp(req.query.search, "i") }] };
        }
        GiftCard.aggregate([
            { $match: { isDeleted: false } },
            {
                $project: {
                    _id: 1,
                    name: { $ifNull: ["$name", ""] },
                    code: { $ifNull: ["$code", 0] },
                    quantity: { $ifNull: ["$quantity", 0] },
                    price: { $ifNull: ["$price", 0] },
                    benifit: { $ifNull: ["$benifit", 0] },
                    expirtDate: { $substr: ["$expirtDate", 0, 10] },
                    createdAt: { $substr: ["$createdAt", 0, 10] },
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
            if (err) reject({ message: err });
            if (!results) reject({ message: "ERROR_DATA_RETRIVED" });
            resolve(results);
        });
    });
};

const deleteGiftCardServices = async (req) => {
    return new Promise(async (resolve, reject) => {
        await GiftCard.findOneAndUpdate(
            { _id: req.body.giftid },
            { isDeleted: true, deletedAt: new Date() },
            { new: true, useFindAndModify: false }
        ).then((gift) => {
            if (!gift) reject({ message: "GIFT_NOT_FOUND" });
            resolve(gift);
        })
            .catch((err) => reject({ message: "GIFT_NOT_FOUND" }));
    });
};

const getGiftCardInfoService = async (req) => {
    return new Promise(async (resolve, reject) => {
        GiftCard.aggregate([
            { $match: { _id: ObjectID(req.body.giftid) } },
            { $match: { isDeleted: false } },
            {
                $project: {
                    _id: 1,
                    name: { $ifNull: ["$name", ""] },
                    code: { $ifNull: ["$code", 0] },
                    quantity: { $ifNull: ["$quantity", 0] },
                    price: { $ifNull: ["$price", 0] },
                    benifit: { $ifNull: ["$benifit", 0] },
                    expirtDate: { $substr: ["$expirtDate", 0, 10] },
                    createdAt: { $substr: ["$createdAt", 0, 10] },
                    active: { $ifNull: ["$active", ""] },
                    createdBy: { $ifNull: ["$createdBy", ""] },
                },
            },
        ]).exec(async (err, results) => {
            if (err) reject({ message: err });
            if (!results) reject({ message: "ERROR_DATA_RETRIVED" });
            resolve(results[0]);
        });
    });
};

module.exports = {
    addGiftCardServices,
    updateGiftCardServices,
    getGiftCardService,
    deleteGiftCardServices,
    getGiftCardInfoService,
};
