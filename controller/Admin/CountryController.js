const {successResponse , errorResponse, successResponseWithData, responsePaginate} = require('../../helpers/Response');
var ObjectID = require('mongoose').Types.ObjectId
const countryservice = require('../../services/country-service')
const translate = require('../../locales/translate')


// Add New Country
const  countryCreate = async(req, res) => {
    countryservice.createCountryServices(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_INSERTED_SUCCESS, data);
    })
    .catch((err) => {
        return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_INSERTED);
    });
}

const stateCreate = async(req, res) => {
    countryservice.createStateServices(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_INSERTED_SUCCESS, data);
    })
    .catch((err) => {
        return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_INSERTED);
    });
}

const cityCreate = async(req, res) => {
    countryservice.createCityServices(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_INSERTED_SUCCESS, data);
    })
    .catch((err) => {
        return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_INSERTED);
    });
}



// Update Country
const  updateCountry = async(req, res) => {
    countryservice.updateCountryServices(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_UPDATED_SUCCESS, data);
    })
    .catch((err) => {
        return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
    });
}

// Update State
const updateState = async(req, res) => {
    countryservice.updateStateServices(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_UPDATED_SUCCESS, data);
    })
    .catch((err) => {
        return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_UPDATE);
    });
}

// Update City
const updateCity = async(req, res) => {
    countryservice.updateCityServices(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_UPDATED_SUCCESS, data);
    })
    .catch((err) => {
        return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
    });
}

// // Delete Country
// const  countryDelete = async(req, res) => {
//     countryservice.countryDeleteServices(req).then((data) => {
//         return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_UPDATED_SUCCESS, data);
//     })
//     .catch((err) => {
//         return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
//     });
// }
// // Delete State
// const  stateDelete = async(req, res) => {
//     countryservice.stateDeleteServices(req).then((data) => {
//         return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_UPDATED_SUCCESS, data);
//     })
//     .catch((err) => {
//         return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
//     });
// }

module.exports = {
    countryCreate,
    stateCreate,
    cityCreate,
    updateCountry,
    updateState,
    updateCity,
    // countryDelete,
    // stateDelete,
};
