import datetime
from .. import db


class ProductModel(db.Model):
    """ Product Model for storing products """
    __tablename__ = 'product'

    id = db.Column(db.String(36), unique=True, nullable=False, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(300))
    created_on = db.Column(db.DateTime(), default=datetime.datetime.utcnow)
    user_id = db.Column(db.String(36), db.ForeignKey('user.id', ondelete='CASCADE'))
