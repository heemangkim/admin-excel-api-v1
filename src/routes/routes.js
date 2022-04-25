var express = require('express');
var router = express.Router();
const {createFile, encryptFile} = require("../service/excelService");
const stream = require("stream");
const {BadRequestError} = require("../model/badRequestError");

/**
 * 동기 엑셀 파일 API
 * 성공 코드: CREATED(201)
 * 응답: buffered data
 **/
router.post('/public-excel-file-sync',  async function(req, res, next) {
  try {
    let download = Buffer.from(await createFile(), 'base64');

    const readStream = new stream.PassThrough();
    readStream.end(download);

    res.status(201)
    res.set('Content-disposition', 'attachment; filename=' + 'test.xlsx');
    res.set('Content-Type', 'text/plain');

    readStream.pipe(res);

  } catch (e) {
    if(e instanceof BadRequestError) {
      res.status(400).json({message: e.message})
    } else {
      res.status(500).json({message: e.message})
    }
  }
});

/**
 * 동기 암호화 엑셀 파일 API
 * 성공 코드: CREATED(201)
 * 응답: buffered data
 **/
router.post('/protect-excel-file-sync', async function(req, res, next) {
  try {
  const download = Buffer.from(await encryptFile(), 'base64');

  var readStream = new stream.PassThrough();
  readStream.end(download);

  res.status(201)
  res.set('Content-disposition', 'attachment; filename=' + 'test.xlsx');
  res.set('Content-Type', 'text/plain');

  readStream.pipe(res);

  } catch (e) {
    if(e instanceof BadRequestError) {
      res.status(400).json({message: e.message})
    } else {
      res.status(500).json({message: e.message})
    }
  }
});




module.exports = router;