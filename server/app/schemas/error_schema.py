from marshmallow import Schema, fields
from . import BaseSchema


class ErrorSchema(BaseSchema):
    type = fields.String(dump_only=True)


class FieldsSchema(Schema):
    fields = fields.Raw(dump_only=True)


class FieldsErrorSchema(BaseSchema):
    error = fields.Nested(FieldsSchema)


error_schema = ErrorSchema()
fields_error_schema = FieldsErrorSchema()

