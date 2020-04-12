from werkzeug.exceptions import HTTPException


class BaseFieldError(HTTPException):
    def __init__(self, fields):
        self._fields = fields

    @property
    def fields(self):
        return self._fields

    @fields.setter
    def fields(self, fields):
        self._fields = fields


class NoAuthorizationHeader(HTTPException):
    type = 'NoAuthorizationHeader'
    code = 401
    description = 'Request has no required authorization header'


class WrongAuthorization(HTTPException):
    type = 'WrongAuthorization'
    code = 401
    description = 'Wrong authorization data'


class WrongCredentials(HTTPException):
    type = 'WrongCredentials'
    code = 401
    description = 'Invalid username or password'


class BusyCredentials(BaseFieldError):
    type = 'BusyCredentials'
    code = 409
    description = 'Credentials already exist'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)


class ErrorService:
    pass
