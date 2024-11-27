const pool = require('../utils/database');

function getAllNotasVenta() {
  return pool.query('SELECT * FROM notasVenta');
}

function addNotaVenta(notaVenta) {
  return pool.query('INSERT INTO notasVenta SET ?', notaVenta);
}

function updateNotaVenta(id, notaVenta) {
  return pool.query('UPDATE notasVenta SET ? WHERE id = ?', [notaVenta, id]);
}

function deleteNotaVenta(id) {
  return pool.query('DELETE FROM notasVenta WHERE id = ?', [id]);
}

module.exports = {
  getAllNotasVenta,
  addNotaVenta,
  updateNotaVenta,
  deleteNotaVenta
};
