(function(global) {
  var TileMatrix = function(matrix) {
    var self = this;

    self.matrix = _(4).times(function() {
      return _(4).times(function() { return 0; });
    });

    matrix.forEach(function(row, x) {
      row.forEach(function(value, y) {
        self.matrix[x][y] = value;
      });
    });
  };

  var transpose = function(matrix) {
    return _.zip.apply(_, matrix);
  };
  var flip = function(matrix) {
    return matrix.map(function(v) {
      var u = _(v).clone();
      u.reverse();
      return u;
    });
  };
  var buildTraversal = function(direction) {
    var trv = _(4).times(function(x){
      return _(4).times(function(y){
        return {x: x, y: y};
      });
    });

    if (direction == ai.UP) {
      return trv;
    } else if (direction == ai.DOWN) {
      return flip(trv);
    } else if (direction == ai.LEFT) {
      return transpose(trv);
    } else if (direction == ai.RIGHT) {
      return flip(transpose(trv));
    } else {
      throw new Error("unsupported direction!");
    }
  };

  TileMatrix.prototype.isEqual = function(tm) {
    var self = this;
    return _.range(4).every(function(x){
      return _.range(4).every(function(y){
        return self.matrix[x][y] == tm.matrix[x][y];
      });
    });
  };

  TileMatrix.prototype.move = function (direction) {
    var self = this;
    var traversal = buildTraversal(direction);

    var new_matrix = traversal.map(function(trv){
      var reduced = [];
      var t;
      trv.forEach(function(idx){
        c = self.matrix[idx.x][idx.y];
        if (!c) {
          return;
        } else if (!t) {
          t = c;
        } else if (t != c) {
          reduced.push(t);
          t = c;
        } else { // if t == c
          reduced.push(t + c);
          t = null;
        }
      });
      if (t) reduced.push(t);

      return reduced;
    });

    var m = new TileMatrix(new_matrix);
    if (direction == ai.UP) {
      // do nothing
    } else if (direction == ai.DOWN) {
      m.matrix = flip(m.matrix);
    } else if (direction == ai.LEFT) {
      m.matrix = transpose(m.matrix);
    } else if (direction == ai.RIGHT) {
      m.matrix = transpose(flip(m.matrix));
    }
    return m;
  };

  TileMatrix.prototype.inspect = function() {
    var self = this;
    return _.zip.apply(_, self.matrix).map(function(row){
      return row.join("\t");
    }).join("\n");
  }

  global.ai.TileMatrix = TileMatrix;
})(window);
