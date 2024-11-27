const pool = require('../utils/database');

function getAllClientes() {
  return pool.query('SELECT * FROM clientes');
}

function addCliente(cliente) {
  return pool.query('INSERT INTO clientes SET ?', cliente);
}

function updateCliente(id, cliente) {
  return pool.query('UPDATE clientes SET ? WHERE id = ?', [cliente, id]);
}

function deleteCliente(id) {
  return pool.query('DELETE FROM clientes WHERE id = ?', [id]);
}

module.exports = {
  getAllClientes,
  addCliente,
  updateCliente,
  deleteCliente
};
