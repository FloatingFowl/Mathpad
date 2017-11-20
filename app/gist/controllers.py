from flask import Blueprint, request, session, jsonify, render_template, redirect
from flask_login import LoginManager, login_required,\
        login_user, logout_user, current_user
from flask_wtf.csrf import CSRFProtect
from app import db, logout_required, load_user
from .models import Gist
from app.scratch.models import Scratch

mod_gist = Blueprint('mod_gist', __name__, url_prefix="")

@mod_gist.route("/nogistret", methods=["POST"])
@login_required
def retgistno():
	ans = Gist.query.filter(Gist.username == current_user.username).all()
	return jsonify({"data":len(ans)})

@mod_gist.route("/addGistAPI", methods=["POST", "GET"])
@login_required
def add():
    head=request.values.get("head")
    username=current_user.username
    ob=Gist(head,username)
    db.session.add(ob)
    db.session.commit()
    response=jsonify({"Gist":"Created"})
    response.headers.add("Access-Control-Allow-Origin","*")
    return response


@mod_gist.route("/viewG")
@login_required
def viewg():
    ans=Gist.query.filter(Gist.username==current_user.username)
    nans=[i.ser() for i in ans]
    response=jsonify({"data":nans})
    response.headers.add('Access-Control-Allow-Origin','*')
    return response


@mod_gist.route("/addScratchToGistAPI")
@login_required
def add_scratch_to():
    shead=request.values.get("scratch_head")
    ghead=request.values.get("gist_head")
    gist=Gist.query.filter(Gist.head==ghead).all()
    for i in gist:
        if i.username==current_user.username:
            gid=i.id
            gob=i
    s=Scratch.query.filter(Scratch.head==shead).all()
    for i in s:
        if i.username==current_user.username:
            sob=i
            break
    gob.scratches.append(sob)
    db.session.commit()
    response=jsonify({"Scratch":"Added"})
    response.headers.add('Access-Control-Allow-Origin',"*")
    return response

@mod_gist.route("/viewGistAPI")
@login_required
def view_scratch():
    
    ghead=request.values.get("head")
    gists=Gist.query.filter(Gist.head==ghead).all()
    for i in gists:
        if i.username==current_user.username:
            scratches=i.scratches
            gid=i.id
            break
    ans=[i.ser() for i in scratches]
    response=jsonify({"data":ans,"id":gid})
    response.headers.add('Access-Control-Allow-Origin','*')
    return response


@mod_gist.route("/deleteGist")
@login_required
def delete_gist():
    ghead=request.values.get("head")
    l=Gist.query.filter(Gist.username==current_user.username).all()
    
    for i in l:
        if i.head==ghead:
            ob=i
            db.session.delete(ob)
            db.session.commit()
            break
    response=jsonify({"deleted":"successfully"})
    response.headers.add('Access-Control-Allow-Origin','*')
    return response


@mod_gist.route("/setPrivacyAPI")
@login_required
def setprivacy():
    ghead=request.values.get("head")
    priv=request.values.get("privacy")
    print( ghead,priv)
    l=Gist.query.filter(Gist.username==current_user.username).all()
    for i in l:
        if i.head==ghead:
            i.privacy=priv
            db.session.commit()
            break
    response=jsonify({"status":"success"})
    response.headers.add('Access-Control-Allow-Origin','*')
    print(response)
    return response

@mod_gist.route("/viewGistByIdAPI")
@login_required
def view_by_id():
    Q=Gist.query.all()
    Q=[i.ser() for i in Q]
    id=request.values.get("id")
    try:
        id=int(id)
        print(id)
        l=Gist.query.filter(Gist.id==id).first()
        print(l)
        print(l.privacy)
        if l.privacy!="public":
            response=jsonify({"success":"false","data":"nothing"})
            response.headers.add('Access-Control-Allow-Origin','*')
            return response

        scratches=l.scratches
        ans=[i.ser() for i in scratches]
        response=jsonify({"success":"true","data":ans,"head":l.head})
        response.headers.add('Access-Control-Allow-Origin','*')
        return response
    except:
        response=jsonify({"success":"bigno","data":"nothing"})
        response.headers.add('Access-Control-Allow-Origin','*')
        return response

@mod_gist.route("/getGistIdAPI")
@login_required
def get_gist_id():
	head=request.values.get("head")
	g=Gist.query.filter(Gist.username==current_user.username).all()
	for i in g:
		if i.head==head:
			val=i.id
			break
	try:
		response=jsonify({"success":"true","id":val})
		response.headers.add('Access-Control-Allow-Origin','*')
		return response
	except:
		response=jsonfify({"success":"false"})
		response.headers.add('Access-Control-Allow-Origin','*')
		return response
	