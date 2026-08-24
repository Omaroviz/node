import http from 'node:http';

const server = http.createServer((req, res) => {
	console.log('\n[START]');

	console.log('Method: '+req.method);
	console.log('URL: '+req.url);
	switch (req.url) {
		case ('/'):
			res.end('hello:)');
			break;
		case ('/:)'):
			res.end(':3');
			break;
		case ('/:3'):
			res.end(':O');
			break;
		case ('/:O'):
		case ('/:0'):
			res.end(':3');
			break;
		default:
			res.statusCode = 404;
			res.end('[HTTP ERROR] 404. Page not found.');
	}
	console.log('[END]\n');
});

server.listen(3000);

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
