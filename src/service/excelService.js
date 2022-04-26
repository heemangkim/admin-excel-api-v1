const {Workbook} = require("../model/workbook");
const {BadRequestError, InternalServerError} = require("../model/internalServerError");
const stream = require("stream");
const {decryptPassword} = require("../lib/crypto");

const createFile = async function (header, contents, password = null) {
    if(!header.length || !contents.length) throw new BadRequestError("잘못된 요청");

    let workbook = new Workbook(header);

    let newWorkbook = await workbook.create(contents);
    if (!newWorkbook.file) throw new InternalServerError("파일 생성중 에러 발생");

    if (password) {
        return await newWorkbook.file.outputAsync({password: decryptPassword(password)})
    } else return await newWorkbook.file.outputAsync()

}

const createStream = function (data) {
    const readStream = new stream.PassThrough();

    var bufferedData = Buffer.from(data, 'base64')
    readStream.end(bufferedData);
    return bufferedData;
}

module.exports = {createFile, createStream}
