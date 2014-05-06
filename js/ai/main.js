(function(global) {
  var loadGrid = function(){
    var cells = global.gameManager.grid.cells;

    var matrix = cells.map(function(row) {
      return row.map(function(tile) {
        return (tile ? tile.value : 0);
      });
    });

    return (new ai.TileMatrix(matrix));
  };

  var step = function() {
    var mtx = loadGrid();

    var solver = new ai.Solver(mtx);
    var dir    = solver.solve();

    console.log(dir);

    ai.Controller.move(dir);
  }

  var loop = function() {
    if (!global.gameManager.over) {
      step();
      setTimeout(loop, 500);
    }
  }

  $('.auto-button').on('click', function(e) {
    // while(!global.gameManager.over) {
    //   step();
    //   sleep(1);
    // }
    loop();
  });

  document.addEventListener("2048.moved", function(e) {
    queue.shift('done');
  })

})(window);
