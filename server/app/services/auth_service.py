from flask_jwt_extended import create_access_token
from ..abstractions import UserAbstraction, SessionAbstraction
from . import CheckService
from . import WrongCredentials, BusyCredentials, WrongAuthorization


class AuthService:
    @staticmethod
    def sign_up_user(data):
        CheckService.fields_handle_checks({
            'email': {
                'check': UserAbstraction.get_user(email=data['email']) is not None,
                'field_on_error': 'User with given email address already exists'
            },
            'username': {
                'check': UserAbstraction.get_user(username=data['username']) is not None,
                'field_on_error': 'User with given username already exists'
            }
        }, BusyCredentials)
        user = UserAbstraction.create_user({
            'email': data['email'],
            'username': data['username'],
            'password': data['password']
        })
        session = SessionAbstraction.create_session({
            'device_fingerprint': data['device_fingerprint'],
            'user': user
        })
        return {
            'access_token': create_access_token(identity=user.id),
            'refresh_token': session.refresh_token
        }

    @staticmethod
    def sign_in_user(data):
        user = UserAbstraction.get_user(email=data['email'])
        CheckService.handle_checks([
            user is None or not UserAbstraction.check_password(user.password_hash, data['password'])
        ], WrongCredentials)
        session = SessionAbstraction.create_session({
            'device_fingerprint': data['device_fingerprint'],
            'user': user
        })
        return {
            'access_token': create_access_token(identity=user.id),
            'refresh_token': session.refresh_token
        }

    @staticmethod
    def sign_out_user(data):
        session = SessionAbstraction.get_session(refresh_token=data['refresh_token'])
        CheckService.handle_checks([
            session is None
        ], WrongAuthorization)
        SessionAbstraction.delete_session({
            'refresh_token': data['refresh_token']
        })

    @staticmethod
    def refresh_token(data):
        session = SessionAbstraction.get_session(refresh_token=data['refresh_token'])
        CheckService.handle_checks([
            session is None or data['device_fingerprint'] != session.device_fingerprint
        ], WrongAuthorization)
        user = session.user
        SessionAbstraction.delete_session({
            'refresh_token': data['refresh_token']
        })
        session = SessionAbstraction.create_session({
            'device_fingerprint': data['device_fingerprint'],
            'user': user
        })
        return {
            'access_token': create_access_token(identity=1),
            'refresh_token': session.refresh_token
        }
