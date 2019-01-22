function Minion(x, y, status = 0) {
  // Inherit all members from the base
  PlanetItem(Minion);

  // Init the minion status
  this.setSize(1, 1);
  this.setPosition(x, y);

  this.status = status;
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