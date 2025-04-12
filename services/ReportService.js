const PDFDocument = require('pdfkit');
const fs = require('fs');

class ReportService {
  constructor() {
    this.doc = new PDFDocument();
  }

  async generateReport(title, columns, rows) {
    const now = new Date();
    const filename = `report-${now.toISOString()}.pdf`;
    const stream = fs.createWriteStream(filename);
    this.doc.pipe(stream);

    this.addHeader(title);
    this.addTable(columns, rows);
    this.addFooter(now);

    this.doc.end();

    await new Promise((resolve, reject) => {
      stream.on('finish', resolve);
      stream.on('error', reject);
    });

    return filename;
  }

  addHeader(title) {
    this.doc
      .fontSize(20)
      .text(title, { align: 'center' })
      .moveDown();
  }

  addTable(columns, rows) {
    const tableTop = this.doc.y;
    const cellHeight = 20;
    const cellPadding = 5;

    const columnWidths = columns.map(() => 100);

    // Draw column headers
    this.doc.font('Helvetica-Bold');
    let currentX = 50;
    for (let i = 0; i < columns.length; i++) {
      this.doc.rect(currentX, tableTop, columnWidths[i], cellHeight).stroke();
      this.doc.text(columns[i], currentX + cellPadding, tableTop + cellPadding, { width: columnWidths[i] - cellPadding * 2 });
      currentX += columnWidths[i];
    }

    // Draw data rows
    this.doc.font('Helvetica');
    let rowY = tableTop + cellHeight;
    for (const row of rows) {
      currentX = 50;
      for (let i = 0; i < columns.length; i++) {
        const cellValue = row[i] ? row[i].toString() : '';
        this.doc.rect(currentX, rowY, columnWidths[i], cellHeight).stroke();
        this.doc.text(cellValue, currentX + cellPadding, rowY + cellPadding, { width: columnWidths[i] - cellPadding * 2 });
        currentX += columnWidths[i];
      }
      rowY += cellHeight;
    }
  }

  addFooter(date) {
    this.doc
      .fontSize(10)
      .text(`Generated on: ${date.toLocaleString()}`, 50, this.doc.page.height - 50, { align: 'left' });
  }
}

module.exports = ReportService;