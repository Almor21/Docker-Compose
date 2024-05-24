import express from 'express';
import fs from 'fs/promises';
import cors from 'cors';

const path = './Data/db.json';
const app = express();

await fs.writeFile(path, '');

app.use(express.json());
app.use(cors());

app.post('/students', async (req, res) => {
	const { id, grade } = req.body;

	const data = JSON.parse((await fs.readFile(path, 'utf-8')) || '{}');
    data[id] = grade;
    await fs.writeFile(path, JSON.stringify(data));

	console.log(`Se ha crado un nuevo usuario ${id}`);
	res.setHeader('Content-Type', 'text/plain');
	res.send('Usuario creado correctamente');
});

app.get('/students', async (req, res) => {
	const data = JSON.parse((await fs.readFile(path, 'utf-8')) || '{}');
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify(data));
});

app.get('/students/:id', async (req, res) => {
	const id = req.params.id;
	const data = JSON.parse((await fs.readFile(path, 'utf-8')) || '{}');
	res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
        [id]: data[id]
    }));
});

app.put('/students/:id', async (req, res) => {
    const id = req.params.id;
    const data = JSON.parse((await fs.readFile(path, 'utf-8')) || '{}');
    const grade = req.body.grade;
    let message = '';

    if (data[id]) {
        data[id] = grade;
        await fs.writeFile(path, JSON.stringify(data));
        console.log(`Se ha actualizado un usuario ${id}`)
        message = 'Se ha actualizado el usuario correctamente';
    } else {
        message = 'Usuario no encontrado';
    }

	res.setHeader('Content-Type', 'text/plain');
    res.send(message);
});

app.delete('/students/:id', async (req, res) => {
    const id = req.params.id;
    const data = JSON.parse((await fs.readFile(path, 'utf-8')) || '{}');
    let message = '';

    if (data[id]) {
        delete data[id]
        await fs.writeFile(path, JSON.stringify(data));
        console.log(`Se ha eliminado un usuario ${id}`)
        message = 'Se ha eliminado el usuario correctamente';
    } else {
        message = 'Usuario no encontrado';
    }

	res.setHeader('Content-Type', 'text/plain');
    res.send(message);
})

app.listen('8000', () => {
	console.log('Server DB running...');
});
