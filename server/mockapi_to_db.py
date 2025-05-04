import requests
import mysql.connector

# 1. API Endpoints
users_url = 'https://67cfa704823da0212a82e739.mockapi.io/users'
entries_url = 'https://67cfa704823da0212a82e739.mockapi.io/journals'

# 2. Fetch data
users = requests.get(users_url).json()
entries = requests.get(entries_url).json()

# 3. Connect to MySQL
db = mysql.connector.connect(
    host="localhost",
    user="manasi",
    password="121212454545",
    database="DreamJournal"
)
cursor = db.cursor()

# 4. Insert users
for user in users:
    cursor.execute(
        "INSERT INTO Users (User_ID, Username, Email, Password) VALUES (%s, %s, %s, %s)",
        (int(user['id']), user['username'], user['email'], user['password'])
    )

# 5. Insert journal entries (note the field names!)
for entry in entries:
    cursor.execute(
        "INSERT INTO Journals (Entry_Name, Journal_Entry, User_ID) VALUES (%s, %s, %s)",
        (entry['entryName'], entry['entry'], int(entry['userId']))
    )

# 6. Finalize
db.commit()
cursor.close()
db.close()

print("✅ Users and journal entries inserted into MySQL!")
