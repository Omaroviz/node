import http from 'node:http';
import fs from 'node:fs';
import db from './db.js';

const server = http.createServer(async (req, res) => {
	if (req.method === 'GET' && req.url === '/') {
		const html = fs.readFileSync('index.html');
		console.log('User in /');
		res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
		res.end(html);
	}
	if (req.method === 'GET' && req.url === '/client.js') {
		const js = fs.readFileSync('./client.js');
		res.writeHead(200, {'Content-Type': 'text/javascript; charset=utf-8'});
		res.end(js);
	}
	if (req.method === 'POST' && req.url === '/posts') {
		console.log('User is want /posts');
		let body = '';
		req.on('data', chunk => {
			body+=chunk;
		});
		req.on('end', async () => {	
			const data = JSON.parse(body);
			if (!data.text.trim() || !data.author.trim() || !data.code.trim()) {
				const response = {
					success: false,
					message: 'Text/Author is empty.',
					error: true
				};
				res.writeHead(500, {'Content-Type': 'application/json; charset=utf-8'});
				res.end(JSON.stringify(response));
				return;
			}
			try {
				console.log(data);
				const [result] = await db.execute(
					'INSERT INTO vocaloid(name, code, author) VALUES(?,?,?)',
					[data.text.trim(), data.code.trim(), data.author.trim()]
				);
				const response = {
					success: true,
					message: 'Post is added.',
					post: {
						id: result.insertId,
						title: result.title,
						text: result.text,
						author: result.author
					},
					error: false
				};
				res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
				res.end(JSON.stringify(response));

			} catch (error) {
				console.log('[ERROR] '+error);
			}
		});
	}
});

server.listen(3000, () => {
	console.log('Server on http://localhost:3000');
});
