// Storage controler
const StorageCtrl = (function () {
  // Public methods
  return {
    storeItem: function(item) {
      let items;

      // Check if any items alredy in localStorage
      if (localStorage.getItem('items') === null) {
        items = [];

        items.push(item);

        // Set item
        localStorage.setItem('items', JSON.stringify(items));
      } else {
        items = JSON.parse(localStorage.getItem('items'));

        items.push(item);

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

    clearAllItemsFromStorage: function() {
      localStorage.removeItem('items');
    }
  }
})();


// Item controler
const ItemCtrl = (function () {

  // Item constructor
  const Item = function (id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  // Data Structure/State
  const data = {
    // items: [ { id: 0, name: 'Burger', calories: 1000 }, { id: 1, name: 'Pizza', calories: 1500 }, { id: 2, name: 'Buritto', calories: 500 } ],
    items: StorageCtrl.getItemsFromStorage(),
    currentItem: null,
    totalCalories: 0
  };

  // Public methods  
  return {
    getItems: function () {
      return data.items;
    },

    addItem: function (name, calories) {

      // Create Id
      let ID;
      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }

      calories = parseInt(calories);

      // Create new item
      const newItem = new Item(ID, name, calories);

      // Add new item to array
      data.items.push(newItem);

      return newItem;
    },

    updateItem: function (name, calories) {
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

    deleteItem: function (id) {
      // Get ids
      const ids = data.items.map(item => {
        return item.id;
      });

      const index = ids.indexOf(id);

      // Remove item
      data.items.splice(index, 1);
    },

    clearAllItems: function () {
      data.items = [];
    },

    setCurrentItem: function (item) {
      data.currentItem = item;
    },

    getCurrentItem: function () {
      return data.currentItem;
    },

    getItemById: function (id) {
      let found = null;

      // Loop through list items
      data.items.forEach(item => {
        if (item.id === id) {
          found = item;
        }
      })

      return found;
    },

    getTotalCalories: function () {
      let total = 0;

      data.items.forEach(item => {
        total += item.calories;
      });

      data.totalCalories = total;

      return data.totalCalories;
    },

    logData: function () {
      return data;
    }
  };
})();

// UI controler
const UICtrl = (function () {

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
  }

  // Public methods  
  return {
    populateItemList: function (items) {
      let html = '';

      items.forEach(function (item) {
        html += `<li class="collection-item" id="item-${item.id}">
        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>
      </li>`;
      });
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },

    getItemInput: function () {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      }
    },

    addListItem: function (item) {

      // Show the list
      document.querySelector(UISelectors.itemList).style.display = 'block';

      const li = document.createElement('li');

      li.className = 'collection-item';
      li.id = `item-${item.id}`;
      li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
     <a href="#" class="secondary-content">
       <i class="edit-item fa fa-pencil"></i>
     </a>`;

      document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
    },

    updateListItem: function (item) {
      let listItems = document.querySelectorAll(UISelectors.listItems);

      listItems.forEach(listItem => {
        const itemID = listItem.getAttribute('id');

        if (itemID === `item-${item.id}`) {
          document.querySelector(`#item-${item.id}`).innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
          <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
          </a>`;
        }
      })
    },

    deleteListItem: function (id) {
      const itemID = `#item-${id}`;
      const item = document.querySelector(itemID);
      item.remove();
    },

    clearInputFields: function () {
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemCaloriesInput).value = '';
    },

    addItemToForm: function () {
      document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
      document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
      UICtrl.showEditState();
    },

    removeItems: function () {
      let listItems = document.querySelectorAll(UISelectors.listItems);

      listItems.forEach(item => item.remove());
    },

    hideList: function () {
      document.querySelector(UISelectors.itemList).style.display = 'none';
    },

    showTotalCalories: function (totalCalories) {
      document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
    },

    showEditState: function () {
      document.querySelector(UISelectors.updateBtn).style.display = 'inline';
      document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
      document.querySelector(UISelectors.backBtn).style.display = 'inline';
      document.querySelector(UISelectors.addBtn).style.display = 'none';
    },

    clearEditState: function () {
      UICtrl.clearInputFields();
      document.querySelector(UISelectors.updateBtn).style.display = 'none';
      document.querySelector(UISelectors.deleteBtn).style.display = 'none';
      document.querySelector(UISelectors.backBtn).style.display = 'none';
      document.querySelector(UISelectors.addBtn).style.display = 'inline';

    },

    getSelectors: function () {
      return UISelectors;
    }
  }
})();

// App controler
const App = (function (ItemCtrl,StorageCtrl, UICtrl) {

  // Load event listeners
  const loadEventListeners = function () {
    const UISelectors = UICtrl.getSelectors();

    // Add item event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

    // Disable submit when press Enter
    document.addEventListener('keypress', function (e) {
      if (e.keyCode === 13) {
        e.preventDefault();
        return false;
      }
    })

    // Edit icon click event
    document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

    // Update item event
    document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

    // Delete item event
    document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);


    // Back button event
    document.querySelector(UISelectors.backBtn).addEventListener('click', e => {
      UICtrl.clearEditState();
      e.preventDefault();
    });

    // Celear all button event
    document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);
  };

  // Add item submit
  const itemAddSubmit = function (e) {

    // Get form input from UICtrl
    const input = UICtrl.getItemInput();

    if (input.name !== '' && input.calories !== '') {

      // Add item
      const newItem = ItemCtrl.addItem(input.name, input.calories);

      // Add new item to the list
      UICtrl.addListItem(newItem);

      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();

      // Add totalCalories to UI;
      UICtrl.showTotalCalories(totalCalories);
      
      //Store in localStorage
      StorageCtrl.storeItem(newItem);

      // Clear form fields
      UICtrl.clearInputFields();
    }

    e.preventDefault();
  }

  // Item edit click
  const itemEditClick = function (e) {

    if (e.target.classList.contains('edit-item')) {

      // Get list item id (item-0; item-1...)
      const itemId = e.target.parentNode.parentNode.id;

      const itemIdArr = itemId.split('-');

      // Get actual id
      const id = parseInt(itemIdArr[1]);

      // Get item
      const itemToEdit = ItemCtrl.getItemById(id);

      // Set current item
      ItemCtrl.setCurrentItem(itemToEdit);

      // Add item to form
      UICtrl.addItemToForm();
    }
    e.preventDefault();
  }

  // Item update submit
  const itemUpdateSubmit = function (e) {

    // Get item input
    const input = UICtrl.getItemInput();

    // Update item
    const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

    // Update UI
    UICtrl.updateListItem(updatedItem);

    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();

    // Add totalCalories to UI;
    UICtrl.showTotalCalories(totalCalories);

    // Update item in local storage
    StorageCtrl.updateItemStorage(updatedItem);

    UICtrl.clearEditState();

    e.preventDefault();
  }

  const itemDeleteSubmit = function (e) {
    // Get current item
    const currentItem = ItemCtrl.getCurrentItem();

    //Delete item from data structure
    ItemCtrl.deleteItem(currentItem.id);

    // Delete item list
    UICtrl.deleteListItem(currentItem.id);

    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();

    // Add totalCalories to UI;
    UICtrl.showTotalCalories(totalCalories);

    // Remove item from local storage
    StorageCtrl.deleteItemFromStorage(currentItem.id);

    UICtrl.clearEditState();

    e.preventDefault();
  }

  // Clear all item event
  const clearAllItemsClick = function () {
    // Delete all items from data structure
    ItemCtrl.clearAllItems();

    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();

    // Add totalCalories to UI;
    UICtrl.showTotalCalories(totalCalories);

    //Remove items from UI
    UICtrl.removeItems();

    // Remove all items from local storage
    StorageCtrl.clearAllItemsFromStorage();

    UICtrl.hideList();
  }

  // Public methods  
  return {
    init: function () {
      // Set initial state
      UICtrl.clearEditState();

      // Fetch items from data structure
      const items = ItemCtrl.getItems();

      // Check if any items
      if (items.length === 0) {
        UICtrl.hideList();
      } else {

        // Populate list with items
        UICtrl.populateItemList(items);
      };

      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();

      // Add totalCalories to UI;
      UICtrl.showTotalCalories(totalCalories);

      loadEventListeners();
    }

  }

})(ItemCtrl, StorageCtrl, UICtrl);

App.init();