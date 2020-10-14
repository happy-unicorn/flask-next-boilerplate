from marshmallow import Schema, fields, validate, post_load
from . import BaseSchema


class ProductBaseSchema(Schema):
    pass


class ProductGetSchema(BaseSchema, ProductBaseSchema):
    pass


class ProductPostSchema(BaseSchema, ProductBaseSchema):
    pass


class ProductDeleteSchema(BaseSchema, ProductBaseSchema):
    pass


product_get_schema = ProductGetSchema()
products_get_schema = ProductGetSchema()
product_post_schema = ProductPostSchema()
product_delete_schema = ProductDeleteSchema()
