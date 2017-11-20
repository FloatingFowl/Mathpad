from app import db
from flask_sqlalchemy import SQLAlchemy
from app.user.models import User
#from app.scratch.models import Scratch

class Gist(db.Model):
    __tablename__="Gist"
    id=db.Column(db.Integer,primary_key=True,autoincrement=True)
    head=db.Column(db.String(3000))
    username=db.Column(db.String(40),db.ForeignKey(User.username))
    privacy=db.Column(db.String(20))

    scratches=db.relationship("Scratch",backref="Gist",lazy="dynamic")

    def __init__(self,head,username):
        self.head=head
        self.username=username
    
    def ser(self):
        return {"head":self.head,"user":self.username,"id":self.id}
    
    def __repr__(self):
        return str(self.id) + " " + self.head + " " + self.username


    
    

