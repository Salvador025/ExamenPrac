const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'database-1.cizcwtle6abx.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'admin123',
  database: 'EXAMEN',
  waitForConnections: true,
});

// Prueba de conexión
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Conexión a la base de datos exitosa!');
    connection.release();
  } catch (error) {
    console.log(error);
    console.error('Error al conectar a la base de datos:', error);
  }
}

testConnection();

module.exports = pool;
