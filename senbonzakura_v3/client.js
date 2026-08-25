document.write('[from JavaScript]');
console.log('[From client.js:]');
fetch('/posts', {
	method: 'POST',
	headers: {'Content-Type': 'application/json; charset=utf-8'},
	body: 'hello from client.js!'
});
