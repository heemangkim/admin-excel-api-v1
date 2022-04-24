const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const indexRouter = require('./routes/routes');
const logger = require('./config/logger');
const {requestHandler} = require("express-intercept");
const {CustomError, UNAUTHORIZED} = require("./http/customError");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/** 요청 로그 추가 error, warn, info, http, debug**/
app.use(((req, res, next) => {
    logger.info(req.url);
    next();
}));

/** 권한 체크 **/
app.use(requestHandler().getRequest(req => {
    if(!req.get("username") || !req.get('access-token')) {
        // throw new CustomError(UNAUTHORIZED.status, UNAUTHORIZED.errorMsg)
    };
}));


app.use('/v1', indexRouter);
module.exports = app;
