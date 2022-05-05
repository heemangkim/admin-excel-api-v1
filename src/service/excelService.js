const {Workbook} = require("../model/workbook");
const {BadRequestError, InternalServerError} = require("../model/internalServerError");
const {decryptPassword} = require("../utils/crypto");

const createFile = async function (headers, contents, password = null) {
    if (!headers || !contents) throw new BadRequestError("잘못된 요청");

    if (!Array.isArray(headers)) {
        let array = [];
        if (typeof headers === "object") {
            for (let header of headers) {
                array.push(header);
            }
            headers = array;
        } else throw new BadRequestError("잘못된 요청");
    }

    let workbook = new Workbook(headers);

    let newWorkbook = await workbook.create(contents);
    if (!newWorkbook.file) throw new InternalServerError("파일 생성중 에러 발생");


    // 암호화 파일 생성
    if (password) {
        const decryptedPassword = decryptPassword(password);
        if (!decryptedPassword) throw new InternalServerError("비밀번호 생성 오류");

        return await newWorkbook.file.outputAsync({password: decryptedPassword})
    // 공개 파일 생성
    } else {
        return await newWorkbook.file.outputAsync()
    }
}

const setPasswordFile = async function(file, path, password) {
    if (!file || !password) throw new BadRequestError("잘못된 요청");
    // return to buffer
    return await file.outputAsync({password: password});
}


module.exports = {createFile, setPasswordFile}
