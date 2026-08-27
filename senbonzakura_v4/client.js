console.log('HELLO FROM client.JS!');

const name = document.querySelector('#name');
const code = document.querySelector('#code');
const author = document.querySelector('#author');
const btn = document.querySelector('#btn');

btn.addEventListener('click', () => {
	const data = {
		text: name.value,
		code: code.value,
		author: author.value
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

});


