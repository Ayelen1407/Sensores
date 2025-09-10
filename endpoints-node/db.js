import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config(); //carga las variables

//Configuración de la conexión
const pool = mysql.createPool({
    host: process.env.BD_HOST, //process es un proceso de ejecución
    user: process.env.DB_USER,
    password: process.env.BD_PASSWORD,
    database: process.env.DB_NAME, 
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

export default pool;