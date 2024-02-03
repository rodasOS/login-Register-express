import mysql from 'promise-mysql';
import dotenv from 'dotenv';
dotenv.config();

//  --> Creando conexion a la base de datos
const connection = mysql.createConnection({
	host: process.env.HOST,
	database: process.env.DATABASE,
	user: process.env.USER,
	password: process.env.PASSWORD,
});

const getConnection = () => connection;

export const conec = {
	getConnection,
};
