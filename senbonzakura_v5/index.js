import http from 'node:http';
import fs from 'node:fs';
import db from './db.js';

const server = http.createServer(async (req, res) => {
	if (req.method === 'GET' && req.url === '/') {
		const html = fs.readFileSync('./index.html');
		res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
		res.end(html);
	}
	if (req.method === 'GET' && req.url === '/client.js') {
		const js = fs.readFileSync('./client.js');
		res.writeHead(200, {'Content-Type': 'text/javascript; charset=utf-8'});
		res.end(js);
	}
	if (req.method === 'POST' && req.url === '/new') {
		let body = '';
		req.on('data', chunk => {
			body+=chunk;
		});
		req.on('end', async () => {
			const data = JSON.parse(body);
			if (!data.name.trim() || !data.code.trim() || !data.author.trim()) {
				const response = {
					success: false,
					message: 'Empty input.',
					error: 4421
				};
				res.writeHead(500, {'Content-Type': 'application/json; charset=utf-8'});
				res.end(JSON.stringify(response));
				console.log('Empty input\'s.');
				return;
			}
			try {
				const [result] = await db.execute(
					'INSERT INTO vocaloid(name, code, author) VALUES(?, ?, ?)',
					[data.name.trim(), data.code.trim(), data.author.trim()]
				);
				const response = {
					success: true,
					message: 'Post is added',
					error: false
				};
				res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
				res.end(JSON.stringify(response));
				console.log('Post is added');
			} catch (errors) {
				const response = {
					success: false,
					message: errors,
					error: 4482
				};
				res.writeHead(500, {'Content-Type': 'application/json; charset=utf-8'});
				res.end(JSON.stringify(response));
				console.log('Database error!');
			}
		});
	}
});

server.listen(3000, () => {
	console.log('Server in http://localhost:3000');
});




