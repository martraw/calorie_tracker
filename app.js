// Storage controler

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
    items: [
     /*  {
        id: 0,
        name: 'Burger',
        calories: 1000
      },
      {
        id: 1,
        name: 'Pizza',
        calories: 1500
      },
      {
        id: 2,
        name: 'Buritto',
        calories: 500
      } */
    ],
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

    getTotalCalories: function() {
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
    addBtn: '.add-btn',
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

    addListItem: function(item) {

      // Show the list
      document.querySelector(UISelectors.itemList).style.display = 'block';

     const li =  document.createElement('li');

     li.className = 'collection-item';
     li.id = `item-${item.id}`;
     li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
     <a href="#" class="secondary-content">
       <i class="edit-item fa fa-pencil"></i>
     </a>`;

     document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
    },

    clearInputFields: function() {
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemCaloriesInput).value = '';
    },

    hideList: function() {
      document.querySelector(UISelectors.itemList).style.display = 'none';
    },

    showTotalCalories: function(totalCalories) {
      document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
    },

    getSelectors: function () {
      return UISelectors;
    }
  }
})();

// App controler
const App = (function (ItemCtrl, UICtrl) {

  // Load event listeners
  const loadEventListeners = function () {
    const UISelectors = UICtrl.getSelectors();

    // Add item event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
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

      // Clear form fields
      UICtrl.clearInputFields();
    }

    e.preventDefault();
  }

  // Public methods  
  return {
    init: function () {

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

})(ItemCtrl, UICtrl);

App.init();