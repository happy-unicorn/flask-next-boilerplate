import uuid
from .. import db
from ..models import SessionModel


class SessionAbstraction:
    @staticmethod
    def create_session(session_data):
        new_session = SessionModel(
            refresh_token=str(uuid.uuid4()),
            **session_data
        )
        db.session.add(new_session)
        db.session.commit()
        return new_session

    @staticmethod
    def get_session(**kwargs):
        return SessionModel.query.filter_by(**kwargs).first()

    @staticmethod
    def delete_session(session_data):
        SessionModel.query.filter_by(**session_data).delete()
        db.session.commit()
