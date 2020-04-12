import uuid
from passlib.hash import bcrypt as bc
from .. import db
from ..models import UserModel


class UserAbstraction:
    @staticmethod
    def create_user(user_data):
        new_user = UserModel(
            id=str(uuid.uuid4()),
            **user_data
        )
        db.session.add(new_user)
        db.session.commit()
        return new_user

    @staticmethod
    def get_user(**kwargs):
        return UserModel.query.filter_by(**kwargs).first()

    @staticmethod
    def check_password(password_hash, password):
        return bc.verify(password, password_hash)
