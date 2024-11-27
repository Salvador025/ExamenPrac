const express = require('express');
const router = express.Router();
const database = require('../utils/database');

router.get('/', async (req, res) => {
  const [rows] = await database.query('SELECT * FROM clientes');
  res.json(rows);
});

router.get('/:id', async (req, res) => {
    const [rows] = await database.query('SELECT * FROM clientes WHERE id = ?', [req.params.id]);
    res.json(rows);
    });

    router.post('/', async (req, res) => {
        const { id, razonSocial, nombreComercial, email } = req.body;
        try {
          const result = await database.query('INSERT INTO clientes (id, razonSocial, nombreComercial, email) VALUES (?, ?, ?, ?)', [id, razonSocial, nombreComercial, email]);
          console.log(result);
          res.status(201).send(`Cliente agregado con ID: ${result.insertId}`);  // Asegúrate de que result.insertId es correcto según tu librería de base de datos
        } catch (error) {
          console.error('Error al agregar cliente:', error);
          res.status(500).send('Error interno del servidor');
        }
      });
      

router.put('/:id', async (req, res) => {
  const { razonSocial, nombreComercial, email } = req.body;
  await database.query('UPDATE clientes SET razonSocial = ?, nombreComercial = ?, email = ? WHERE id = ?', [razonSocial, nombreComercial, email, req.params.id]);
  res.send('Cliente actualizado');
});

router.delete('/:id', async (req, res) => {
  await database.query('DELETE FROM clientes WHERE id = ?', [req.params.id]);
  res.send('Cliente eliminado');
});

module.exports = router;
