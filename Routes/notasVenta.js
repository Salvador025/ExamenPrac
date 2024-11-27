
const express = require('express');
const router = express.Router();
const database = require('../utils/database');
const pdfService = require('../services/pdfService');
const emailSender = require('../utils/emailSender');
const path = require('path');
const { uploadPDFtoS3 } = require('../utils/S3');


router.post('/', async (req, res) => {
  const { clienteId, direccionFacturacionId, direccionEnvioId, productos } = req.body;

  try {
      // Calcular el total de la nota de venta
      let total = 0;
      productos.forEach(producto => {
          total += producto.cantidad * producto.precioUnitario;
      });

      // Insertar la nota de venta en la base de datos y obtener el ID
      const insertQuery = 'INSERT INTO notasVenta (clienteId, direccionFacturacionId, direccionEnvioId, total) VALUES (?, ?, ?, ?)';
      const [result] = await database.query(insertQuery, [clienteId, direccionFacturacionId, direccionEnvioId, total]);
      const notaVentaId = result.insertId;

      // Generar el contenido del PDF con el detalle de los productos
      const pdfFilePath = path.join(__dirname, '..', 'pdfs', `notaVenta_${notaVentaId}.pdf`);
      await pdfService.createInvoice({
          id: notaVentaId,
          clienteId,
          direccionFacturacionId,
          direccionEnvioId,
          total,
          productos
      }, pdfFilePath);

      uploadPDFtoS3(pdfFilePath, 'bucketexamsalv ').then(data => {
        console.log(`Archivo subido con éxito a: ${data.Location}`);
      }).catch(error => {
        console.error('Error al subir archivo a S3:', error);
      });

      // Suponiendo que aquí implementas la lógica para subir el PDF a un almacenamiento externo como S3 y recuperar una URL pública

      res.status(201).json({ message: 'Nota de venta creada y archivo PDF generado.', id: notaVentaId, pdfPath: pdfFilePath });
  } catch (error) {
      console.error('Error al crear la nota de venta:', error);
      res.status(500).send('Error al procesar la solicitud.');
  }
});

module.exports = router;
