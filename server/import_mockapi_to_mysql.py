import requests 
import mysql.connector

# 1. MockAPI Endpoint (update this if needed)
url = 'https://67cfa704823da0212a82e739.mockapi.io/users'  # <-- update to correct endpoint

# 2. Fetch data from MockAPI
response = requests.get(url)
data = response.json()

# 3. Connect to MySQL
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="c01d10edata$$",  
    database="mockapi_data"
)
cursor = db.cursor()

# 4. Insert data into MySQL
for user in data:
    cursor.execute(
        "INSERT INTO users (id, name, email) VALUES (%s, %s, %s)",
        (int(user['id']), user['username'], user['email'])
    )

db.commit()
cursor.close()
db.close()

print("✅ MockAPI data inserted into MySQL!")
