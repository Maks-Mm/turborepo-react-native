# services/python-worker/database/db.py
import os
import psycopg2
from psycopg2.extras import RealDictCursor

DATABASE_URL = os.getenv('DATABASE_URL', 'postgresql://user:pass@localhost:5432/mydb')

def get_db_connection():
    return psycopg2.connect(DATABASE_URL, cursor_factory=RealDictCursor)

def fetch_pending_documents():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("""
        SELECT * FROM "Document" 
        WHERE status = 'pending' 
        AND "analyzedByPython" = false
        LIMIT 10
    """)
    documents = cur.fetchall()
    cur.close()
    conn.close()
    return documents

def update_document_status(document_id, status, analysis_result=None):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("""
        UPDATE "Document" 
        SET status = %s, 
            "analyzedByPython" = true,
            "analysisResult" = %s
        WHERE id = %s
    """, (status, analysis_result, document_id))
    conn.commit()
    cur.close()
    conn.close()