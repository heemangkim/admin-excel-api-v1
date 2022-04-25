/**
 *  호출 예시: throw new CustomError();
 * */
class BadRequestError extends Error {
    constructor(message) {
        super(message);
        this.name = "BadRequestError";
    }
}

module.exports = {BadRequestError};