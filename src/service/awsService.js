// const AWS = require('aws-sdk');
// AWS.config.loadFromPath(__dirname + '/../config/awsconfig.json');
// let s3 = new AWS.S3();
//
// let multer = require('multer');
// let multerS3 = require('multer-s3');
// const path = require("path");

// let uploadToS3 = multer({
//     storage: multerS3({
//         s3: s3,
//         bucket: '',
//         key: (req, file, cb) => {
//             let extension = path.extname(file.originalname);
//             cb(null, Date.now().toString() + extension)
//         },
//         acl: 'public-read-write',
//     })
// })
//
// module.exports = {uploadToS3};