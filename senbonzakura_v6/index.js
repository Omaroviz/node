import http from 'node:http';
import fs from 'node:fs';
import db from './db.js';


const server = http.createServer(async (req, res) => {
	if (req.method === 'GET' && req.url === '/') {
		const html = fs.readFileSync('index.html');
		res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
		res.end(html);
	}

	if (req.method === 'GET' && req.url === '/client.js') {
		const js = fs.readFileSync('client.js');
		res.writeHead(200, {'Content-Type': 'text/javascript; charset=utf-8'});
		res.end(js);
	}

	if (req.method === 'POST' && req.url === '/new') {
		console.log('/new');
		let body = '';
		req.on('data', chunk => {
			body+=chunk;
		});
		req.on('end', async () => {
			const data = JSON.parse(body);
			if (!data.name || !data.code || !data.author) {
				const response = {
					success: false,
					message: 'Input\'s empty',
					error: true
				};
				res.writeHead(500, {'Content-Type': 'application/json; charset=utf-8'});
				res.end(JSON.stringify(response));
				return;
			}
			try {
				let [result] = await db.execute(
					'INSERT INTO vocaloid(name, code, author) VALUES(?, ?, ?)',
					[data.name, data.code, data.author]
				);

				const response = {
					success: true,
					message: 'Vocloid is created',
					error: false
				};
				res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
				res.end(JSON.stringify(response));
			} catch (error) {
				console.log('ERROR: '+error);	
				const response = {
					success: false,
					message: error,
					error: true
				};
				res.writeHead(500, {'Content-Type': 'application/json; charset=utf-8'});
				res.end(JSON.stringify(response));
			}
		});
	} 
	
	if (req.method === 'GET' && req.url === '/show') {
		console.log('/show');
		const [result] = await db.query('SELECT * FROM vocaloid');
		console.log(result);
		res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
		res.end(JSON.stringify(result));
	}
	if (req.method === 'DELETE' && req.url.startsWith('/vocaloid/')) {
		const parts = req.url.split('/');
		try {
			let [result] = await db.execute(
				'DELETE FROM vocaloid WHERE id = ?',
				[parts[2]]
			);
			const response = {
				success: true,
				message: 'Vocaloid is deleted',
				error: false
			};
			res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
			res.end(JSON.stringify(response));
		} catch (error) {
			console.log(error);
		}
	}

});

// Project is finaled.

server.listen(3000, () => {
	console.log('Server on http://localhost:3000/');
});
