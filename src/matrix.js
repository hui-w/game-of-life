/**
 * @author Wang, Hui (huiwang@qlike.com)
 * @repo https://github.com/hui-w/game-of-life
 * @licence MIT
 *
 * The class Matrix owns everything of the "Matrix"
 */
function Matrix() {
  this.timerCount = 0;
  this.planet = null;
  this.minions = {};
  this.previewReady = false;

  // Statuses: ready, playing, paused
  this.status = "ready";

  this.onStatusChanged = null;

  this.init();
}

Matrix.prototype = {
  init: function() {
    // Construct the Matrix
    this.planet = new Planet();

    // Init random minions
    this.initRandomMinions();

    var matrixTimerHandler = function() {
      this.timerCount++;
      this.tick();

      // Setup the timer for next round
      setTimeout(matrixTimerHandler, Config.Matrix.timerDelay);
    }.bind(this);

    // Setup the timer to update the matrix
    matrixTimerHandler();

    this.notifyStatys('ready');
  },

  notifyStatys: function(status) {
    if (typeof this.onStatusChanged === "function") {
      this.onStatusChanged(status);
    }
  },

  play: function() {
    this.notifyStatys('playing');
  },

  pause: function() {
    this.notifyStatys('paused');
  },

  next: function() {

  },

  stop: function() {
    this.notifyStatys('ready');
  },

  getKey: function(x, y) {
    return x + '_' + y;
  },

  tick: function() {
    if (this.previewReady) {
      this.commitPreview();
    } else {
      this.getPreview();
    }

    this.previewReady = !this.previewReady;
  },

  getPreview: function() {
    // Get all dead cells who are next to live cells
    var deadCells = {};
    Object.keys(this.minions).forEach(function(key) {
      var minion = this.minions[key];
      var x = minion.position.x;
      var y = minion.position.y;

      for (var i = x - 1; i <= x + 1; i++) {
        for (var j = y - 1; j <= y + 1; j++) {
          if (i === x && j === y) {
            continue;
          }

          var neighborKey = this.getKey(i, j);
          if (!this.minions[neighborKey] && !deadCells[neighborKey]) {
            deadCells[neighborKey] = { x: i, y: j };
          }
        }
      }

    }.bind(this));


    var nextRoundMinions = {};

    // Current live ones
    Object.keys(this.minions).forEach(function(key) {
      var minion = this.minions[key];
      var neighborCount = this.getNeighborCount(minion.position.x, minion.position.y);
      nextRoundMinions[key] = new Minion(minion.position.x, minion.position.y, neighborCount === 2 || neighborCount === 3 ? 0 : -1);
    }.bind(this));

    // Potential dead cells
    Object.keys(deadCells).forEach(function(key) {
      var x = deadCells[key].x;
      var y = deadCells[key].y;
      var neighborCount = this.getNeighborCount(x, y);
      if (neighborCount === 3) {
        nextRoundMinions[key] = new Minion(x, y, 1);
      }
    }.bind(this));

    this.minions = nextRoundMinions;
  },

  commitPreview: function() {
    var nextRoundMinions = {};

    // Current live ones
    Object.keys(this.minions).forEach(function(key) {
      var minion = this.minions[key];
      if (minion.status === 0 || minion.status === 1) {
        nextRoundMinions[key] = new Minion(minion.position.x, minion.position.y);
      }
    }.bind(this));

    this.minions = nextRoundMinions;
  },

  render: function(monitor) {
    // Render the planet
    this.planet.render(monitor);

    // Render minions
    Object.keys(this.minions).forEach(function(key) {
      var minion = this.minions[key];
      minion.render(monitor);
    }.bind(this))
  },

  getNeighborCount: function(x, y) {
    var count = 0;
    [-1, 0, 1].forEach(function(dx) {
      [-1, 0, 1].forEach(function(dy) {
        var currentX = x + dx;
        var currentY = y + dy;
        if (!(currentX === 0 && currentY === 0) && this.minions[this.getKey(currentX, currentY)]) {
          count++;
        }
      }.bind(this))
    }.bind(this));
    return count;
  },

  initRandomMinions: function() {
    var minionsCount = 200;
    var randStart = -9;
    var randEnd = 9;
    for (var i = 0; i <= minionsCount; i++) {
      var retryCount = 0;
      var x = rand(randStart, randEnd);
      var y = rand(randStart, randEnd);
      while (this.minions[this.getKey(x, y)] && retryCount < 10) {
        retryCount++;
        x = rand(randStart, randEnd);
        y = rand(randStart, randEnd);
      }
      var key = this.getKey(x, y);
      this.minions[key] = new Minion(x, y);
    }
  },
}