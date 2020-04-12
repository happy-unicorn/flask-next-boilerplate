from marshmallow import Schema, fields


class BaseSchema(Schema):
    message = fields.String(dump_only=True)
