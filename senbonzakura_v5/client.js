console.log('[JS client.js]');

const name = document.querySelector('#name');
const code = document.querySelector('#code');
const author = document.querySelector('#author');
const btn = document.querySelector('#btn');

btn.addEventListener('click', () => {
	const data = {
		name: name.value,
		code: code.value,
		author: author.value
	};
	fetch('/new', {
		method: 'POST',
		headers: {'Content-Type': 'application/json; charset=utf-8'},
		body: JSON.stringify(data)
	})
	.then(response => response.json())
	.then(data => {
		if (data.error) {
			switch (data.error) {
				case 4482:
					console.log('Error database\'s.');
				case 4421:
					console.log('Empty inputs!');
			}
		} 
		console.log(data);
	});
});



