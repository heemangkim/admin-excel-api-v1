var express = require('express');
const winston = require('winston');
const {requestHandler} = require("express-intercept");
const {CustomError} = require("../http/customError");
const app = express();


// Request Interceptors

app.use(requestHandler().getRequest(req => {
  console.log(`req url`)
}));

app.use(requestHandler().getRequest(req => {
  if(!req.getHeader("username") || !req.getHeader('access-token')) throw CustomError(UNAUTHORIZED);
}));



// Response Code And Message
const NO_CONTENT = {status: 204, errorMsg: '데이터가 존재하지 않습니다.'};
const BAD_REQUEST = {status: 400, errorMsg: '잘못된 요청입니다.'};
const UNAUTHORIZED = {status: 401, errorMsg: '비인증된 사용자입니다.'};
const FORBIDDEN = {status: 403, errorMsg: '다운로드 권한이 없는 사용자입니다.'};
const REQUEST_TIMEOUT = {status: 408, errorMsg: '타임아웃 에러'};
const INTERNAL_SERVER_ERROR = {status: 500, errorMsg: '알 수 없는 서버에러입니다.'};