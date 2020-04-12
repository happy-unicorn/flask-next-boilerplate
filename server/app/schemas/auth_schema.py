from marshmallow import Schema, fields, validate, post_load
from . import BaseSchema


class AuthBaseSchema(Schema):
    email = fields.Email(required=True, load_only=True)
    password = fields.String(required=True, load_only=True)


class TokenSchema(Schema):
    access_token = fields.String(dump_only=True)
    refresh_token = fields.String(dump_only=True)


class DeviceFingerprintMixinSchema(Schema):
    device_fingerprint = fields.String(required=True, load_only=True)


class SignUpSchema(BaseSchema, AuthBaseSchema, DeviceFingerprintMixinSchema):
    username = fields.String(required=True, load_only=True)
    payload = fields.Nested(TokenSchema)


class SignInSchema(BaseSchema, AuthBaseSchema, DeviceFingerprintMixinSchema):
    payload = fields.Nested(TokenSchema)


class SignOutSchema(BaseSchema):
    pass


class RefreshTokenSchema(BaseSchema, DeviceFingerprintMixinSchema):
    payload = fields.Nested(TokenSchema)


sign_up_schema = SignUpSchema()
sign_in_schema = SignInSchema()
sign_out_schema = SignOutSchema()
refresh_token_schema = RefreshTokenSchema()
