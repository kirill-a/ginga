demo.state7 = function(){};
demo.state7.prototype = {
  preload: function(){},
  create: function(){
    console.log('state7')
    addChangeStateEventListeners();
  },
  update: function(){}
};