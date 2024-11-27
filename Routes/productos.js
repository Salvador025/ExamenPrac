const express = require('express');
const router = express.Router();
const database = require('../utils/database');

router.get('/', async (req, res) => {
  const [rows] = await database.query('SELECT * FROM productos');
  res.json(rows);
});

router.get('/:id', async (req, res) => {
    const [rows] = await database.query('SELECT * FROM productos WHERE id = ?', [req.params.id]);
    res.json(rows);
    });

router.post('/', async (req, res) => {
  const { id, nombre, unidadMedida, precioBase } = req.body;
  const result = await database.query('INSERT INTO productos (id, nombre, unidadMedida, precioBase) VALUES (?, ?, ?, ?)', [id, nombre, unidadMedida, precioBase]);
  res.status(201).send(`Producto agregado con ID: ${result.insertId}`);
});

router.put('/:id', async (req, res) => {
  const { nombre, unidadMedida, precioBase } = req.body;
  await database.query('UPDATE productos SET nombre = ?, unidadMedida = ?, precioBase = ? WHERE id = ?', [nombre, unidadMedida, precioBase, req.params.id]);
  res.send('Producto actualizado');
});

router.delete('/:id', async (req, res) => {
  await database.query('DELETE FROM productos WHERE id = ?', [req.params.id]);
  res.send('Producto eliminado');
});

module.exports = router;
