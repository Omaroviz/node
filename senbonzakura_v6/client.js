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
		html += `<p>
			Name: ${data[i]['name']}<br>
			Code: ${data[i]['code']}<br>
			Author: ${data[i]['author']}<br>
			<button type='submit' class='delete' data-id="${data[i]['id']}">Delete</button>
			<button type='submit' class='update' data-id="${data[i]['id']}">Update</button>
			</p>`;
	}
	console.log('what');
	posts.innerHTML = html;
});

}

posts.addEventListener('click', event => {
	        const id = event.target.dataset.id;

		if (!id) return;
		
		if (event.target.classList.contains('delete')) {
		       	console.log('Delete:', id);
			fetch(`/vocaloid/${id}`, {
				method: 'DELETE'
			})
			.then(response => response.json())
			.then(data => {
				console.log(data);
				showPosts();
			});
			return;
		}
		if (event.target.classList.contains('update')) {
			console.log('Update: '+id);
			const newName = prompt('New name:');
			const newCode = prompt('New code:');
			const newAuthor = prompt('New author:');
			if (!newName || !newCode || !newAuthor) {
				return;
			}
			fetch(`/vocaloid/${id}`, {
				method: 'PUT',
				headers: {'Content-Type': 'applicaion/json; charset=utf-8'},
				body: JSON.stringify({
					name: newName.trim(),
					code: newCode.trim(),
					author: newAuthor.trim(),
				})
			})
			.then(response => response.json())
			.then(data => {
				console.log(data);
				showPosts();
			});
		}
	});

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
		name.value = '';
		code.value = '';
		author.value = '';
		showPosts();
	});

});

