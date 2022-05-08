// https://www.npmjs.com/package/lambda-api

const api = require("lambda-api")();
const excelController = require("./src/controller/excelController");
api.post("/excel/v1/protect-file", async (req, res) => {
    return await excelController.createProtect(req, res, req.body)
})

api.post("/excel/v1/encrypt-only", async (req, res) => {
    return await excelController.encrypt(req, res, req.body)
})

exports.handler = async (event, context) => {
    // Run the request
    return await api.run(event, context);
};