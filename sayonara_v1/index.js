import express from 'express';


const app = express();

app.get('/', (req, res) => {
	console.log('User in /');
	res.send('re');
});

app.get('/posts', (req, res) => {
	console.log('User in /posts');
	res.json({name: 'text', age: 16});
});

app.listen(3000, () => {
	console.log('Server in http://localhost:3000/');
});

