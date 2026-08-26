document.write('[from JavaScript]');
console.log('[From client.js:]');
fetch('/posts', {
	method: 'POST',
	headers: {'Content-Type': 'application/json; charset=utf-8'},
	body: '[client.js] hello from client.js!'
})
.then(response => response.json())
.then(data => {
	console.log(data.message);
});
