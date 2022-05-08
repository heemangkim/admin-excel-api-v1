const http = require("http");
const router = require('./router');
const routes = require('./src/routes/index');
const {getCorsDomain} = require("./src/common/properties")

// handle the error safely
process.on('uncaughtException', function(err) {
    console.log('uncaughtException');
    console.error(err.stack);
    console.log(err);
});

const server = http.createServer(async (req, res) => {
    const headers = {
        "Access-Control-Allow-Origin": getCorsDomain(),
        "Access-Control-Allow-Methods": "OPTIONS, POST, GET, PUT",
        /** add other headers as per requirement */
    };

    if (req.method === "OPTIONS") {
        res.writeHead(204, headers);
        res.end();
        return;
    }

    await router(req, res, routes);
})

const PORT = 8000
server.listen(PORT, () => {
    console.log(`server is listening on PORT ${PORT}`)
})