from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# MySQL DB Connection
def get_db_connection():
    try:
        connection = mysql.connector.connect(
            host="localhost",
            user="root",
            password="121212",
            database="morpheusUsers"
        )
        return connection
    except mysql.connector.Error as err:
        return None
    
# Root route
@app.route('/')
def home():
    return jsonify({"message": "Welcome to the User API."}), 200

# Route: get all users
@app.route('/', method=['GET'])
def get_users():
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Database connection failed."}), 500
    
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT * from morpheusUsers;')
    users = cursor.fetchall()
    cursor.close()
    conn.close()

    if not users:
        return jsonify({"message": "No users found"}), 404
    
    return jsonify(users), 200

# Route: get single user by ID
#@app.route(method=['POST'])
def get_user(userID):
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Database connection failed."}), 500
    
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT * FROM morpheusUsers WHERE id = %s;', (userID))
    user = cursor.fetchone()
    cursor.close()
    conn.close()

    if not user:
        return jsonify({"message": "User not found"}), 404
    
    return jsonify(user), 200

# Route: create new user
#@app.route(method=['POST'])
def create_user():
    data = request.get_json()
    if not data or not all(key in data for key in ["username", "email", "password"]):
        return jsonify({"error": "Missing required fields"}), 400
    
    username = data["username"]
    email = data["email"]
    password = data["password"]
    # first_name = data["first_name"]

    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Database connection failed."}), 500
    
    cursor = conn.cursor()
    try:
        cursor.execute(
            'INSERT INTO morpheusUsers (username, email, password) VALUES (%s, %s, %s, %s)',
            (username, email, password)
        )
        conn.commit()
        userID = cursor.lastrowid
    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500
    finally:
        cursor.close()
        conn.close()
    
    return jsonify({"message": "User created successfully", "userID": userID}), 201

# Route: update a user

        