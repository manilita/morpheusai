from flask import Blueprint, request, jsonify, session
from db import get_db_connection
import mysql.connector  
import bcrypt

user_routes = Blueprint('user_routes', __name__)

'''@user_routes.route('/users', methods=['GET'])
def get_users():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT * from Users')
    users = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(users)
'''
@user_routes.route('/')
def home():
    return jsonify({"message": "Welcome to the User API."}), 200

'''++++++ USER REQUESTS +++++'''
# Route: User login
@user_routes.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"error": "Username and password are required."}), 400

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM Users WHERE Username = %s", (username,))
    user = cursor.fetchone()
    cursor.close()
    conn.close()

    if user and bcrypt.checkpw(password.encode('utf-8'), user['Password'].encode('utf-8')):
        # Store ID in session
        session['user_id'] = user['User_ID']
        return jsonify({"message": "Login successful!", "user": {"id": user['User_ID'], "username": user['Username']}}), 200
    else:
        return jsonify({"error": "Invalid credentials"}), 401    
# Route: Sign up as a new user
def hashPW(password):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

@user_routes.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    
    # Check if all required fields are present
    if not all(key in data for key in ["username", "password", "email"]):
        return jsonify({"error": "Missing required fields"}), 400

    username = data['username']
    password = data['password']
    email = data['email']
    
    # Validate password strength (you can add more complex validation)
    if len(password) < 6:
        return jsonify({"error": "Password must be at least 6 characters long"}), 400
    
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    
    # Check if the username already exists
    cursor.execute("SELECT * FROM Users WHERE Username = %s", (username,))
    existing_user = cursor.fetchone()
    
    if existing_user:
        cursor.close()
        conn.close()
        return jsonify({"error": "Username already exists"}), 400

    # Hash the password before storing it
    hashed_password = hashPW(password)

    try:
        # Insert the new user into the database
        cursor.execute(
            "INSERT INTO Users (Username, Password, Email) VALUES (%s, %s, %s)",
            (username, hashed_password, email)
        )
        conn.commit()
        user_id = cursor.lastrowid  # Get the ID of the newly created user
    except mysql.connector.Error as err:
        cursor.close()
        conn.close()
        return jsonify({"error": f"Database error: {str(err)}"}), 500
    finally:
        cursor.close()
        conn.close()

    return jsonify({"message": "User created successfully", "userID": user_id}), 201

    '''data = request.get_json()

    if not all(key in data for key in ["username", "password", "email"]):
        return jsonify({"error": "Missing required fields"}), 400
    
    username = data['username']
    password = data['password']
    email = data['email']

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM Users WHERE Username = %s", (username,))
    existing_user = cursor.fetchone()

    if existing_user:
        cursor.close()
        conn.close()
        return jsonify({"error": "Username already exists"}), 400
    
    hashedPW = hashPW(password)

    create_user()
    '''


# Route: user profile
@user_routes.route('/journal_entries', methods=['GET'])
def profile():
    if 'user_id' not in session:
        return jsonify({"error": "user not loggied in"}), 401
    
    user_id = session['user_id']

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM Users WHERE User_ID = %s", (user_id,))
    user = cursor.fetchone()
    cursor.close()
    conn.close()

    if user:
        return jsonify(user), 200
    else:
        return jsonify({"error": "User not found"}), 404
    

# Route: Logout
@user_routes.route('/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)
    return jsonify({"message": "Logged out successfully"}), 200


'''+++++ MYSQL REQUESTS +++++'''
# Route: get all users
@user_routes.route('/users', methods=['GET'])
def get_users():
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Database connection failed."}), 500
    
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT * from users;')
    users = cursor.fetchall()
    cursor.close()
    conn.close()

    if not users:
        return jsonify({"message": "No users found"}), 404
    
    return jsonify(users), 200

# Route: get single user by ID
@user_routes.route('/users/<int:user_id>', methods=['POST'])
def get_user(userID):
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Database connection failed."}), 500
    
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT * FROM Users WHERE User_ID = %s;', (userID))
    user = cursor.fetchone()
    cursor.close()
    conn.close()

    if not user:
        return jsonify({"message": "User not found"}), 404
    
    return jsonify(user), 200

# Route: create new user
'''
@user_routes.route('/signup', methods=['POST'])
def create_user(username, email, password):
    # Hash the password for security
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Database connection failed."}), 500
    
    cursor = conn.cursor()
    try:
        # Insert the new user into the database (user_id is auto-generated)
        cursor.execute(
            "INSERT INTO Users (Username, Email, Password) VALUES (%s, %s, %s)",
            (username, email, hashed_password)
        )
        conn.commit()
        user_id = cursor.lastrowid  # Get the ID of the newly created user
    except mysql.connector.Error as err:
        cursor.close()
        conn.close()
        return jsonify({"error": f"Database error: {str(err)}"}), 500
    finally:
        cursor.close()
        conn.close()
    
    return user_id'''
'''
    data = request.get_json()
    if not data or not all(key in data for key in ["user_id", "username", "email", "password"]):
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
            'INSERT INTO Users (User_ID, Username, Email, Password) VALUES (%s, %s, %s, %s)',
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
'''
# Route: update a user
@user_routes.route('/users/<int:user_id>', methods=['PUT'])
def update_user(userID):
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400
    
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Database connection failed."}), 500
    
    cursor = conn.cursor(dictionary=True)

    # Check if user exists

    cursor.execute('SELECT * FROM Users WHERE User_ID = %s', (userID))
    user = cursor.fetchone()
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    # Update user fields
    username = data.get('username', user['username'])
    email = data.get('email', user['email'])
    password = data.get('password', user['password'])

    try:
        cursor.execute(
            'UPDATE Users SET Username = %s, Email = %s, Password = %s WHERE User_ID = %s',
            (username, email, password)
        )

        conn.commit()

    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500
    finally:
        cursor.close()
        conn.close()

# Route: delete user
@user_routes.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(userID):
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Database connection failed."}), 500
    
    cursor = conn.cursor(dictionary=True)

    # Check if user exists

    cursor.execute('SELECT * FROM Users WHERE User_ID = %s', (userID))
    user = cursor.fetchone()
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    try:
        cursor.execute(
            'DELETE FROM Users WHERE User_ID = %s', (userID)
        )

        conn.commit()

    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500
    finally:
        cursor.close()
        conn.close()
    
    return jsonify({"message": "User deleted successfully"}), 200
    