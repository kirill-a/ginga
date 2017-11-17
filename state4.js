demo.state4 = function(){};
demo.state4.prototype = {
  preload: function(){},
  create: function(){
    console.log('state4')
    addChangeStateEventListeners();
  },
  update: function(){}
};