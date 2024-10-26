import mysql from 'mysql2/promise';

// Create a connection pool to MySQL
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Arshal123@',
  database: 'Blog',
});

export default pool;