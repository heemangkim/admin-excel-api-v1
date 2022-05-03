var express = require('express');
var router = express.Router();
const {createFile, createStream, getDownloadFilename} = require("../service/excelService");
const {BadRequestError} = require("../model/badRequestError");

router.post('/public-excel-file-sync', async function (req, res, next) {
    try {
        const file = await createFile(req.body.headers, req.body.contents)
        const result = createStream(file);

        res.set('Content-disposition', 'attachment; filename=' + req.body.fileName);
        res.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.set('responseType', 'arraybuffer');

        res.status(201).json({result: true, data: result});

    } catch (e) {
        if (e instanceof BadRequestError) {
            res.status(400).json({message: e.message})
        } else {
            res.status(500).json({message: e.message})
        }
    }
});

router.post('/protect-excel-file-sync', async function (req, res, next) {
    try {
        if (!req.body.password) throw new BadRequestError("비밀번호는 필수값입니다.");
        const file = await createFile(req.body.headers, req.body.contents, req.body.password);
        const result = createStream(file);

        res.set('Content-disposition', `attachment; filename=${getDownloadFilename(req, req.body.fileName)}.xlsx`);
        res.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.set('responseType', 'arraybuffer');

        res.status(201).json({result: true, data: result});

    } catch (e) {
        if (e instanceof BadRequestError) {
            res.status(400).json({message: e.message})
        } else {
            res.status(500).json({message: e.message})
        }
    }
});


module.exports = router;