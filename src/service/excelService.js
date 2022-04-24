const {Workbook} = require("../model/workbook");
const {CustomError, INTERNAL_SERVER_ERROR} = require("../http/customError");
const {uploadToS3} = require('./awsService')
const createFile = async function () {
    var colList = ['테스트1', '테스트2', '테스트3']
    var workbook = new Workbook(colList);

    // 새파일 생성
    workbook.create()
        .then(workbook => {
            if (!workbook.file) {
                workbook.write()
            } else new Error("파일생성 에러");
        })
        .then()
        .then()
        .catch((e) => {throw new CustomError(INTERNAL_SERVER_ERROR.status, e)})

    return workbook;
}

const encryptFile = function () {
    return 'djWJrhencryteFile'
}

function uploadExcelToS3(file) {
    // uploadToS3.single(file)
}

module.exports = {createFile, encryptFile}
