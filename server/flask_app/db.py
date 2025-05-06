# script for db connection
import mysql.connector

def get_db_connection():
    return mysql.connector.connect(
        host = '127.0.0.1',
        user = 'manasi',
        password = '121212454545',
        database = 'DreamJournal'
    )