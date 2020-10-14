from flask import request
from flask.views import MethodView
from flask_jwt_extended import jwt_required, get_jwt_identity
from ...schemas import product_get_schema, products_get_schema, product_post_schema, product_delete_schema
from ...services import ProductService


class Products(MethodView):
    decorators = [jwt_required]

    def get(self, product_id):
        if product_id is None:
            identity = get_jwt_identity()
            payload = ProductService.get_product(identity)
            return product_get_schema.dump({
                'message': '',
                'payload': payload
            }), 200
        else:
            payload = ProductService.get_product(product_id)
            return product_get_schema.dump({
                'message': '',
                'payload': payload
            }), 200

    def post(self):
        body = request.get_json()
        data = product_post_schema.load(body)
        payload = ProductService.add_product(data)
        return product_post_schema.dump({
            'message': 'Product successful created',
            'payload': payload
        }), 201

    def patch(self):
        pass

    def delete(self, product_id):
        ProductService.delete(product_id)
        return product_delete_schema.dump({
            'message': 'Product successful deleted',
        }), 200
