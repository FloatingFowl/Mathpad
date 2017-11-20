from flask import Blueprint, request, session, jsonify, render_template, redirect
from flask_wtf.csrf import CSRFProtect
from flask_wtf import csrf
from flask_login import LoginManager, login_required,\
                                login_user, logout_user, current_user
from sqlalchemy.exc import IntegrityError
from app import db, logout_required, login_manager, load_user
from .models import User
import re

mod_user = Blueprint('mod_user', __name__, url_prefix="")


@mod_user.route('/user_status', methods=["POST"])
def user_status():
    if current_user is not None and current_user.is_authenticated:
        return  jsonify(status="true")
        
    
    return jsonify(status="false")
    


@mod_user.route('/login', methods=["POST"])
@logout_required
def login():

    user = request.form['username']
    password = request.form['password']
    ob = User.query.filter_by(username=user).first()

    if ob is None:
        return jsonify(stat=
                "Username does not exist! Do you mean to register?")

    elif ob.check_pw(password) is True:
        login_user(ob)
        return jsonify(stat=
                "success")

    else:
        return jsonify(stat=
                "Password does not match! Please try again!")


@mod_user.route('/register', methods=["POST"])
@logout_required
def register():
    user = request.form['username']

    if re.match(r'[a-zA-Z0-9-._]{8,}', user) is None:
        return jsonify(stat=
        "Username should only contain [A-Za-z0-9] and [-._] with minimum size 8!")

    password = request.form['password']
    if re.match(r'[a-zA-Z0-9-._]{8,}', password) is None:
        return jsonify(stat=
        "Password should only contain [A-Za-z0-9] and [-._] with minimum size 8!")

    try:
        db.session.add(User(user, password))
        db.session.commit()

    except IntegrityError:
        return jsonify(stat=
                "Username has already been taken!")

    return jsonify(stat=
            "success") 


@mod_user.route("/logout", methods=["POST","GET"])
@login_required
def logout():
    logout_user()
    return jsonify(status="True")


# debugger function
@mod_user.route("/debug_display")
def display():
    t = User.query.all()
    return render_template("debug_display.html", iter=t)

@mod_user.route("/user_name", methods=["POST"])
@login_required
def retuser():
	return current_user.username;
