/**
 *  호출 예시: throw new CustomError();
 * */
class CustomError extends Error {
    constructor(obj) {
        super();
        if(Error.captureStackTrace) {
            Error.captureStackTrace(this, CustomError)
        }

        this.status = obj.status;
        this.errorMsg = obj.errorMsg;
    }
}
module.exports ={CustomError};
