demo.state3 = function(){};
demo.state3.prototype = {
  preload: function(){},
  create: function(){
    console.log('state3')
    addChangeStateEventListeners();
  },
  update: function(){}
};