function Minion(x, y) {
  // Inherit all members from the base
  PlanetItem(Minion);

  // Init the minion status
  this.setSize(1, 1);
  this.setPosition(x, y);
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
    context.fillStyle = "RGBA(0, 0, 0 , 0.5)";
    context.fillRect(
      rectOnMonitor.x,
      rectOnMonitor.y,
      rectOnMonitor.width,
      rectOnMonitor.height
    );
    context.restore();
  }
}