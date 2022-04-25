const {Workbook} = require("../model/workbook");
const {uploadToS3} = require('./awsService')
const {BadRequestError, InternalServerError} = require("../model/internalServerError");


const createFile = async function (list) {
    // if(list.length <= 1) throw new  BadRequestError("잘못된 요청");

    var colList = ['테스트1', '테스트2', '테스트3']
    let workbook = new Workbook(colList);

    let newWorkbook = await workbook.create();
    if(!newWorkbook.file) throw new InternalServerError("파일 생성중 에러 발생");

    return await newWorkbook.file.outputAsync().then(data => {
        return data;
    });
}


const encryptFile = async function (list, password) {
    // if(list.length <= 1 || !password) throw new BadRequestError("잘못된 요청");

    var colList = ['테스트1', '테스트2', '테스트3']
    let workbook = new Workbook(colList);

    let newWorkbook = await workbook.create();
    if(!newWorkbook.file) throw new InternalServerError("파일 생성중 에러 발생");

    return await newWorkbook.file.outputAsync({password: password.toString()}).then(data => {
        return data;
    })
}

module.exports = {createFile, encryptFile}
