from ..schemas import error_schema, fields_error_schema
from flask import jsonify


def exception_jsonify_handler(error):
    return error_schema.dump({
        'message': error.description
    }), error.code


def marshmallow_validation_error_handler(error):
    return fields_error_schema.dump({
        'message': 'Validation error',
        'type': 'ValidationError',
        'error': {
            'fields': error.messages
        }
    }), 422


def base_field_error_handler(error):
    return fields_error_schema.dump({
        'message': error.description,
        'type': error.type,
        'error': {
            'fields': error.fields
        }
    }), error.code
