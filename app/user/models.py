from flask_sqlalchemy import SQLAlchemy
from app import db
from hashlib import sha256


class User(db.Model):
    
    __tablename__ = "User"
    username = db.Column(db.String(30), primary_key=True)
    password = db.Column(db.String(70))

    def __init__(self, username, password):
        self.username = username
        pasvar = password.encode("utf-8")
        self.orig_password = password
        self.password = str(sha256(pasvar).hexdigest())

    def __repr__(self):
        return '<User object; username = %r>' % self.username

    def check_pw(self, p2):
        p1 = p2.encode("utf-8")
        if self.password == str(sha256(p1).hexdigest()):
            return True
        return False

    def get_id(self):
        return str(self.username)

    @property
    def is_active(self):
        return True

    @property
    def is_authenticated(self):
        return True

    @property
    def is_anonymous(self):
        return False
