import os
from flask_migrate import MigrateCommand
from flask_script import Manager
from app import create_app, models


app = create_app(os.environ.get('FLASK_ENV'))
manager = Manager(app)


manager.add_command('db', MigrateCommand)


if __name__ == '__main__':
    manager.run()