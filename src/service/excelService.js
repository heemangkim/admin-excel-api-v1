const {Workbook} = require("../model/workbook");
const {BadRequestError, InternalServerError} = require("../model/internalServerError");
const stream = require("stream");
var iconvLite = require('iconv-lite');
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

const createStream = function (data) {
    const readStream = new stream.PassThrough();

    var bufferedData = Buffer.from(data, 'base64')
    readStream.end(bufferedData);
    return bufferedData;
}

const getDownloadFilename = function (req, filename) {
    var header = req.headers['user-agent'];

    if (header.includes("MSIE") || header.includes("Trident")) {
        return encodeURIComponent(filename).replace(/\\+/gi, "%20");
    } else if (header.includes("Chrome")) {
        return iconvLite.decode(iconvLite.encode(filename, "UTF-8"), 'ISO-8859-1');
    } else if (header.includes("Opera")) {
        return iconvLite.decode(iconvLite.encode(filename, "UTF-8"), 'ISO-8859-1');
    } else if (header.includes("Firefox")) {
        return iconvLite.decode(iconvLite.encode(filename, "UTF-8"), 'ISO-8859-1');
    }

    return filename;
}

module.exports = {createFile, createStream, getDownloadFilename}
