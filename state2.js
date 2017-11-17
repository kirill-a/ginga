demo.state2 = function(){};
demo.state2.prototype = {
  preload: function(){},
  create: function(){
    console.log('state2')
    addChangeStateEventListeners();
  },
  update: function(){}
};