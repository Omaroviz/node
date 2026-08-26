import mysql from 'mysql2/promise';
const db = await mysql.createConnection({
	host: 'localhost',
	port: 3307,
	user: 'root',
	password: '',
	database: 'Node'
});

console.log('Database connected.');
export default db;
