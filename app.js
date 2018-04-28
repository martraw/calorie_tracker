// Storage controler

// Item controler
const ItemCtrl = (function() {

  // Item constructor
  const Item = function(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories =calories;
  };

  // Data Structure/State
  const data = {
    items: [
      {id: 0, name: 'Burger', calories: 1000},
      {id: 1, name: 'Pizza', calories: 1500},
      {id: 2, name: 'Buritto', calories: 500}
    ],
    currentItem: null,
    totalCalories: 0
  };

  // Public methods  
  return {
    getItems: function() {
      return data.items;
    },

    addItem: function(name, calories) {

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

    logData: function() {
      return data;
    }
  };
})();

// UI controler
const UICtrl = (function() {

  const UISelectors = {
    itemList: '#item-list',
    addBtn: '.add-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories'
  }

  // Public methods  
  return {
    populateItemList: function(items){
      let html = '';

      items.forEach(function(item) {
        html += `<li class="collection-item" id="item-${item.id}">
        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>
      </li>`;
      });
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },

    getItemInput: function() {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      }
    },

    getSelectors: function() {
      return UISelectors;
    }
  }  
})();

// App controler
const App = (function(ItemCtrl, UICtrl) {

  // Load event listeners
  const loadEventListeners = function() {
    const UISelectors = UICtrl.getSelectors();

    // Add item event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
  };

  // Add item submit
  const itemAddSubmit = function(e){

    // Get form input from UICtrl
    const input = UICtrl.getItemInput();

    if (input.name !== '' && input.calories !== '') {
      
      // Add item
      const newItem = ItemCtrl.addItem(input.name, input.calories)
    } 
    e.preventDefault();
  }

  // Public methods  
  return {
    init: function() {
      // Fetch items from data structure
      const items = ItemCtrl.getItems();
    
      // Populate list with items
      UICtrl.populateItemList(items);
      
      
      loadEventListeners();
    }

  }

})(ItemCtrl, UICtrl);

App.init();