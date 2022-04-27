const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const indexRouter = require('./routes/routes');
const logger = require('./config/logger');
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./utils/swagger')
const property = require('./utils/properties')
require('dotenv').config()

const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/** cors **/
app.use(cors({
    origin: property.getCorsDomain(),
    credentials: true
}))


/** swagger UI **/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/api-docs-v1', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/** 요청 로그 추가 error, warn, info, http, debug**/
app.use(((req, res, next) => {
    const format = `${req.ip} ${req.hostname} [${new Date()}] "${req.method} ${req.url} ${req.protocol} ${req.header("Content-Length")}"`;
    logger.info(format);
    next();
}));

/** 권한 체크 **/
app.use(((req, res, next) => {
    if (!req.get("username") || !req.get('access-token')) {
        res.status(401).json({message: '비인증 사용자입니다.'})
    }
    next();
}));

app.use('/v1', indexRouter);
module.exports = app;
