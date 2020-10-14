from flask import Blueprint


api = Blueprint('api_v1', __name__)


from .auth import SignUp, SignIn, SignOut, TokenRefresh
from .products import Products


api.add_url_rule('/auth/sign_up', view_func=SignUp.as_view('sign_up_endpoint'))
api.add_url_rule('/auth/sign_in', view_func=SignIn.as_view('sign_in_endpoint'))
api.add_url_rule('/auth/sign_out', view_func=SignOut.as_view('sign_out_endpoint'))
api.add_url_rule('/auth/token/refresh', view_func=TokenRefresh.as_view('token_refresh_endpoint'))
products_view = Products.as_view('products_endpoint')
api.add_url_rule(
    '/products',
    defaults={'product_id': None},
    view_func=products_view,
    methods=['GET'])
api.add_url_rule('/products', view_func=products_view, methods=['POST'])
api.add_url_rule(
    '/products/<string:product_id>',
    view_func=products_view,
    methods=['GET', 'PATCH', 'DELETE'])
