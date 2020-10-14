from datetime import datetime
from passlib.hash import bcrypt as bc
from .. import db


class UserModel(db.Model):
    """ User Model for storing user data """
    __tablename__ = 'user'

    id = db.Column(db.String(36), unique=True, nullable=False, primary_key=True)
    email = db.Column(db.String(50), unique=True, nullable=False)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password_hash = db.Column(db.String(72), nullable=False)
    created_on = db.Column(db.DateTime(), default=datetime.utcnow)
    sessions = db.relationship('SessionModel', backref='user', lazy='dynamic')
    products = db.relationship('ProductModel', backref='user', lazy='dynamic')

    @property
    def password(self):
        raise AttributeError('Password: write-only field')

    @password.setter
    def password(self, password):
        self.password_hash = bc.hash(password)
