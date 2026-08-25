import http from 'node:http';
import fs from 'node:fs';
import db from './db.js';

const server = http.createServer(async (req, res) => {
		if (req.method === 'GET' && req.url === '/') {
			const html = fs.readFileSync('./index.html');
			res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
			res.end(html);
			return;
		}

		if (req.method === 'GET' && req.url === '/client.js') {
			const js = fs.readFileSync('./client.js');
			res.writeHead(200, {'Content-Type': 'text/javascript; charset=utf-8'});
			res.end(js);
			return;
		}
		
		if (req.method === 'GET' && req.url === '/posts') {
			const [rows] = await db.query('SELECT * FROM posts');
			res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
			res.end(JSON.stringify(rows));
			return;
		}
		
		if (req.method === 'POST' && req.url === '/posts') {
			let body = '';
			req.on('data', chunk => {
				body+=chunk;
			});
			req.on('end', async () => {
				const data = JSON.parse(body);
				if (!data.text.trim()) {
					const response = {
						success: false,
						message: 'Text in post is empty',
						post: {
							title: false,
							text: false,
							author: data.author
						},
						error: true
					};
					res.writeHead(200, {'Content-Type': 'application/json'});
					res.end(JSON.stringify(response));
					return;
				} 
				try {
					const [result] = await db.execute(
						'INSERT INTO posts(title, text, author) VALUES(?, ?, ?)', [data.title, data.text, data.author]);
					const response = {
						success: true,	
						message: 'Post added.',
						post: {
							id: result.insertId,
							title: data.title,
							text: data.text,
							author: data.author
						},
						error: false
					};
					res.writeHead(201, {'Content-Type': 'application/json; charset=utf-8'});
					res.end(JSON.stringify(response));
				} catch (error) {
					console.log('[ERROR]: '+error);
					const response = {
						success: false,
						message: 'Database error',
						error: error
					};
					res.writeHead(500, {'Content-Type': 'application/json; charset=utf-8'});
					res.end(JSON.stringify(response));
				}
			});
			return;
		}
		
		res.statusCode = 404;
		res.end('Not found');
});

server.listen(3000, () => {
	console.log('Server started: http://localhost:3000');
});
