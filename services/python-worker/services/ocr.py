#services/python-worker/services/ocr.py

import pytesseract
from PIL import Image
import re

def analyze_invoice(file_path):
    """
    Analysiert eine Rechnung:
    - Extrahiert Text mit OCR
    - Prüft Pflichtangaben
    """
    try:
        # OCR durchführen
        image = Image.open(file_path)
        text = pytesseract.image_to_string(image, lang='deu')
        
        # Prüfe Pflichtangaben
        checks = {
            'has_date': bool(re.search(r'\d{2}\.\d{2}\.\d{4}', text)),
            'has_amount': bool(re.search(r'€|EUR|\d+[.,]\d{2}', text)),
            'has_vat': bool(re.search(r'USt|MwSt|Steuer', text)),
            'has_sender': bool(re.search(r'(Firma|GmbH|AG|KG|e\.K\.)', text))
        }
        
        # Ergebnis
        result = {
            'status': 'analyzed',
            'checks': checks,
            'all_checks_passed': all(checks.values()),
            'extracted_text': text[:500]  # nur die ersten 500 Zeichen speichern
        }
        
        return result
        
    except Exception as e:
        return {
            'status': 'error',
            'error': str(e)
        }