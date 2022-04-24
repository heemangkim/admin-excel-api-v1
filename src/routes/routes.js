var express = require('express');
var router = express.Router();
const {createFile, encryptFile} = require("../service/excelService");

/**
 * 엑셀 파일 API
 **/
router.get('/public-excel-file',  function(req, res, next) {
  res.json({statusCode: CREATED, data: createFile()});
});

/**
 * 암호화 엑셀 파일 API
 **/
router.get('/protect-excel-file', function(req, res, next) {
  createFile().then(file => {
    if (file) {
      const password = 1234;
      res.json({statusCode: CREATED, data: encryptFile(password, file)});
    }
  });
});




module.exports = router;


const CREATED = 201;
const ACCEPTED = 202; //비동기 성공