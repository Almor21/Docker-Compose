import express from 'express';
import fs from 'fs/promises';
import cors from 'cors';

const app = express();
const path = './Data/users.json';

fs.writeFile(path, '');

app.use(express.json());
app.use(cors());

app.post('/SignUp', async (req, res) => {
	const { user, password } = req.body;
	const users = JSON.parse((await fs.readFile(path, 'utf-8')) || '{}');

	users[user] = password;

	await fs.writeFile(path, JSON.stringify(users));

	console.log('Usuario agregado correctamente');

	res.setHeader('Content-Type', 'text/plain');
	res.send('Informacion agregada correctamente');
});

app.post('/LogIn', async (req, res) => {
	const { user, password } = req.body;
	const users = JSON.parse((await fs.readFile(path, 'utf-8')) || '{}');
	let message = '';

	if (users[user] || users[user] == password) {
		message = 'Se inicio sesion correctamente.';
	} else {
		message = 'Usuario o contraseña incorrecto.';
	}

	res.setHeader('Content-Type', 'text/plain');
	res.send(message);
});

app.listen('8000', () => {
	console.log('Server Authentication running...');
});
