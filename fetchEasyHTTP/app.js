const http = new EasyHTTP

//Create Data
const data = {
    "name": "Brandon",
    "username": "Cowboy8038",
    "email": "Brandon@test.com"
}

//Get Users
// http.get('https://jsonplaceholder.typicode.com/users')
// 	.then(data => console.log(data))
// 	.catch(err => console.log(err))
	
	
//Post Request

// http.post('https://jsonplaceholder.typicode.com/users', data)
// 	.then(data => console.log(data))
// 	.catch(err => console.log(err))

//Put Request
/*http.put('https://jsonplaceholder.typicode.com/users/1', data)
	.then(data => console.log(data))
	.catch(err => console.log(err))*/
	
//Delete Request
http.delete('https://jsonplaceholder.typicode.com/users/1')
	.then(data => console.log(data))
	.catch(err => console.log(err))