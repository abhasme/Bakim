const bcrypt = require("bcrypt")
const nodemailer = require("nodemailer")
const jwt = require("jsonwebtoken");
const {
  JWT_SECRET,
  JWT_TOKEN_EXPIRESDAYS,
  EMAIL_SMTP_HOST,
  EMAIL_SMTP_PORT,
  EMAIL_SMTP_USERNAME,
  EMAIL_SMTP_PASSWORD,
} = require("../config/constants")
const fs = require("fs")
const encryptPassword = async password => {
  return new Promise(async (resolve, reject) => {
    bcrypt.hash(password, 10, (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  })
}
const generateRandomNumber = (length = 4) => {
  var text = ""
  var possible = "123456789"
  for (var i = 0; i < length; i++) {
    var sup = Math.floor(Math.random() * possible.length)
    text += i > 0 && sup == i ? "0" : possible.charAt(sup)
  }
  return Number(text)
}

const generateAuthToken = userinfo => {
  var token = ""
  const jwtConfig = { expiresIn: JWT_TOKEN_EXPIRESDAYS }
  token = jwt.sign(userinfo, JWT_SECRET, jwtConfig)
  return token
}

const verifyToken = (req, res, token) => {
  var result = false
  if (token) {
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err)
        return Response.unauthorizedResponse(
          res,
          "User not authorized to access (invalid token)."
        )
      req.user = user
      result = true
    })
  }
  return result
}

const destroyAuthToken = token => {
  var tokenexpaire = ""

  tokenexpaire = jwtr.destroy(token)
  return tokenexpaire
}
// const destroyAuthToken = (req, res, token) => {
//   var result = false;

//   if (token) {
//     jwtr.destroy(token, (err, user) => {
//       if (err)
//         return Response.unauthorizedResponse(
//           res,
//           "User not authorized to access (invalid token)."
//         );
//       req.user = user;
//       result = true;
//     });
//   }
//   console.log(result);

//   return result;
// };
const checkPassword = (password, hashPassword) => {
  return new Promise(async (resolve, reject) => {
    bcrypt.compare(
      password.toString(),
      hashPassword.toString(),
      (err, data) => {
        if (err) reject(err)
        resolve(data)
      }
    )
  })
}
const convertObject = data => {
  var result = null
  var us1 = JSON.stringify(data)
  var us2 = JSON.parse(us1)
  result = us2
  return result
}
const fileUploadFolderName = req => {
  var urlname = req.url.split("/")[1]
  switch (urlname) {
    case "category":
      var foldername = "category/"
      break
    case "subcategory":
      var foldername = "subcategory/"
      break
    case "customercreate":
      var foldername = "users/"
      break
    case "customerupdate":
      var foldername = "users/"
      break
    case "providercreate":
      var foldername = "provider/"
      break
    case "providerupdate":
      var foldername = "provider/"
      break
    default:
      var foldername = ""
  }
  return foldername
}

const sendEmail = async (sendto, subject, message) => {
  try {
    let testAccount = await nodemailer.createTestAccount()
    let transporter = nodemailer.createTransport({
      host: EMAIL_SMTP_HOST,
      port: EMAIL_SMTP_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: EMAIL_SMTP_USERNAME,
        pass: EMAIL_SMTP_PASSWORD,
      },
    })

    let info = await transporter.sendMail({
      from: subject,
      to: sendto, // list of receivers
      subject: subject, // Subject line
      html: message, // html body
    })
  } catch (err) {
    console.log(err)
  }
}

const removeFileFromPath = async filepath => {
  if (filepath.isArray) {
    console.log("remove multiple file")
    filepath.map(file => {
      if (fs.existsSync(file)) {
        fs.unlinkSync(file, err => {
          if (err) {
            console.log(err)
          }
        })
      }
    })
  } else if (fs.existsSync(filepath)) {
    fs.unlinkSync(filepath, err => {
      if (err) {
        console.log(err)
      }
    })
  }
}

const convertReqtoPaginate = async data => {
  var pagesize = data.pagesize ? parseInt(data.pagesize) : 1000
  var page = data.page ? parseInt(data.page) : 1
  var orderby = data.orderby ? parseInt(data.orderby) : 1
  var sortfield = data.sort_by ? data.sort_by : "createdAt"
  var sortBy = { [sortfield]: orderby }
  return { pagesize: pagesize, page: page, sortBy: sortBy }
}

const generateOrderId = (length = 9) => {
  var text = ""
  var possible = "123456789"
  for (var i = 0; i < length; i++) {
    var sup = Math.floor(Math.random() * possible.length)
    text += i > 0 && sup == i ? "0" : possible.charAt(sup)
  }
  return Number(text)
}
const countTime = (weekDay) => {
  var startTime = weekDay.startTime
  var endtime = weekDay.endtime
  const startTimeArray = startTime.split(":");
  const endtimeArray = endtime.split(":");
  var sumTime = (parseInt((Math.abs((endtimeArray[0]) - (startTimeArray[0]))) * 60 + Math.abs((endtimeArray[1]) - (startTimeArray[1]))))
  return Number(sumTime / 60)
}

const dateAndTime = (date, startTime, endTime) => {
  let days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
  let day = new Date(date).getDay()
  let dayName = days[day]
  let dayString;
  let openingTime = { $lte: parseInt(startTime) }
  let closingTime = { $gte: parseInt(endTime) }
  if ("monday" == dayName) {
    dayString = { $and: [{ monday: true }, { mondayStartTime: openingTime, mondayEndTime: closingTime }] };
  } else if ("tuesday" == dayName) {
    dayString = { $and: [{ tuesday: true }, { mondayStartTime: openingTime, mondayEndTime: closingTime }] };
  } else if ("wednesday" == dayName) {
    dayString = { $and: [{ wednesday: true }, { mondayStartTime: openingTime, mondayEndTime: closingTime }] };
  } else if ("thursday" == dayName) {
    dayString = { $and: [{ thursday: true }, { mondayStartTime: openingTime, mondayEndTime: closingTime }] };
  } else if ("friday" == dayName) {
    dayString = { $and: [{ friday: true }, { mondayStartTime: openingTime, mondayEndTime: closingTime }] };
  } else if ("saturday" == dayName) {
    dayString = { $and: [{ saturday: true }, { mondayStartTime: openingTime, mondayEndTime: closingTime }] };
  } else if ("sunday" == dayName) {
    dayString = { $and: [{ sunday: true }, { mondayStartTime: openingTime, mondayEndTime: closingTime }] };
  }
  return dayString
}



module.exports = {
  encryptPassword,
  generateRandomNumber,
  generateAuthToken,
  verifyToken,
  checkPassword,
  convertObject,
  sendEmail,
  fileUploadFolderName,
  removeFileFromPath,
  destroyAuthToken,
  convertReqtoPaginate,
  generateOrderId,
  countTime,
  dateAndTime,
}
