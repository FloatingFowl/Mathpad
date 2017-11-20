# Import Flask related modules and functools
from flask import Flask, request, Response, \
        redirect, render_template,jsonify
from flask_wtf.csrf import CSRFProtect, CSRFError, generate_csrf
from flask_login import LoginManager, login_required,\
                                login_user, logout_user, current_user
from flask_sqlalchemy import SQLAlchemy
from functools import wraps

# Create Flask object "app" and create database "db"
app = Flask(__name__)
app.config.from_object('config')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
csrf = CSRFProtect(app)

# Flask-login initialization
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "mod_user.register"

# csrf token returner
@app.route('/get_token', methods=["POST"])
@csrf.exempt
def token_getter():
    return generate_csrf()
    

# 404 Error handling
@app.errorhandler(404)
def not_found(error):
    return render_template('singlepage.html'), 200

# CSRF Error handling
@app.errorhandler(CSRFError)
def handle_csrf_error(error):
    return render_template('singlepage.html'), 200

# For pages that require logged_out users
def logout_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if current_user.is_authenticated:
            # return redirect('/')
            return jsonify(message="Unauthorized", success=False), 401
        return f(*args, **kwargs)
    return decorated_function


# for loading the user
@login_manager.user_loader
def load_user(user_id):
    from app.user.models import User
    return User.query.filter_by(username=user_id).first()


# Import a module / component using its blueprint
# handler variable (mod_auth)
from app.user.controllers import mod_user
from app.scratch.controllers import mod_scratch
from app.gist.controllers import mod_gist

# Register blueprints
app.register_blueprint(mod_user)
app.register_blueprint(mod_scratch)
app.register_blueprint(mod_gist)

# Build the database
# Create it using SQLAlchemy
db.create_all()
