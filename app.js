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
    logData: function() {
      return data;
    }
  };
})();

// UI controler
const UICtrl = (function() {

  // Public methods  
  return {
    
  }  
})();

// App controler
const App = (function(ItemCtrl, UICtrl) {

  // Public methods  
  return {
    init: function() {
      console.log(`Initializing App ...`);
    }
  }

})(ItemCtrl, UICtrl);

App.init();