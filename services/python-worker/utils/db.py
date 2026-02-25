#services/utils/db.py


import psycopg2

def get_db_connection():
    return psycopg2.connect(
        dbname="yourdb",
        user="user",
        password="pass",
        host="localhost"
    )