const express = require('express');
const bodyParser = require('body-parser');
const clienteRoutes = require('./Routes/clientes');
const productoRoutes = require('./Routes/productos');
const direccionRoutes = require('./Routes/direcciones');
const notaVentaRoutes = require('./Routes/notasVenta');


const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/clientes', clienteRoutes);
app.use('/productos', productoRoutes);
app.use('/direcciones', direccionRoutes);
app.use('/notasVenta', notaVentaRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
