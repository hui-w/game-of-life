/**
 * @author Wang, Hui (huiwang@qlike.com)
 * @repo https://github.com/hui-w/game-of-life
 * @licence MIT  
 */
var Config = {
  Matrix: {
    timerDelay: 500
  },
  Planet: {
    gridSize: 10
  },
  Monitor: {
    timerDelay: 200,
    gridSize: 200,
    keyboardChangeUnit: 10,
    keyboardTimerDelay: 50,
    fontSize: 9
  },
  Misc: {
    wrapperPadding: 0
  },
  zoomIn: function() {
    this.Planet.gridSize ++;
  },
  zoomOut: function() {
    this.Planet.gridSize --;
  }
}