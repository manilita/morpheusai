# Flask API Script

from flask import Flask 
from flask_cors import CORS
#import mysql.connector
from routes.user_routes import user_routes

app = Flask(__name__)
app.secret_key = 'mySecretKey'
app.config['SESSION_COOKIE_NAME'] = 'mySessionName'

# Enable CORS for all routes
CORS(app, supports_credentials=True, origints = ['http://localhost:3000', 'http://127.0.0.1:3000'])
app.register_blueprint(user_routes, url_prefix='/api')

if __name__ == '__main__':
    app.run(debug=True)
