/**
 *  호출 예시: throw new CustomError();
 * */
class CustomError extends Error {
    constructor(status = 500, errorMsg) {
        super();
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, CustomError)
        }

        this.status = status;
        this.errorMsg = errorMsg;
    }
}

// const NO_CONTENT = {status: 204, errorMsg: '데이터가 존재하지 않습니다.'};
const BAD_REQUEST = {status: 400, errorMsg: '잘못된 요청입니다.'};
const UNAUTHORIZED = {status: 401, errorMsg: '비인증된 사용자입니다.'};
const FORBIDDEN = {status: 403, errorMsg: '다운로드 권한이 없는 사용자입니다.'};
const REQUEST_TIMEOUT = {status: 408, errorMsg: '타임아웃 에러'};
const INTERNAL_SERVER_ERROR = {status: 500, errorMsg: '알 수 없는 서버에러입니다.'};

module.exports = {CustomError, BAD_REQUEST, UNAUTHORIZED, FORBIDDEN, REQUEST_TIMEOUT, INTERNAL_SERVER_ERROR};
