demo.state5 = function(){};
demo.state5.prototype = {
  preload: function(){},
  create: function(){
    console.log('state5')
    addChangeStateEventListeners();
  },
  update: function(){}
};