import http from 'node:http';
import fs from 'node:fs';

const server = http.createServer((req, res) => {
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
		const response = {
			text: 'teext',
			author: 'SNBZK'
		};
		req.on('data', chunk => {
			body+=chunk;
		});
		req.on('end', () => {	
			const date = JSON.parse(body);
			console.log(date.text);
		});
		res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
		res.end(JSON.stringify(response));
	}
});

server.listen(3000, () => {
	console.log('Server on http://localhost:3000');
});
