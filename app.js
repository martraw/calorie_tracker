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

    logData: function() {
      return data;
    }
  };
})();

// UI controler
const UICtrl = (function() {

  const UISelectors = {
    itemList: '#item-list'
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
    }
  }  
})();

// App controler
const App = (function(ItemCtrl, UICtrl) {

  // Public methods  
  return {
    init: function() {
      const items = ItemCtrl.getItems();
      // console.log(items);
      UICtrl.populateItemList(items)
    }

  }

})(ItemCtrl, UICtrl);

App.init();