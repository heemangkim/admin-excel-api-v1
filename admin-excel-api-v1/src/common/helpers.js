const {getDownloadFilename} = require("../service/commonService");

module.exports.validationError = (res, error = 'Data provided is not valid') => {
    addBasicHeaders(res);

    res.statusCode = 422;

    res.end(JSON.stringify({
        status: 'fail',
        error
    }, null, 3));
};

module.exports.error = (res, error = 'An unknown error occurred', statusCode = 500) => {
    addBasicHeaders(res);

    res.statusCode = statusCode;

    res.end(JSON.stringify({
        status: 'fail',
        error
    }, null, 3));
};

module.exports.success = (res, data = null) => {
    addBasicHeaders(res);

    res.statusCode = 200;

    res.end(JSON.stringify({
        status: 'success',
        data
    }, null, 3));
};

module.exports.filestream = (req, res, data = null, filename) => {
    addFileHeaders(req, res, filename);

    res.statusCode = 200;

    res.end(JSON.stringify({
        status: 'success',
        data
    }, null, 3));
};

const addBasicHeaders = (res) => {
    return res.setHeader('Content-Type', 'application/json');
}
const addFileHeaders = (req, res, filename) => {
    res.setHeader('Content-Disposition', `attachment; filename=${getDownloadFilename(req, filename)}.xlsx`);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('responseType', 'arraybuffer');
}