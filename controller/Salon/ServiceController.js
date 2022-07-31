const { successResponse, errorResponse, successResponseWithData, unauthorizedResponse, successResponseAggregatePaginate,
} = require("../../helpers/Response");
const translate = require("../../locales/translate");
const serviceservice = require("../../services/service-service");
const discountservice = require("../../services/discount-service");
const groupservice = require("../../services/salon-service-group")

/*====Salon Service List ====*/
const getSalonServiceList = async (req, res) => {
  serviceservice.salonServiceListService(req).then((data) => {
      return successResponseWithData(res,translate[req.headers["x-language-key"]].DATA_INSERTED_SUCCESS,data);
    })
    .catch((err) => {
      return errorResponse(res,translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS);
    });
};

const salonGropuAndServiceList = async (req, res) => {
  serviceservice
    .salonGropuAndServiceListService(req)
    .then((data) => {
      return successResponseWithData(res,translate[req.headers["x-language-key"]].DATA_INSERTED_SUCCESS,data);
    })
    .catch((err) => {
      return errorResponse(res,translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS);
    });
};

const addSalonServicePrice = async (req, res) => {
  serviceservice.addSalonServicePricingService(req).then((data) => {
      return successResponseWithData(res,translate[req.headers["x-language-key"]].DATA_INSERTED_SUCCESS,data);
    })
    .catch((err) => {
      return errorResponse(res,translate[req.headers["x-language-key"]].ERROR_DATA_INSERTED);
    });
};

const salonServiceGroupList = async (req, res) => {
  serviceservice.salonServiceGroupListService(req).then((data) => {
      return successResponseWithData(res,translate[req.headers["x-language-key"]].DATA_INSERTED_SUCCESS,data);
    })
    .catch((err) => {
      return errorResponse(res,translate[req.headers["x-language-key"]].ERROR_DATA_INSERTED);
    });
};

const getSalonServiceInfo = async (req, res) => {
  serviceservice.salonServiceInfoService(req).then((data) => {
    return successResponseWithData(res,translate[req.headers["x-language-key"]].DATA_INSERTED_SUCCESS,data);
    })
    .catch((err) => {
      return errorResponse(res,translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS);
    });
};

const salonServiceDropDown = async (req, res) => {
  serviceservice.salonServiceDropDownService(req).then((data) => {
      return successResponseWithData(res,translate[req.headers["x-language-key"]].DATA_INSERTED_SUCCESS,data);
    })
    .catch((err) => {
      return errorResponse(res,translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS);
    });
};

const updateServiceDescription = async (req, res) => {
  serviceservice.updateServiceDescriptionServices(req).then((data) => {
      return successResponseWithData(res,translate[req.headers["x-language-key"]].DATA_UPDATED_SUCCESS,data);
    })
    .catch((err) => {
      return errorResponse(res,translate[req.headers["x-language-key"]].ERROR_DATA_INSERTED);
    });
};

const updateServiceFinePrint = async (req, res) => {
  serviceservice.updateServiceFinePrintServices(req).then((data) => {
      return successResponseWithData(res,translate[req.headers["x-language-key"]].DATA_UPDATED_SUCCESS,data);
    })
    .catch((err) => {
      return errorResponse(res,translate[req.headers["x-language-key"]].ERROR_DATA_INSERTED);
    });
};

const updateServiceDistribution = async (req, res) => {
  serviceservice.updateServiceDistributionServices(req).then((data) => {
      return successResponseWithData(res,translate[req.headers["x-language-key"]].DATA_UPDATED_SUCCESS,data);
    })
    .catch((err) => {
      return errorResponse(res,translate[req.headers["x-language-key"]].ERROR_DATA_INSERTED);
    });
};

const addSalonDiscount = async (req, res) => {
  discountservice.addSalonDiscountService(req).then((data) => {
      return successResponseWithData(res,translate[req.headers["x-language-key"]].DATA_INSERTED_SUCCESS,data);
    })
    .catch((err) => {
      return errorResponse(res,translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS);
    });
};

const getSalonDiscount = async (req, res) => {
  discountservice.getSalonDiscountService(req).then((data) => {
      return successResponseWithData(res,translate[req.headers["x-language-key"]].DATA_INSERTED_SUCCESS,data);
    })
    .catch((err) => {
      return errorResponse(res,translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS);
    });
};

const addMultipleSalonServicePrice = async (req, res) => {
  serviceservice.addMultipleSalonServicePriceService(req).then((data) => {
      return successResponseWithData(res,translate[req.headers["x-language-key"]].DATA_INSERTED_SUCCESS,data);
    })
    .catch((err) => {
      return errorResponse(res,translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS);
    });
};

const addSalonDiscountService = async (req, res) => {
  discountservice.addSalonDiscountServiceService(req).then((data) => {
      return successResponseWithData(res,translate[req.headers["x-language-key"]].DATA_INSERTED_SUCCESS,data);
    })
    .catch((err) => {
      return errorResponse(res,translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS);
    });
};

const getSalonDiscountInfo = async (req, res) => {
  discountservice.getSalonDiscountInfoService(req).then((data) => {
      return successResponseWithData(res,translate[req.headers["x-language-key"]].DATA_INSERTED_SUCCESS,data);
    })
    .catch((err) => {
      return errorResponse(res,translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS);
    });
};

const getSalonDiscountServiceInfo = async (req, res) => {
  discountservice.getSalonDiscountServiceInfoService(req).then((data) => {
      return successResponseWithData(res,translate[req.headers["x-language-key"]].DATA_INSERTED_SUCCESS,data);
    })
    .catch((err) => {
      return errorResponse(res,translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS);
    });
};

const addsalonServiceGroup = async (req, res) => {
  groupservice.addsalonServiceGroupService(req).then((data) => {
      return successResponseWithData(res,translate[req.headers["x-language-key"]].DATA_INSERTED_SUCCESS,data);
    })
    .catch((err) => {
      return errorResponse(res,translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS);
    });
};

const updateServiceGroup = async (req, res) => {
  groupservice.updateServiceGroupService(req).then((data) => {
      return successResponseWithData(res,translate[req.headers["x-language-key"]].DATA_INSERTED_SUCCESS,data);
    })
    .catch((err) => {
      return errorResponse(res,translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS);
    });
};

const updateServiceGroupName = async (req, res) => {
  groupservice.updateServiceGroupNameService(req).then((data) => {
      return successResponseWithData(res,translate[req.headers["x-language-key"]].DATA_INSERTED_SUCCESS,data);
    })
    .catch((err) => {
      return errorResponse(res,translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS);
    });
};

const serviceGroupList = async (req, res) => {
  groupservice.serviceGroupListService(req).then((data) => {
      return successResponseWithData(res,translate[req.headers["x-language-key"]].DATA_INSERTED_SUCCESS,data);
    })
    .catch((err) => {
      return errorResponse(res,translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS);
    });
};

const salonServiceListById = async (req, res) => {
  serviceservice.salonServiceListByIdService(req)
    .then((data) => {
      return successResponseWithData(res,translate[req.headers["x-language-key"]].DATA_INSERTED_SUCCESS,data);
    })
    .catch((err) => {
      return errorResponse(res,translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS);
    });
};

const updateSalonService = async (req, res) => {
  serviceservice.updateSalonServiceService(req).then((data) => {
      return successResponseWithData(res,translate[req.headers["x-language-key"]].DATA_UPDATED_SUCCESS,data);
    })
    .catch((err) => {
      return errorResponse(res,translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS);
    });
};

module.exports = {
  getSalonServiceList,
  salonGropuAndServiceList,
  addSalonServicePrice,
  updateSalonService,
  getSalonServiceInfo,
  salonServiceDropDown,
  updateServiceDescription,
  updateServiceFinePrint,
  updateServiceDistribution,
  salonServiceGroupList,
  addSalonDiscount,
  getSalonDiscount,
  addSalonDiscountService,
  getSalonDiscountInfo,
  getSalonDiscountServiceInfo,
  addMultipleSalonServicePrice,
  addsalonServiceGroup,
  updateServiceGroup,
  updateServiceGroupName,
  serviceGroupList,
  salonServiceListById,
};
