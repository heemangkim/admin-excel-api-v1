const express = require('express');
const path = require('path');
const indexRouter = require('./routes/excelRoutes');
const logger = require('./config/logger');
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./utils/swagger')
const property = require('./utils/properties')

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json({ limit: "50mb", extended: true}));
/** cors **/
app.use(cors({
    origin: property.getCorsDomain(),
    credentials: true
}))


/** swagger UI **/
app.use('/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/** 요청 로그 추가 error, warn, info, http, debug**/
app.use(((req, res, next) => {
    const format = `${req.ip} ${req.hostname} [${new Date()}] "${req.method} ${req.url} ${req.protocol} ${req.header("Content-Length")}"`;
    logger.info(format);
    next();
}));

/** 권한 체크 **/
app.use(((req, res, next) => {
    if (!req.get("username") || !req.get("access-token")) {
        let error = new Error("비인증 사용자");
        error.status = 401;
        next(error);
    } else {
        next();
    }
}));

app.use('/v1', indexRouter);
module.exports = app;
