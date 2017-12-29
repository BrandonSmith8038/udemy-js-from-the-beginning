//Define UI Variables

const form = document.querySelector('#task-form')
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-tasks')
const filter = document.querySelector('#filter')
const taskInput = document.querySelector('#task')


//Load All Event Listeners
loadAllEventListeners()


//Load All Event Listeners
function loadAllEventListeners(){
	//DOM Load event
	document.addEventListener('DOMContentLoaded', getTasks)
	//Add A Task
	form.addEventListener('submit', addTask)
	//Remove task event
	taskList.addEventListener('click', removeTask)
	//Clear Tasks Event
	clearBtn.addEventListener('click', clearTasks)
	//Filter Tasks Event
	filter.addEventListener('keyup', filterTasks)
}

//Get Tasks From Local Storage
function getTasks(){
	let tasks
	
	if(localStorage.getItem('tasks') === null){
		tasks = []
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'))
	}
	
	tasks.forEach((task) => {
		// Create li element
	const li = document.createElement('li')
	
	// Add Class
	li.className = 'collection-item'
	
	// Create text node and append to the li
	li.appendChild(document.createTextNode(task))
	
	// Create new link element
	const link = document.createElement('a')
	
	// Add Class
	link.className = 'delete-item secondary-content'
	
	// Add icon html
	link.innerHTML = '<i class="fa fa-remove"></i>'
	
	// Appened link to li
	li.appendChild(link)
	
	//Append li to ul
	taskList.appendChild(li)
	})
}

//Add Task
function addTask(e){
		
	if(taskInput.value === ''){
		alert('Add A Task!')
	}
	
	// Create li element
	const li = document.createElement('li')
	
	// Add Class
	li.className = 'collection-item'
	
	// Create text node and append to the li
	li.appendChild(document.createTextNode(taskInput.value))
	
	// Create new link element
	const link = document.createElement('a')
	
	// Add Class
	link.className = 'delete-item secondary-content'
	
	// Add icon html
	link.innerHTML = '<i class="fa fa-remove"></i>'
	
	// Appened link to li
	li.appendChild(link)
	
	//Append li to ul
	taskList.appendChild(li)
	
	//Store In Local Storage
	storeTakeInLocalStorage(taskInput.value)
	
	//Clear Input
	taskInput.value = ''
	
	e.preventDefault()
}


//Remove Task
function removeTask(e){
	if(e.target.parentElement.classList.contains('delete-item')){
		if(confirm('Are You Sure')){
			e.target.parentElement.parentElement.remove()
			
			//Remove from local storage
			removeTaskFromLocalStorage(e.target.parentElement.parentElement)
		}
	}
}

//Clear Tasks
function clearTasks(){
	
	while(taskList.firstChild){
		taskList.removeChild(taskList.firstChild)
	}
	
	clearTasksFromLocalStorage()
	
}

//Filter Tasks
function filterTasks(e) {
	const text = e.target.value.toLowerCase();
	
	document.querySelectorAll('.collection-item').forEach((task) => {
		const item = task.firstChild.textContent
		if(item.toLowerCase().indexOf(text) != -1){
			task.style.display = 'block'
		} else {
			task.style.display = 'None'
		}
	})
}

//Store In Local Storage
function storeTakeInLocalStorage(task){
	let tasks
	
	if(localStorage.getItem('tasks') === null){
		tasks = []
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'))
	}
	
	//Add To Array
	tasks.push(task)
	
	//Add to local storage
	localStorage.setItem('tasks', JSON.stringify(tasks))
}

//Remove From Local Storage
function removeTaskFromLocalStorage(taskItem) {
	let tasks
	
	if(localStorage.getItem('tasks') === null){
		tasks = []
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'))
	}
	
	tasks.forEach((task, index) => {
		if(taskItem.textContent === task){
			tasks.splice(index, 1)
		}
	})
	localStorage.setItem('tasks', JSON.stringify(tasks))
}

//Clear tasks from local storage
function clearTasksFromLocalStorage(){
	localStorage.clear()
}