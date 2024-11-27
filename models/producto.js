const pool = require('../utils/database');

function getAllProductos() {
  return pool.query('SELECT * FROM productos');
}

function addProducto(producto) {
  return pool.query('INSERT INTO productos SET ?', producto);
}

function updateProducto(id, producto) {
  return pool.query('UPDATE productos SET ? WHERE id = ?', [producto, id]);
}

function deleteProducto(id) {
  return pool.query('DELETE FROM productos WHERE id = ?', [id]);
}

module.exports = {
  getAllProductos,
  addProducto,
  updateProducto,
  deleteProducto
};
