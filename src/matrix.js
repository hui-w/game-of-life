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
  this.minions = [];

  this.init();
}

Matrix.prototype = {
  init: function() {
    var that = this;

    // Construct the Matrix
    this.planet = new Planet();

    this.minions.push(new Minion(1, 1));
    this.minions.push(new Minion(3, 1));

    // Setup the timer to update the matrix
    matrixTimerHandler();

    function matrixTimerHandler() {
      that.timerCount++;
      // Handle minions
      for (var i = 0; i < that.minions.length; i++) {
        var minion = that.minions[i];
        // minion.go();
      }

      // Setup the timer for next round
      setTimeout(matrixTimerHandler, Config.Matrix.timerDelay);
    };
  },

  render: function(monitor) {
    // Render the planet
    this.planet.render(monitor);

    // Eender minions
    for (var i = 0; i < this.minions.length; i++) {
      var minion = this.minions[i];
      minion.render(monitor);
    }
  }
}