demo.state6 = function(){};
demo.state6.prototype = {
  preload: function(){},
  create: function(){
    console.log('state6')
    addChangeStateEventListeners();
  },
  update: function(){}
};