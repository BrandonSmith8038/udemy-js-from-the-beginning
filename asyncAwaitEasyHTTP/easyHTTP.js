/*
* EasyHTTP Library
* Library for making HTTP requests
*
* @version 3.0.0
* @author Brandon Smith
* @license MIT
*
*/

class EasyHTTP {
	
	//Make HTTP get request
	async get(url){
		const response = await fetch(url)
		
		const resData = await response.json()
		
		return resData 
	}
	
	//Make HTTP Post request
	async post(url, data){
		
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-type': 'application/json'
				},
				body: JSON.stringify(data)
			})
			
			const resData = await response.json()
			return resData
	}
	
//Make An HTTP PUT Request
async put(url, data){
	
			const response =  await fetch(url, {
				method: 'PUT',
				headers: {
					'Content-type': 'application/json'
				},
				body: JSON.stringify(data)
			})
			const resData = await response.json()
			return resData
	}
	
	//Make An HTTP Delete Request
	async delete(url){
		
		const response = await	fetch(url, {
				method: 'DELETE',
				headers: {
					'Content-type': 'application/json'
				}
			})
			const resData = await response.json()
			return console.log('Resource Deleted')
	}

}

