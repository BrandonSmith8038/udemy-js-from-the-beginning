/*
* EasyHTTP Library
* Library for making HTTP requests
*
* @version 2.0.0
* @author Brandon Smith
* @license MIT
*
*/

class EasyHTTP {
	
	//Make HTTP get request
	get(url){
		return new Promise((resolve, reject) => {
			fetch(url)
			.then(res => res.json())
			.then(data => resolve(data))
			.catch(err => reject(err))
		})
	}
	
	//Make HTTP Post request
	post(url, data){
		return new Promise((resolve, reject) => {
			fetch(url, {
				method: 'POST',
				headers: {
					'Content-type': 'application/json'
				},
				body: JSON.stringify(data)
			})
			.then(response => response.json())
			.then(data => resolve(data))
			.catch(err => reject(err))
		})
	}
	
//Make An HTTP PUT Request
	put(url, data){
		return new Promise((resolve, reject) => {
			fetch(url, {
				method: 'PUT',
				headers: {
					'Content-type': 'application/json'
				},
				body: JSON.stringify(data)
			})
			.then(response => response.json())
			.then(data => resolve(data))
			.catch(err => err)
		})
	}
	
	//Make An HTTP Delete Request
	delete(url){
		return new Promise((resolve, reject) => {
			fetch(url, {
				method: 'DELETE',
				headers: {
					'Content-type': 'application/json'
				}
			})
			.then(response => response.json())
			.then(() => resolve('Resource Deleted'))
			.catch(err => err)
		})
	}


}

