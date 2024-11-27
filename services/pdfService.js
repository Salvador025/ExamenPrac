const PDFDocument = require('pdfkit');
const fs = require('fs');

function createInvoice(invoiceData, path) {
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(path));

  // Título y metadatos del documento
  doc.fontSize(16).text('Nota de Venta', { align: 'center' });
  doc.fontSize(12).text(`ID de Nota: ${invoiceData.id}`);
  doc.text(`Cliente ID: ${invoiceData.clienteId}`);
  doc.text(`Total: $${invoiceData.total.toFixed(2)}`);

  // Encabezados de la tabla de productos
  doc.moveDown().fontSize(10);
  doc.text('Producto', { continued: true });
  doc.text('Cantidad', { align: 'right', continued: true });
  doc.text('Precio Unit.', { align: 'right', continued: true });
  doc.text('Importe', { align: 'right' });

  // Detalle de productos
  invoiceData.productos.forEach(producto => {
    doc.text(producto.nombre, { continued: true });
    doc.text(producto.cantidad.toString(), { align: 'right', continued: true });
    doc.text(`$${producto.precioUnitario.toFixed(2)}`, { align: 'right', continued: true });
    let importe = producto.cantidad * producto.precioUnitario;
    doc.text(`$${importe.toFixed(2)}`, { align: 'right' });
  });

  doc.end();
}

module.exports = {
  createInvoice
};
