class ServerError extends Error {

}

export class UnknownError extends ServerError {

}

export class AuthenticationError extends ServerError {

}

export class ValidationError extends ServerError {
    constructor(fields) {
        super();
        this._fields = fields;
    }
    get fields() {
        return this._fields
    }
}

export default class ErrorService {
    static handleError(error, callback) {
        if(error instanceof ValidationError) {
            callback(error.fields);
        }
    }
}