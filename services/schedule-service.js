const { Users } = require("../models/UserModel")
var ObjectID = require("mongoose").Types.ObjectId;
const Utility = require("../helpers/Utility");
const moment = require("moment")

const createEmployeeScheduleServices = req => {
    return new Promise(async (resolve, reject) => {
      req.body.salonid = req.body.salonid ? req.body.salonid : req.user._id;
      let salon = await Users.findOne({_id:req.body.salonid});
      let totalminute = await Utility.countTime(salon.workingHour.monday)*60/req.body.interval;
      let rhours ;
      let rminutes;
      function timeConvert(n) {
        var num = n;
        var hours = (num / 60);
         rhours = Math.floor(hours);
        var  minutes = (hours - rhours) * 60;
         rminutes = Math.round(minutes);
       return  rhours + " " + rminutes + " ";
        }

    timeConvert(totalminute)
    let value = {
      interval: `0${rhours}:${rminutes}`,
      startTime: salon.workingHour.monday.startTime,
      endTime: salon.workingHour.monday.endtime
    };
    
    var inputDataFormat = "HH:mm:ss";
    var outputFormat = "HH:mm a";
    
    var tmp = moment(value.interval, inputDataFormat);
    var dif = tmp - moment().startOf("day");
    
    var startIntervalTime = moment(value.startTime, inputDataFormat).add(dif-value.interval, "ms");
    var endIntervalTime = moment(value.startTime, inputDataFormat).add(dif+value.interval, "ms");
    var finishTime = moment(value.endTime, inputDataFormat);
    
    var intervals = [];
    const prepareIntervals=()=> {
      
      while(startIntervalTime < finishTime) {
        var format = {time:startIntervalTime.format(outputFormat) + " - " + endIntervalTime.format(outputFormat)};
        intervals.push(format);
        startIntervalTime.add(dif, "ms");
        endIntervalTime.add(dif, "ms");
      }
      
      return intervals;
    }
   prepareIntervals()
        Users.updateMany(
          { salonid: req.body.salonid,userType:"Employee" },
          { $set: {"workingHour.schedule":intervals} },
          { new: true, useFindAndModify: false }
        )
          .then(membership => {
            if (!membership) reject({ message: "EMPLOYEE_NOT_FOUND" })
            resolve(membership)
          })
          .catch(err => reject({ message: "EMPLOYEE_NOT_FOUND" }))
      })
  }

module.exports ={
    createEmployeeScheduleServices
};