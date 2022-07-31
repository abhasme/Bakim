const multer = require("multer")
var fs = require('fs');
const Utility = require('../helpers/Utility')

var storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    var foldername = await Utility.fileUploadFolderName(req);
    const dest = `./uploads/${foldername}`;
    fs.access(dest, function (error) {
      if (error) {
        fs.mkdirSync(dest, { recursive: true });
      }
      return cb(null, dest);
    });
  },
  // destination: function (req, file, cb) {
  //   cb(null, './uploads')
  // },
  filename: function (req, file, cb) {
    var filetype = "";
    if (file.mimetype === "image/gif") {
      filetype = "gif";
    }
    if (file.mimetype === "image/png") {
      filetype = "png";
    }
    if (file.mimetype === "image/jpeg") {
      filetype = "jpg";
    }
    if (file.mimetype === "image/svg") {
      filetype = "svg";
    }
    cb(null, "image-" + new Date().toISOString().replace(/:/g, "") + "." + filetype)
  }
})

var upload = multer({ storage: storage })
module.exports = upload;




