var express = require('express');
var router = express.Router();
const {createFile, setPasswordFile} = require("../service/excelService");
const {createStream, getDownloadFilename} = require("../service/fileService");
const {uploadToS3, getFileFromS3} = require("../service/awsService");

const {BadRequestError} = require("../model/badRequestError");

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

/* filepath url, password*/
router.post('/test', async function (req, res, next) {

    await getFileFromS3(req.body.path, req.body.fileName)
        .then(readFile => {
            setPasswordFile(readFile, req.body.path, req.body.password);
        })
        .then(protectExcel => {
            uploadToS3.single(protectExcel)
        })
        .then(response => {
            if(response) {
              return res.status(200);
            }
        })
        .catch( e => {
            if(e instanceof BadRequestError) {
                return res.status(400).json({result: false, message: e.message});
            }else {
                return res.status(500).json({result: false, message: e.message})
            }
        });
})

module.exports = router;