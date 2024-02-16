import express from 'express';
//Fix para __dirname
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import { methods as authentication } from './controllers/authentication.controller.js';
import { methods as authotization } from './middlewares/authorization.js';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

//Server
const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());
const PUERTO = process.env.PORT || 3000;
app.listen(PUERTO, () => {
	console.log(`El servidor está escuchando en el puerto ${PUERTO}`);
});

//Configuración
app.use(express.static(__dirname + '/public'));
//Rutas
app.get('/', authotization.soloPublico, (req, res) => res.sendFile(__dirname + '/pages/login.html'));
app.get('/register', authotization.soloPublico, (req, res) => res.sendFile(__dirname + '/pages/register.html'));
app.get('/admin', authotization.soloAdmin, (req, res) => res.sendFile(__dirname + '/pages/admin/admin.html'));
app.post('/api/login', authentication.login);
app.post('/api/register', authentication.register);
