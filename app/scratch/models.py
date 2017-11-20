from flask_sqlalchemy import SQLAlchemy
from app import db
from app.user.models import User
from app.gist.models import Gist

class Scratch(db.Model):

    __tablename__ = 'Scratch'
    id = db.Column(db.Integer, primary_key=True,autoincrement=True)
    data = db.Column(db.String(1000))
    head = db.Column(db.String(200))
    username=db.Column(db.String(30),db.ForeignKey(User.username))
    gist_id=db.Column(db.ForeignKey(Gist.id))
    

    def __init__(self, dat, head,username):
        self.data = dat
        self.head = head
        self.username=username

    def __repr__(self):
        return str(self.id) + str(self.head)

    def ser(self):
        return {"head": self.head, "data": self.data}
