# Flask API Script

from flask import Flask #, jsonify, request
from flask_cors import CORS
#import mysql.connector
from routes.user_routes import user_routes

app = Flask(__name__)
app.secret_key = 'mySecretKey'

# Enable CORS for all routes
CORS(app)
app.register_blueprint(user_routes, url_prefix='/api')

if __name__ == '__main__':
    app.run(debug=True)
