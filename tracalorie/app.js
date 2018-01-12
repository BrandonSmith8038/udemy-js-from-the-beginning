// Storage Controller





// Item Controller
const ItemCtrl = (function() {
 //Item Constructor
 const Item = function(id, name, calories){
   this.id = id
   this.name = name
   this.calories = calories
 }
 // Data Structure / State
 const data = {
   items: [
     /*{
       id: 0,
       name: 'Steak Dinner',
       calories: 1200
     },
     {
       id: 1,
       name: 'Cookie',
       calories: 400
     },
     {
       id: 2,
       name: 'Eggs',
       calories: 200
     },*/
     ],
   currentItem: null,
   totalCalories: 0
 }
 return {
   getItems: function(){
    return data.items 
   },
   
   addItem: function(name, calories){
     let ID
     //Create ID
     if(data.items.length > 0){
       ID = data.items[data.items.length - 1].id + 1
     } else {
       ID = 0
     }
     //Calories To Number
     calories = parseInt(calories)
     
     //Create new item
     newItem = new Item(ID, name, calories)
     
     //Add To Item Array
     data.items.push(newItem)
     
     return newItem
   },
    getItemById: function(id){
      let found = null;
      // Loop through items
      data.items.forEach(function(item){
        if(item.id === id){
          found = item;
        }
      });
      return found;
    },
    setCurrentItem: function(item){
      data.currentItem = item
    },
    getCurrentItem: function(){
      return data.currentItem
    },
   getTotalCalories: function(){
     let total = 0
     
     // Loop through items and add cals
     data.items.forEach(item => {
       total += item.calories
     })
     
     // Set total cal in data structure
     data.totalCalories = total
     
     //Return total
     return data.totalCalories
   },
   
   logData: function(){
     return data
   }
 }
})()







// UI Controller
const UICtrl = (function() {
  
  const UISelectors = {
    itemList: '#item-list',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
    totalCalories: '.total-calories'
  }

  // Public Method
  return {
    populateItemList: function(items){
      let html = ''
      items.forEach(item => {
        html += `
          <li class="collection-item" id="item-${item.id}">
				<strong>${item.name}: </strong> <em>${item.calories}</em>
				<a href="#" class="secondary-content">
					<i class="edit-item fa fa-pencil"></i>
				</a>
			</li>
        `
      })
      //Insert List Items
      document.querySelector(UISelectors.itemList).innerHTML = html
    },
    
    getItemInput: function(){
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      }
    },
    
    getSelectors: function(){
      return UISelectors
    },
    addListItem: function(item){
			//Show The List
			document.querySelector(UISelectors.itemList).style.display = 'block'
      //Create Li Element
      const li = document.createElement('li')
      //Add Class
      li.className = 'collection-item'
      //Add Id
      li.id = `item-${item.id}`
      //Add HTML
      li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories}</em>
				<a href="#" class="secondary-content">
					<i class="edit-item fa fa-pencil"></i>
				</a>`
			//Insert Item
			document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li)
    },
    clearInput: function(){
      document.querySelector(UISelectors.itemCaloriesInput).value = ''
      document.querySelector(UISelectors.itemNameInput).value = ''
    },
    hideList: function(){
      document.querySelector(UISelectors.itemList).style.display = 'none'
    },
    addItemToForm: function(){
      document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name
      document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories
      UICtrl.showEditState()
    },
    showTotalCalories: function(totalCalories){
      document.querySelector(UISelectors.totalCalories).textContent = totalCalories
    },
    clearEditState: function(){
      UICtrl.clearInput()
      document.querySelector(UISelectors.updateBtn).style.display = 'none'
      document.querySelector(UISelectors.deleteBtn).style.display = 'none'
      document.querySelector(UISelectors.backBtn).style.display = 'none'
      document.querySelector(UISelectors.addBtn).style.display = 'inline'
      
    },
    showEditState: function(){
      document.querySelector(UISelectors.updateBtn).style.display = 'inline'
      document.querySelector(UISelectors.deleteBtn).style.display = 'inline'
      document.querySelector(UISelectors.backBtn).style.display = 'inline'
      document.querySelector(UISelectors.addBtn).style.display = 'none'
      
    }
  }
})()









// App Controller
const AppCtrl = (function(ItemCtrl, UICtrl) {
  // Load Event Listeners
  const loadEventListeners = function(){
    // Get UI Selectors
    const UISelectors = UICtrl.getSelectors()
    
    
    // Add item event
    document.querySelector(UISelectors.addBtn).addEventListener('click',itemAddSubmit)
    
    //Edit Icon Event
    document.querySelector(UISelectors.itemList).addEventListener('click', itemUpdateSubmit)
    
  }
  
  // Add item submit
  const itemAddSubmit = function(e){
    
    // Get form input from UI Controller
    const input = UICtrl.getItemInput()
    
    // Check for name and calorie input
    if(input.name !== '' && input.calories !== ''){
      // Add Item
      const newItem = ItemCtrl.addItem(input.name, input.calories)
      
      // Add item to UI list
      UICtrl.addListItem(newItem)
      
      // Get Item Calories
      const totalCalories = ItemCtrl.getTotalCalories()
      //Add Total Calories to UI
      UICtrl.showTotalCalories(totalCalories)
      //Clear Fields
      UICtrl.clearInput()
      
      
    }
    
    e.preventDefault()
  }
   const itemUpdateSubmit = function(e){
    if(e.target.classList.contains('edit-item')){
      //Get list item id
      const listID = e.target.parentNode.parentNode.id
      
      //Break Into An Array
      const listIDArray = listID.split('-')
      
      //Get the actual ID
      const id = parseInt(listIDArray[1])
      
      //Get Item
      const itemToEdit = ItemCtrl.getItemById(id)
      
      //Set Current Item
      ItemCtrl.setCurrentItem(itemToEdit)
      
      //Add Item To Form
      UICtrl.addItemToForm()
    //
    }
  }
  
  // Public Method
  return {
    init: function(){
      //Clear edit state /set inital state
      UICtrl.clearEditState()
      
      //Fetch items from data structure
      const items = ItemCtrl.getItems()
      
      // Check if any items
      if(items.length === 0){
        UICtrl.hideList()
      } else {
        //Populate list with items
        UICtrl.populateItemList(items)
      }
      
      // Get Item Calories
      const totalCalories = ItemCtrl.getTotalCalories()
      //Add Total Calories to UI
      UICtrl.showTotalCalories(totalCalories)
      //Load Event Listeners
      loadEventListeners()
    }
  }
})(ItemCtrl, UICtrl)


// Initializing App
  AppCtrl.init()