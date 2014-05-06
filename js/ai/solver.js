(function(global) {
  var Solver = function (grid) {
    this.grid = grid;
  };

  var candidates = [ ai.UP, ai.RIGHT, ai.DOWN, ai.LEFT ];

  Solver.prototype.genCandidates = function () {
    var self = this;

    return candidates.map(function(direction) {
      return {
        direction: direction,
        grid   : self.grid.move(direction)
      };
    }).filter(function(candidate) {
      return !(self.grid.isEqual(candidate.grid));
    });
  };

  Solver.prototype.score = function(grid) {
    var matrix = this.grid.matrix;

    var score = 0;
    matrix.forEach(function(row){
      row.forEach(function(value){
        if (value > 0) score++;
      });
    });

    return score;
  }

  Solver.prototype.solve = function() {
    var self = this;

    var scores = self.genCandidates().map(function(candidate) {
      return {
        direction: candidate.direction,
        score    : self.score(candidate.grid)
      };
    });

    var soltion = _(scores).max(function(candidate){
      return candidate.score;
    });

    return soltion.direction;
  }

  global.ai.Solver = Solver;
})(window);
