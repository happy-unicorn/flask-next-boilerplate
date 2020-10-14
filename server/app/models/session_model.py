import os
import datetime
from .. import db


class SessionModel(db.Model):
    """ Session Model for storing active sessions """
    __tablename__ = 'session'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    refresh_token = db.Column(db.String(36), nullable=False)
    device_fingerprint = db.Column(db.String(32), nullable=False)
    created_on = db.Column(db.DateTime(), default=datetime.datetime.utcnow)
    expires_on = db.Column(
        db.DateTime(),
        default=lambda: datetime.datetime.utcnow() + datetime.timedelta(seconds=int(os.environ.get('REFRESH_TOKEN_EXPIRES')))
    )
    user_id = db.Column(db.String(36), db.ForeignKey('user.id', ondelete='CASCADE'))
