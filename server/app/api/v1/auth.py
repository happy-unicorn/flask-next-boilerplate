from flask import request
from flask.views import MethodView
from ...schemas import sign_up_schema, sign_in_schema, sign_out_schema, refresh_token_schema
from ...services import AuthService, CheckService, NoAuthorizationHeader


class SignUp(MethodView):
    def post(self):
        body = request.get_json()
        data = sign_up_schema.load(body)
        payload = AuthService.sign_up_user(data)
        return sign_up_schema.dump({
            'message': 'Successful sign up',
            'payload': payload
        }), 201


class SignIn(MethodView):
    def post(self):
        body = request.get_json()
        data = sign_in_schema.load(body)
        payload = AuthService.sign_in_user(data)
        return sign_in_schema.dump({
            'message': 'Successful sign in',
            'payload': payload
        }), 200


class SignOut(MethodView):
    def post(self):
        authorization_header = request.headers.get('Authorization', None)
        CheckService.handle_checks([
            authorization_header is None
        ], NoAuthorizationHeader)
        refresh_token = authorization_header.split(' ')[1]
        AuthService.sign_out_user({
            'refresh_token': refresh_token
        })
        return sign_out_schema.dump({
            'message': 'Successful sign out'
        }), 200


class TokenRefresh(MethodView):
    def post(self):
        authorization_header = request.headers.get('Authorization', None)
        CheckService.handle_checks([
            authorization_header is None
        ], NoAuthorizationHeader)
        refresh_token = authorization_header.split(' ')[1]
        body = request.get_json()
        data = refresh_token_schema.load(body)
        payload = AuthService.refresh_token({
            **data,
            'refresh_token': refresh_token
        })
        return refresh_token_schema.dump({
            'message': 'Successful token refresh',
            'payload': payload
        }), 200
