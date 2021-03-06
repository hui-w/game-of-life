/**
 * @author Wang, Hui (huiwang@qlike.com)
 * @repo https://github.com/hui-w/game-of-life
 * @licence MIT
 *
 * The class Matrix owns everything of the "Matrix"
 */
function Matrix() {
  this.timerCount = null;
  this.planet = null;
  this.minions = null;
  this.previewReady = null;

  // Statuses: empty, ready, playing, paused
  this.status = null;

  this.onStatusChanged = null;
  this.onTimerTick = null;
}

Matrix.prototype = {
  init: function() {
    // Construct the Matrix
    this.planet = new Planet();
    this.initMinions();

    // Notify the initial status
    this.setStatus("empty");
  },

  initMinions: function() {
    this.previewReady = false;
    this.minions = {};
    this.timerCount = 0;
  },

  initRandomMinions: function() {
    // Clear before init
    this.initMinions();

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

    // Reset the timer count
    this.setTimerCount(0);
  },

  setTimerCount: function(timerCount) {
    this.timerCount = timerCount;
    if (typeof this.onTimerTick === "function") {
      this.onTimerTick(this.timerCount);
    }
  },

  setStatus: function(status) {
    this.status = status;
    if (typeof this.onStatusChanged === "function") {
      this.onStatusChanged(status);
    }
  },

  add: function() {
    this.setStatus("ready");
    this.initRandomMinions();
  },

  play: function() {
    this.setStatus("playing");

    // Auto play
    var matrixTimerHandler = function() {
      if (this.status !== "playing") {
        return;
      }

      this.tick();

      // Setup the timer for next round
      setTimeout(matrixTimerHandler, Config.Matrix.timerDelay);
    }.bind(this);

    // Setup the timer to update the matrix
    matrixTimerHandler();
  },

  pause: function() {
    this.setStatus("paused");
  },

  next: function() {
    this.setStatus("paused");
    this.tick();
  },

  stop: function() {
    this.setStatus("empty");
    this.initMinions();
  },

  getKey: function(x, y) {
    return x + "_" + y;
  },

  tick: function() {
    if (this.previewReady) {
      this.commitPreview();
    } else {
      this.getPreview();
    }

    this.setTimerCount(this.timerCount + 1);

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
        if (!(dx === 0 && dy === 0) && this.minions[this.getKey(currentX, currentY)]) {
          count++;
        }
      }.bind(this))
    }.bind(this));
    return count;
  },
}