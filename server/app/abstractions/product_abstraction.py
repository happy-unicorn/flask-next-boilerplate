import uuid
from .. import db
from ..models import ProductModel


class ProductAbstraction:
    @staticmethod
    def create_product(product_data):
        new_product = ProductModel(
            id=str(uuid.uuid4()),
            **product_data
        )
        db.session.add(new_product)
        db.session.commit()
        return new_product

    @staticmethod
    def get_product(**kwargs):
        return ProductModel.query.filter_by(**kwargs).first()

    @staticmethod
    def get_all_products():
        pass

    @staticmethod
    def delete_product(product_data):
        ProductModel.query.filter_by(**product_data).delete()
        db.session.commit()
