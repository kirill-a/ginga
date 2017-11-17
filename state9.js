demo.state9 = function(){};
demo.state9.prototype = {
  preload: function(){},
  create: function(){
    console.log('state9')
    addChangeStateEventListeners();
  },
  update: function(){}
};