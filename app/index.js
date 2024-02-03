import express from 'express';
//Fix para __dirname
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import { methods } from './controllers/authentication.controller.js';

//Server
const app = express();
app.use(express.json());
const PUERTO = process.env.PORT || 3000;
app.listen(PUERTO, () => {
	console.log(`El servidor está escuchando en el puerto ${PUERTO}`);
});

//Configuración
app.use(express.static(__dirname + '/public'));
//Rutas
app.get('/', (req, res) => res.sendFile(__dirname + '/pages/login.html'));
app.get('/register', (req, res) => res.sendFile(__dirname + '/pages/register.html'));
app.get('/admin', (req, res) => res.sendFile(__dirname + '/pages/admin/admin.html'));
app.post('/api/login', methods.login);
app.get('/api/register', (req, res) => res.send('<h1>Hola que tal</h1>'));
app.post('/api/register', methods.register);
