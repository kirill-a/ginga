demo.state8 = function(){};
demo.state8.prototype = {
  preload: function(){},
  create: function(){
    console.log('state8')
    addChangeStateEventListeners();
  },
  update: function(){}
};