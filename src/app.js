var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var indexRouter = require('./routes/excel');
const logger = require('./config/logger');
const {requestHandler} = require("express-intercept");

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(requestHandler().getRequest(req => {
    if(!req.get("username") || !req.get('access-token')) {
        console.log('header 추가해')
    };
}));

app.use(((req, res, next) => {
    // logger.error('error 메시지');
    // logger.warn('warn 메시지');
    // logger.info('info 메시지');
    // logger.http('http 메시지');
    // logger.debug('debug 메시지');
    next();
}));


app.use('/v1', indexRouter);
module.exports = app;
