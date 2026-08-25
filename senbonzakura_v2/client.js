const input = document.querySelector('#text');
const btn = document.querySelector('#send');
const result = document.querySelector('#result');

btn.addEventListener('click', () => {
	const data = {
		text: input.value,
		author: 'SNBZK_v2'
	};
	fetch('/posts', {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify(data)
	})
	.then(response => response.json())
	.then(data => {
		if (data.error) {
			console.log(data);
			result.textContent = data.message;
		} else {
			console.log(data);
			result.textContent = data.text;
		}
	});
});

fetch('/posts')
    .then(response => response.json())
    .then(data => {
        console.log(data);
    });


