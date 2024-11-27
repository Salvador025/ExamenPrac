const express = require('express');
const router = express.Router();
const database = require('../utils/database');

router.get('/', async (req, res) => {
  const [rows] = await database.query('SELECT * FROM domicilios');
  res.json(rows);
});

router.get('/:id', async (req, res) => {
    const [rows] = await database.query('SELECT * FROM domicilios WHERE id = ?', [req.params.id]);
    res.json(rows);
    });

router.post('/', async (req, res) => {
    const { id, domicilio, colonia, municipio, estado, tipoDireccion, clienteId } = req.body;
    try {
        // Verificar si existe el cliente
        console.log(clienteId)
        const [clientes] = await database.query('SELECT id FROM clientes WHERE id = ?', [clienteId]);
        if (clientes.length === 0) {
        return res.status(404).send('Cliente no encontrado');
        }
    
        // Insertar domicilio si el cliente existe
        const result = await database.query('INSERT INTO domicilios (id, clienteId, domicilio, colonia, municipio, estado, tipoDireccion) VALUES (?, ?, ?, ?, ?, ?, ?)', [id, clienteId, domicilio, colonia, municipio, estado, tipoDireccion]);
        res.status(201).send(`Domicilio agregado con ID: ${result.insertId}`);
    } catch (error) {
        console.error('Error al agregar domicilio:', error);
        res.status(500).send('Error interno del servidor');
    }
    });
      
      

router.put('/:id', async (req, res) => {
  const { domicilio, colonia, municipio, estado, tipoDireccion } = req.body;
  await database.query('UPDATE domicilios SET domicilio = ?, colonia = ?, municipio = ?, estado = ?, tipoDireccion = ? WHERE id = ?', [domicilio, colonia, municipio, estado, tipoDireccion, req.params.id]);
  res.send('Domicilio actualizado');
});

router.delete('/:id', async (req, res) => {
  await database.query('DELETE FROM domicilios WHERE id = ?', [req.params.id]);
  res.send('Domicilio eliminado');
});

module.exports = router;
