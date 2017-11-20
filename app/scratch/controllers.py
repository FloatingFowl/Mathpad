from flask import Blueprint, request, session, jsonify, render_template, redirect
from flask_login import LoginManager, login_required,\
                                login_user, logout_user, current_user
from flask_wtf.csrf import CSRFProtect
from app import db, logout_required, load_user
from .models import Scratch

mod_scratch = Blueprint('mod_scratch', __name__, url_prefix="")


@mod_scratch.route("/addScratchD")
@login_required
def add():
    st = request.values.get("data")
    h = request.values.get("head")
    username=current_user.username
    s = Scratch(st, h,username)
    db.session.add(s)
    db.session.commit()
    response = {"sucess": "sucess"}
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@mod_scratch.route("/view")
@login_required
def view():
    ans = Scratch.query.filter(Scratch.username==current_user.username).all()
    nans = [i.ser() for i in ans]
    response = {"data": nans}
    print(response)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@mod_scratch.route("/update")
@login_required
def update():
    oldh = request.values.get("oldh")
    newh = request.values.get("newh")
    news = request.values.get("data")
    print(oldh,newh,news)
    Q=Scratch.query.filter(Scratch.username==current_user.username).all()
    for i in Q:
        print(i.ser())
        if i.head==oldh:
            print(i)
            i.head=newh
            i.data=news
            break

    
    db.session.commit()
    response = jsonify({"Update": "Worked"})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@mod_scratch.route("/delete")
@login_required
def delete():
    head = request.values.get("head")
    print(head)
    s = Scratch.query.filter(Scratch.username == current_user.username).all()
    for i in s:
        if i.head==head:
            db.session.delete(i)
            break

    db.session.commit()
    response = jsonify({"deleted": "true"})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
