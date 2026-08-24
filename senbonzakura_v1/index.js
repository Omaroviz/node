import http from 'node:http';
import fs from 'node:fs';

const server = http.createServer((req, res) => {
	console.log('\n[START]');

	console.log('Method: '+req.method);
	console.log('URL: '+req.url);
		
	if (req.method === 'GET' && req.url === '/') {
		console.log('You\'re in /');
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
	
	if (req.method === 'POST' && req.url === '/posts') {
		console.log('You\'re in /posts');
		let body = '';
		req.on('data', chunk => {
			body += chunk;
		});
		req.on('end', () => {
			console.log('BODY: ', body);
			res.end('I pull: ' + body);
		});
		return;
	}
	res.end('Hello!');
	console.log('[END]\n');
});

server.listen(3000, () => {
	console.log('Server: http://localhost:3000');
});

/*console.log('Hello, SNBZK!');
class User {
	constructor(name) {
		this.name = name;
	}
	say(text) {
		console.log(this.name+' принужденно говорит '+text.trim());
	}
}


beta_user = new User('SNBZK');
beta_user.say('привыет');
*/
