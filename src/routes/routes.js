var express = require('express');
var router = express.Router();
const {createFile, createStream} = require("../service/excelService");
const {BadRequestError} = require("../model/badRequestError");

/**
 * 동기 엑셀 파일 API
 * 성공 코드: CREATED(201)
 * 응답: buffered data
 **/

router.post('/public-excel-file-sync', async function (req, res, next) {
    try {
        const file = await createFile(req.body.header, req.body.contents)
        const result = createStream(file);

        res.set('Content-disposition', 'attachment; filename=' + 'test.xlsx');
        res.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.set('responseType', 'arraybuffer');

        res.status(201).json({result: true, fileName: 'test.xlsx', data: result});

    } catch (e) {
        if (e instanceof BadRequestError) {
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
router.post('/protect-excel-file-sync', async function (req, res, next) {
    try {
        if (!res.body.password) throw new BadRequestError("비밀번호는 필수값입니다.");
        const file = await createFile(req.body.header, req.body.contents, res.body.password);
        const result = createStream(file);

        res.set('Content-disposition', 'attachment; filename=' + 'test.xlsx');
        res.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.set('responseType', 'arraybuffer');

        res.status(201).json({result: true, fileName: 'test.xlsx', data: result});

    } catch (e) {
        if (e instanceof BadRequestError) {
            res.status(400).json({message: e.message})
        } else {
            res.status(500).json({message: e.message})
        }
    }
});


module.exports = router;