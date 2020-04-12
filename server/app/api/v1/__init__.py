from flask import Blueprint


api = Blueprint('api_v1', __name__)


from .auth import SignUp, SignIn, SignOut, TokenRefresh


api.add_url_rule('/auth/sign_up', view_func=SignUp.as_view('sign_up_endpoint'))
api.add_url_rule('/auth/sign_in', view_func=SignIn.as_view('sign_in_endpoint'))
api.add_url_rule('/auth/sign_out', view_func=SignOut.as_view('sign_out_endpoint'))
api.add_url_rule('/auth/token/refresh', view_func=TokenRefresh.as_view('token_refresh_endpoint'))
