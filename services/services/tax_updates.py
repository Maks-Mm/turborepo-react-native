#services/python-worker/services/tax_updates.py

from utils.db import get_db_connection, get_db_cursor

def get_all_tax_updates():
    conn = get_db_connection()
    cur = conn.cursor()
    
    try:
        cur.execute("SELECT * FROM tax_updates")
        records = cur.fetchall()
        return records
    finally:
        cur.close()
        conn.close()

def insert_tax_update(title, content):
    conn, cur = get_db_cursor()  # Using the cursor version
    
    try:
        cur.execute(
            "INSERT INTO tax_updates (title, content) VALUES (%s, %s) RETURNING id",
            (title, content)
        )
        new_id = cur.fetchone()['id']
        conn.commit()
        return new_id
    finally:
        cur.close()
        conn.close()