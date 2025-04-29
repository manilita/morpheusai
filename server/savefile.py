from fpdf import FPDF

def text_to_pdf(text, filename):
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)

    pdf.multi_cell(0,10,text)

    pdf.output(filename)

