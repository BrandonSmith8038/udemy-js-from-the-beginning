class Book {
	constructor(title, author, isbn){
		this.title = title
		this.author = author
		this.isbn = isbn
	}
}



class UI {
	
	addBookToList(book){
		const list = document.getElementById('book-list')
	
		// Create tr element
		const row = document.createElement('tr')
		
		// Insert cols
		row.innerHTML = `
			<td>${book.title}</td>
			<td>${book.author}</td>
			<td>${book.isbn}</td>
			<td><a href='#' class='delete'>X</a></td>
		`
		list.appendChild(row)
	}
	
	showAlert(msg, className){
		//Create Div
		const div = document.createElement('div')
		
		//Add Classes
		div.className = `alert ${className}`
		
		//Add Text
		div.appendChild(document.createTextNode(msg))
		
		//Get parent
		const container = document.querySelector('.container')
		
		const form = document.querySelector('#book-form')
		
		//Insert Alert
		container.insertBefore(div, form)
		
		//Timeout After 3 Seconds
		setTimeout(() => {
			document.querySelector('.alert').remove()
		}, 3000)
	}
	
	deleteBook(target){
		if(target.className === 'delete'){
			target.parentElement.parentElement.remove();
		}
	}
	
	clearFields(){
		document.getElementById('title').value = ''
		document.getElementById('author').value = ''
		document.getElementById('isbn').value = ''
	}
	
}

//Event Listeners
document.getElementById('book-form').addEventListener('submit', (e) => {
	
	//Get Form Values
	const title = document.getElementById('title').value,
				author = document.getElementById('author').value,
				isbn = document.getElementById('isbn').value
				
	//Instantiate book
	const book = new Book(title, author, isbn)
	
	//Instantiate ui
	const ui = new UI()
	console.log(ui)
	
	//Validate
	if(title === '' || author === '' || isbn === ''){
		
		//Error Alert
		ui.showAlert('Please Fill In All Fields', 'error')
		
	} else {
		//Add Book To List
		ui.addBookToList(book)
	
		//Clear Fields
		ui.clearFields()
		
		//Success Alert
		ui.showAlert('Book Added', 'success')
	}
	
	e.preventDefault()
})

//Event Listener For Delete
document.getElementById('book-list').addEventListener('click', (e) => {
	
	//Instantiate ui
	const ui = new UI()
	
	ui.deleteBook(e.target)
	
	//show Alert
	ui.showAlert('Book Removed', 'success')
	
	e.preventDefault()
})