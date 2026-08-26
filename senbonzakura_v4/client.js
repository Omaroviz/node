console.log('HELLO FROM client.JS!');

const data = {
	text: 'hello, #39hJSn',
	author: 'SNBZK[client.js]'
};

fetch('/posts', {
	method: 'POST',
	headers: {'Content-Type': 'application/json; charset=utf-8'},
	body: JSON.stringify(data)
})
.then(response => response.json())
.then(data => {
	console.log(data);
});


