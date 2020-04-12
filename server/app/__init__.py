import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flasgger import Swagger
from werkzeug.exceptions import HTTPException
from marshmallow import ValidationError


db = SQLAlchemy()
mg = Migrate()
jwt = JWTManager()
sw = Swagger()


from .api import api_v1
from .services import BaseFieldError
from .handlers import marshmallow_validation_error_handler, exception_jsonify_handler, base_field_error_handler


def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(config_name)

    # TODO: решить эту проблему
    @app.after_request
    def after_request(response):
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE,')
        return response

    db.init_app(app)
    mg.init_app(app, db)
    jwt.init_app(app)
    sw.init_app(app)

    app.register_blueprint(api_v1, url_prefix='/api/v1')

    app.register_error_handler(HTTPException, exception_jsonify_handler)
    app.register_error_handler(BaseFieldError, base_field_error_handler)
    app.register_error_handler(ValidationError, marshmallow_validation_error_handler)

    return app

