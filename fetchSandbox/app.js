//Get Text File

document.getElementById('button1').addEventListener('click', getText)





function getText() {
	fetch('text.txt')
		.then(response => response.text())
		.then(data => document.getElementById('output').innerHTML = data)
		.catch(err => console.log(err))
}

//Get JSON File
document.getElementById('button2').addEventListener('click', getJSON)

function getJSON(){
	fetch('posts.json')
		.then(response => response.json())
		.then(data => {
		   let output = ''
		   data.forEach(post => {
			   output += `
			   <h1>${post.title}</h1>
			   <p>${post.body}</p>
			   <br>
			   `
		   })
		document.getElementById('output').innerHTML = output
		})
		.catch(err => console.log(err))
}

//Get API Data

document.getElementById('button3').addEventListener('click', getApiData)


function getApiData() {
	fetch('https://jsonplaceholder.typicode.com/users')
		.then(response => response.json())
		.then(data => {
			let output = ''
			data.forEach(user => {
				output += `
				<h4>Name: ${user.name}</h4>
				<p>Username: ${user.username}</p>
				<p>Email: ${user.email}</p>
				<p>City: ${user.address.city}</p>
				<p>Company: ${user.company.name}</p>
				<br>
				`
			})
			document.getElementById('output').innerHTML = output
		})
		.catch(err => document.getElementById('output').innerHTML = err)
}