/**
 * @author Wang, Hui (huiwang@qlike.com)
 * @repo https://github.com/hui-w/game-of-life
 * @licence MIT  
 *
 * The Minion class
 */
function Minion(x, y, status) {
  // Inherit all members from the base
  PlanetItem(Minion);

  // Init the minion status
  this.setSize(1, 1);
  this.setPosition(x, y);

  /**
   * Status:
   *  0:  Living
   *  -1: Dying
   *  1:  To be born
   */
  this.status = status === undefined ? 0 : status;
}

Minion.prototype = {
  render: function(monitor) {
    if (!this.isInMonitor(monitor)) {
      //no need to display if the item is out of the monitor boundaries
      return;
    }

    var rectOnMonitor = this.getRectOnMonitor(monitor);

    var context = monitor.context;
    context.save();
    context.beginPath();
    if (this.status === -1) {
      context.fillStyle = "RGBA(255, 0, 0 , 0.5)";
    } else if (this.status === 1) {
      context.fillStyle = "RGBA(0, 255, 0 , 0.5)";
    } else {
      context.fillStyle = "RGBA(0, 0, 255 , 0.5)";
    }
    context.fillRect(
      rectOnMonitor.x + 1,
      rectOnMonitor.y + 1,
      rectOnMonitor.width - 2,
      rectOnMonitor.height - 2
    );
    context.restore();
  }
}