(function(global) {
  var running = false;

  var setup = function() {
    var text_start = 'Start Auto Solving!';
    var text_stop  = 'Stop!';

    var $auto_button = $('<div><a class="auto-button">' + text_start + '</a></div>');

    $auto_button.on('click', function (e) {
      if (running) {
        $auto_button.find('a').text(text_start);
        running = false;
      } else {
        $auto_button.find('a').text(text_stop);
        running = true;
        loop();
      }
    });

    $auto_button.insertAfter('.above-game');
  };

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

    ai.Controller.move(dir);
  }

  var loop = function() {
    if (!global.gameManager.over && running) {
      step();
      setTimeout(loop, 100);
    }
  }

  setup();
})(window);
