const pool = require('../utils/database');

function getAllDomicilios() {
  return pool.query('SELECT * FROM domicilios');
}

function addDomicilio(domicilio) {
  return pool.query('INSERT INTO domicilios SET ?', domicilio);
}

function updateDomicilio(id, domicilio) {
  return pool.query('UPDATE domicilios SET ? WHERE id = ?', [domicilio, id]);
}

function deleteDomicilio(id) {
  return pool.query('DELETE FROM domicilios WHERE id = ?', [id]);
}

module.exports = {
  getAllDomicilios,
  addDomicilio,
  updateDomicilio,
  deleteDomicilio
};
