#services/python-worker/main.py

import time
import json
from database.db import fetch_pending_documents, update_document_status
from services.ocr import analyze_invoice
from services.tax_updates import check_tax_updates
from services.deadlines_parser import generate_deadlines_for_user
from utils.logger import setup_logger

from dotenv import load_dotenv
load_dotenv()

logger = setup_logger()

def process_documents():
    """Verarbeitet ausstehende Dokumente"""
    documents = fetch_pending_documents()
    
    for doc in documents:
        logger.info(f"Processing document {doc['id']}")
        
        if doc['type'] == 'invoice':
            result = analyze_invoice(doc['file_url'])
            update_document_status(
                doc['id'], 
                result['status'],
                json.dumps(result)
            )
            logger.info(f"Document {doc['id']} processed: {result['status']}")

def main():
    logger.info("Python Worker started")
    
    while True:
        try:
            # Dokumente verarbeiten
            process_documents()
            
            # Steuer-Updates prüfen (1x pro Stunde)
            if time.localtime().tm_min == 0:
                check_tax_updates()
            
            # Neue Deadlines generieren (1x pro Tag)
            if time.localtime().tm_hour == 3 and time.localtime().tm_min == 0:
                generate_deadlines_for_user()
            
            # 1 Minute warten
            time.sleep(60)
            
        except Exception as e:
            logger.error(f"Error in main loop: {e}")
            time.sleep(60)

if __name__ == "__main__":
    main()