console.log('client.js is connected');

const name = document.querySelector('#name');
const code = document.querySelector('#code');
const author = document.querySelector('#author');
const btn = document.querySelector('#btn');
const posts = document.querySelector('#posts');

function showPosts() {
fetch('/show')
.then(response => response.json())
.then(data => {
	console.log(data);
	let html = '';
	for (let i = 0; i < data.length; i++) {
		html += `<p>Name: ${data[i]['name']}<br>Code: ${data[i]['code']}<br>Author: ${data[i]['author']}<br><button type='submit' id='delete' data-id="${data[i]['id']}">Delete</button></p>`;
	}
	console.log('what');
	posts.innerHTML = html;
	posts.addEventListener('click', event => {
		if (!event.target.dataset.id) return;
	        const id = event.target.dataset.id;
	       	console.log('Delete:', id);
		fetch(`/vocaloid/${id}`, {
			method: 'DELETE'
		})
		.then(response => response.json())
		.then(data => {
			console.log(data);
			showPosts();
		});
	});
});

}


showPosts();


btn.addEventListener('click', () => {
	const data = {
		name: name.value.trim(),
		code: code.value.trim(),
		author: author.value.trim()
	};
	fetch('/new', {
		method: 'POST',
		headers: {'Content-Type': 'application/json; charset=utf-8'},
		body: JSON.stringify(data)
	})
	.then(response => response.json())
	.then(data => {
		if (data.error) {
			console.error(data.message)
		} 
		console.log(data);
		showPosts();
	});

});

