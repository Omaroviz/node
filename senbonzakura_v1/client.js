const data = {
	title: 'senbonzakura',
	text: 'hello from browser!'
};

fetch('/posts', {
	method: 'POST',
	headers: {'Content-Type': 'application/json'},
	body: JSON.stringify(data)
})
.then(response => response.text())
.then(data  => {
	console.log(data);
});



