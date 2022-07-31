const en = require('../locales/en')

const successResponse = (res, msg) => {
  var idata = {
    status: 200,
    message: msg,
  };
  return res.status(200).json(idata);
}

const successResponseWithData = (res, msg, data) => {
  var idata = {
    status: 200,
    message: msg,
    data: data,
  };
  return res.status(200).json(idata);
}

const errorResponse = (res, msg) => {
  var idata = {
    status: 201,
    message: msg,
  };
  return res.status(200).json(idata);
}

const notFoundResponse = (res, msg) => {
  var idata = {
    status: 201,
    message: msg,
  };
  return res.status(200).json(idata);
}

const unauthorizedResponse = (res, msg) => {
  var idata = {
    status: 201,
    message: msg,
  };
  return res.status(200).json(idata);
}

const emailUnVerfiedResponse = (res, msg, data) => {
  var idata = {
    status: 203,
    message: msg,
    data: data,
  };
  return res.status(200).json(idata);
}

const mobileUnVerfiedResponse = (res, msg, data) => {
  var idata = {
    status: 204,
    message: msg,
    data: data,
  };
  return res.status(200).json(idata);
}

const registeredUserResponse = (res, msg, data) => {
  var idata = {
    status: 205,
    message: msg,
    data: data,
  };
  return res.status(200).json(idata);
}

const rejectedUserResponse = (res, msg, data) => {
  var idata = {
    status: 206,
    message: msg,
    data: data,
  };
  return res.status(200).json(idata);
}

const validatioErrorResponse = (res, msg) => {
  var idata = {
    status: 202,
    message: msg,
  };
  return res.status(200).json(idata);
}

const responsePaginate = (res, msg, data) => {
  var idata = {
    status: 200,
    message: msg,
    data: data.docs,
    totalDocs: data.totalDocs,
    totalPages: data.totalPages,
    prevPage: data.prevPage,
    nextPage: data.nextPage,
  };
  return res.status(200).json(idata);
}

const successResponseAggregatePaginate = (req, res, msg, data) => {
  var pagesize = req.body.pagesize ? parseInt(req.body.pagesize) : 25
  var page = req.body.page ? parseInt(req.body.page) : 1
  var totalDocs = data[0].totalDocs.length > 0 ? data[0].totalDocs[0].count : 0;
  var remainder = totalDocs % pagesize;
  var totalPages = remainder ? Math.floor(totalDocs / pagesize) + 1 : Math.floor(totalDocs / pagesize);
  var prevPage = (totalPages > 1) ? page - 1 : null
  var nextPage = (totalPages > 1 && page < totalPages) ? page + 1 : null
  var idata = {
    status: 200,
    message: msg,
    data: data[0].docs,
    totalDocs: totalDocs,
    totalPages: totalPages,
    prevPage: prevPage,
    nextPage: nextPage,
  };
  return res.status(200).json(idata);
}

module.exports = {
  successResponse,
  successResponseWithData,
  errorResponse,
  notFoundResponse,
  unauthorizedResponse,
  validatioErrorResponse,
  responsePaginate,
  successResponseAggregatePaginate,
  emailUnVerfiedResponse,
  mobileUnVerfiedResponse,
  registeredUserResponse,
  rejectedUserResponse
};
