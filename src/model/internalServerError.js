/**
 *  호출 예시: throw new InternalServerError();
 * */
class InternalServerError extends Error {
    constructor(message) {
        super(message);
        this.name = "InternalServerError";
    }
}

module.exports = {InternalServerError};
