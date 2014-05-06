(function(global){
  var move = function(direction) {
    global.gameManager.inputManager.emit("move", direction)
  };

  global.ai.Controller = {
    move: move
  };
})(window);
