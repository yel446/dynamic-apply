import PyPDF2
import json

pdf_path = "public/CV-YEL-2026.pdf"

try:
    with open(pdf_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
        
        with open("scratch-pdf-output.txt", "w", encoding="utf-8") as out:
            out.write(text)
        print("Successfully extracted PDF to scratch-pdf-output.txt")
except Exception as e:
    print(f"Error reading PDF: {e}")
