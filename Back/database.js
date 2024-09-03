import mysql from 'mysql2/promise';

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'root123',
    database: 'dickin'
};

const pool = mysql.createPool(dbConfig);

export default pool;