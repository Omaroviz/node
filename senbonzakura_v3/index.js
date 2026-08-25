import http from 'node:http';
import fs from 'node:fs';

const server = http.createServer((req, res) => {
	if (req.method === 'GET' && req.url === '/') {
		const html = fs.readFileSync('index.html');
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.end(html);
		console.log('User in /');
	}
	if (req.method === 'GET' && req.url === '/client.js') {
		console.log('brtest');
		const js = fs.readFileSync('./client.js');
		res.writeHead(201, {'Content-Type': 'text/javascript; charset=utf-8'});
		res.end(js);
		// res.end('Send ./client.js to the browser');
		return;
	}
	if (req.method === 'POST' && req.url === '/posts') {
		console.log('ok.');
		let body = '';
		req.on('data', chunk => {
			body+=chunk
		});
		req.on('end', () => {
			console.log(body);
		});
	}
});

server.listen(3039, () => {
	console.log('Server: http://localhost:3039/');
});
