// Storage Controller
const StorageCtrl = (function() {
  //Public Mehtods
  return {
    storeItem: function(item) {
      let items;
      // Check if any items in local strorage
      if (localStorage.getItem('items') === null) {
        items = [];
        //Push New Item
        items.push(item);
        //Set Local Storage
        console.log(items);
        localStorage.setItem('items', JSON.stringify(items));
      } else {
        items = JSON.parse(localStorage.getItem('items'));

        //Push The New Item
        items.push(item);
        console.log(items);

        //Reset Local Storage
        localStorage.setItem('items', JSON.stringify(items));
      }
    },
    getItemsFromStorage: function() {
      let items;
      if (localStorage.getItem('items') === null) {
        items = [];
      } else {
        items = JSON.parse(localStorage.getItem('items'));
      }
      return items;
    },
    updateItemStorage: function(updatedItem) {
      let items = JSON.parse(localStorage.getItem('items'));

      items.forEach((item, index) => {
        if (updatedItem.id === item.id) {
          items.splice(index, 1, updatedItem);
        }
      });
      localStorage.setItem('items', JSON.stringify(items));
    },
    deleteItemFromStorage: function(id) {
      let items = JSON.parse(localStorage.getItem('items'));

      items.forEach((item, index) => {
        if (id === item.id) {
          items.splice(index, 1);
        }
      });
      localStorage.setItem('items', JSON.stringify(items));
    },
    clearItemsFromStorage: function() {
      localStorage.removeItem('items');
    }
  };
})();

// Item Controller
const ItemCtrl = (function() {
  //Item Constructor
  const Item = function(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };
  // Data Structure / State
  const data = {
    // items: [
    //   /*{
    //     id: 0,
    //     name: 'Steak Dinner',
    //     calories: 1200
    //   },
    //   {
    //     id: 1,
    //     name: 'Cookie',
    //     calories: 400
    //   },
    //   {
    //     id: 2,
    //     name: 'Eggs',
    //     calories: 200
    //   },*/
    //   ],
    items: StorageCtrl.getItemsFromStorage(),
    currentItem: null,
    totalCalories: 0
  };
  return {
    getItems: function() {
      return data.items;
    },

    addItem: function(name, calories) {
      let ID;
      //Create ID
      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }
      //Calories To Number
      calories = parseInt(calories);

      //Create new item
      newItem = new Item(ID, name, calories);

      //Add To Item Array
      data.items.push(newItem);

      return newItem;
    },
    getItemById: function(id) {
      let found = null;
      // Loop through items
      data.items.forEach(function(item) {
        if (item.id === id) {
          found = item;
        }
      });
      return found;
    },
    updateItem: function(name, calories) {
      //Calories to number
      calories = parseInt(calories);

      let found = null;

      data.items.forEach(item => {
        if (item.id === data.currentItem.id) {
          item.name = name;
          item.calories = calories;
          found = item;
        }
      });
      return found;
    },
    deleteItem: function(id) {
      const ids = data.items.map(item => {
        return item.id;
      });
      //Get Index
      const index = ids.indexOf(id);

      //Remove Item
      data.items.splice(index, 1);
    },
    clearAllItems: function() {
      //Remove From Data Strucutre
      data.items = [];

      //Remove From UI
      UICtrl.removeItems();
    },
    setCurrentItem: function(item) {
      data.currentItem = item;
    },
    getCurrentItem: function() {
      return data.currentItem;
    },
    getTotalCalories: function() {
      let total = 0;

      // Loop through items and add cals
      data.items.forEach(item => {
        total += item.calories;
      });

      // Set total cal in data structure
      data.totalCalories = total;

      //Return total
      return data.totalCalories;
    },

    logData: function() {
      return data;
    }
  };
})();

// UI Controller
const UICtrl = (function() {
  const UISelectors = {
    itemList: '#item-list',
    listItems: '#item-list li',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
    clearBtn: '.clear-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
    totalCalories: '.total-calories'
  };

  // Public Method
  return {
    populateItemList: function(items) {
      let html = '';
      items.forEach(item => {
        html += `
					<li class="collection-item" id="item-${item.id}">
				<strong>${item.name}: </strong> <em>${item.calories}</em>
				<a href="#" class="secondary-content">
					<i class="edit-item fa fa-pencil"></i>
				</a>
			</li>
				`;
      });
      //Insert List Items
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },

    getItemInput: function() {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      };
    },

    getSelectors: function() {
      return UISelectors;
    },
    addListItem: function(item) {
      //Show The List
      document.querySelector(UISelectors.itemList).style.display = 'block';
      //Create Li Element
      const li = document.createElement('li');
      //Add Class
      li.className = 'collection-item';
      //Add Id
      li.id = `item-${item.id}`;
      //Add HTML
      li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories}</em>
				<a href="#" class="secondary-content">
					<i class="edit-item fa fa-pencil"></i>
				</a>`;
      //Insert Item
      document
        .querySelector(UISelectors.itemList)
        .insertAdjacentElement('beforeend', li);
    },
    updateListItem: function(item) {
      let listItems = document.querySelectorAll(UISelectors.listItems);

      //Turn Node list into array
      listItems = Array.from(listItems);

      listItems.forEach(listItem => {
        const itemID = listItem.getAttribute('id');

        if (itemID === `item-${item.id}`) {
          document.querySelector(`#${itemID}`).innerHTML = `<strong>${
            item.name
          }: </strong> <em>${item.calories}</em>
				<a href="#" class="secondary-content">
					<i class="edit-item fa fa-pencil"></i>
				</a>`;
        }
      });
    },
    deleteListItem: function(id) {
      const itemId = `#item-${id}`;
      const item = document.querySelector(itemId);
      item.remove();
      // Get Item Calories
      const totalCalories = ItemCtrl.getTotalCalories();
      //Add Total Calories to UI
      UICtrl.showTotalCalories(totalCalories);
      //Clear Edit State
      UICtrl.clearEditState();
    },
    removeItems: function() {
      let listItems = document.querySelectorAll(UISelectors.listItems);
      //Turn node list into array
      listItems = Array.from(listItems);
      listItems.forEach(item => {
        item.remove();
      });
    },
    clearInput: function() {
      document.querySelector(UISelectors.itemCaloriesInput).value = '';
      document.querySelector(UISelectors.itemNameInput).value = '';
    },
    hideList: function() {
      document.querySelector(UISelectors.itemList).style.display = 'none';
    },
    addItemToForm: function() {
      document.querySelector(
        UISelectors.itemNameInput
      ).value = ItemCtrl.getCurrentItem().name;
      document.querySelector(
        UISelectors.itemCaloriesInput
      ).value = ItemCtrl.getCurrentItem().calories;
      UICtrl.showEditState();
    },
    showTotalCalories: function(totalCalories) {
      document.querySelector(
        UISelectors.totalCalories
      ).textContent = totalCalories;
    },
    clearEditState: function() {
      UICtrl.clearInput();
      document.querySelector(UISelectors.updateBtn).style.display = 'none';
      document.querySelector(UISelectors.deleteBtn).style.display = 'none';
      document.querySelector(UISelectors.backBtn).style.display = 'none';
      document.querySelector(UISelectors.addBtn).style.display = 'inline';
    },
    showEditState: function() {
      document.querySelector(UISelectors.updateBtn).style.display = 'inline';
      document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
      document.querySelector(UISelectors.backBtn).style.display = 'inline';
      document.querySelector(UISelectors.addBtn).style.display = 'none';
    },
    clearAllItemsClick: function() {
      //Delete All Items From Data Structure
      ItemCtrl.clearAllItems();
      // Get Item Calories
      const totalCalories = ItemCtrl.getTotalCalories();
      //Add Total Calories to UI
      UICtrl.showTotalCalories(totalCalories);
      //Clear From Local Storage
      StorageCtrl.clearItemsFromStorage();
      //Clear Fields
      UICtrl.clearInput();
      //Hide List
      UICtrl.hideList();
    }
  };
})();

// App Controller
const AppCtrl = (function(StorageCtrl, ItemCtrl, UICtrl) {
  // Load Event Listeners
  const loadEventListeners = function() {
    // Get UI Selectors
    const UISelectors = UICtrl.getSelectors();

    // Add item event
    document
      .querySelector(UISelectors.addBtn)
      .addEventListener('click', itemAddSubmit);

    //Disable Submit on Enter
    document.addEventListener('keypress', e => {
      if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
      }
    });

    //Edit Icon Event
    document
      .querySelector(UISelectors.itemList)
      .addEventListener('click', itemUpdateClick);

    //Update Item Event
    document
      .querySelector(UISelectors.updateBtn)
      .addEventListener('click', itemUpdateSubmit);
    //Delete Item Event
    document
      .querySelector(UISelectors.deleteBtn)
      .addEventListener('click', itemDeleteSubmit);
    //Back Button Event
    document
      .querySelector(UISelectors.backBtn)
      .addEventListener('click', UICtrl.clearEditState);

    document
      .querySelector(UISelectors.clearBtn)
      .addEventListener('click', UICtrl.clearAllItemsClick);
  };

  // Add item submit
  const itemAddSubmit = function(e) {
    // Get form input from UI Controller
    const input = UICtrl.getItemInput();

    // Check for name and calorie input
    if (input.name !== '' && input.calories !== '') {
      // Add Item
      const newItem = ItemCtrl.addItem(input.name, input.calories);

      // Add item to UI list
      UICtrl.addListItem(newItem);

      // Get Item Calories
      const totalCalories = ItemCtrl.getTotalCalories();
      //Add Total Calories to UI
      UICtrl.showTotalCalories(totalCalories);
      //Store In Locale Storage
      StorageCtrl.storeItem(newItem);
      //Clear Fields
      UICtrl.clearInput();
    }

    e.preventDefault();
  };

  //Update Item Submit
  const itemUpdateSubmit = function(e) {
    //Get Item Input
    const input = UICtrl.getItemInput();

    //Updated Item
    const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

    //Update UI
    UICtrl.updateListItem(updatedItem);

    // Get Item Calories
    const totalCalories = ItemCtrl.getTotalCalories();
    //Add Total Calories to UI
    UICtrl.showTotalCalories(totalCalories);

    //Update local storage
    StorageCtrl.updateItemStorage(updatedItem);

    //Clear Edit State
    UICtrl.clearEditState();

    e.preventDefault;
  };

  const itemUpdateClick = function(e) {
    if (e.target.classList.contains('edit-item')) {
      //Get list item id
      const listID = e.target.parentNode.parentNode.id;

      //Break Into An Array
      const listIDArray = listID.split('-');

      //Get the actual ID
      const id = parseInt(listIDArray[1]);

      //Get Item
      const itemToEdit = ItemCtrl.getItemById(id);

      //Set Current Item
      ItemCtrl.setCurrentItem(itemToEdit);

      //Add Item To Form
      UICtrl.addItemToForm();
      //
    }
  };
  // Delete Button Event
  const itemDeleteSubmit = function(e) {
    //Get current Item
    const currentItem = ItemCtrl.getCurrentItem();

    //Delete From Data Structure
    ItemCtrl.deleteItem(currentItem.id);

    //Delete From UI
    UICtrl.deleteListItem(currentItem.id);

    // Get Item Calories
    const totalCalories = ItemCtrl.getTotalCalories();
    //Add Total Calories to UI
    UICtrl.showTotalCalories(totalCalories);

    //Delete From Local Storage
    StorageCtrl.deleteItemFromStorage(currentItem.id);

    UICtrl.clearEditState();

    e.preventDefault();
  };

  // Public Method
  return {
    init: function() {
      //Clear edit state /set inital state
      UICtrl.clearEditState();

      //Fetch items from data structure
      const items = ItemCtrl.getItems();

      // Check if any items
      if (items.length === 0) {
        UICtrl.hideList();
      } else {
        //Populate list with items
        UICtrl.populateItemList(items);
      }

      // Get Item Calories
      const totalCalories = ItemCtrl.getTotalCalories();
      //Add Total Calories to UI
      UICtrl.showTotalCalories(totalCalories);
      //Load Event Listeners
      loadEventListeners();
    }
  };
})(StorageCtrl, ItemCtrl, UICtrl);

// Initializing App
AppCtrl.init();
