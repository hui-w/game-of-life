/**
 * @author Wang, Hui (huiwang@qlike.com)
 * @repo https://github.com/hui-w/game-of-life
 * @licence MIT
 *
 * The class PlanetItem is the base class which all items on the "planet" are dirived from
 */
function PlanetItem(child) {
  /*
  base class for items on the planet
   */
  for (key in PlanetItem.prototype) {
    child.prototype[key] = PlanetItem.prototype[key];
  }
}

PlanetItem.prototype = {
  // Size and position (grid)
  size: {
    width: 0,
    height: 0
  },
  position: {
    x: 0,
    y: 0
  },

  // Size and position (pixel)
  pxSize: {
    width: 0,
    height: 0
  },
  pxPosition: {
    x: 0,
    y: 0
  },

  pxOffset: {
    x: 0,
    y: 0
  },

  // Change the width and height based on the grid system
  setSize: function(width, height) {
    this.size = {
      width: width,
      height: height
    };

    this.pxSize = {
      width: Config.Planet.gridSize * width,
      height: Config.Planet.gridSize * height
    };
  },

  // Change the position based on the grid system
  setPosition: function(x, y) {
    this.position = {
      x: x,
      y: y
    };

    this.pxPosition = {
      x: Config.Planet.gridSize * x,
      y: Config.Planet.gridSize * y
    }
  },

  // Move by grid
  move: function(dx, dy) {
    this.setPosition(this.position.x + dx, this.position.y + dy);
    this.pxOffset = {
      x: -Config.Planet.gridSize * dx,
      y: -Config.Planet.gridSize * dy
    }
  },

  // Get the rectangle of the object on monitor
  getRectOnMonitor: function(monitor) {
    var monitorPos = monitor.planetToMonitor(
      this.pxPosition.x,
      this.pxPosition.y
    );
    return {
      x: monitorPos.x,
      y: monitorPos.y,
      width: this.pxSize.width * monitor.zoom,
      height: this.pxSize.height * monitor.zoom,
      right: monitorPos.x + this.pxSize.width * monitor.zoom,
      bottom: monitorPos.y + this.pxSize.height * monitor.zoom
    };
  },

  // Check if the item is in the boundary of the monitor
  isInMonitor: function(monitor) {
    var monitorPos = monitor.planetToMonitor(
      this.pxPosition.x,
      this.pxPosition.y
    );

    if (monitorPos.x + this.pxSize.width * monitor.zoom < 0) {
      return false;
    } else if (monitorPos.x - this.pxSize.width * monitor.zoom >= monitor.width) {
      return false;
    } else if (monitorPos.y + this.pxSize.height * monitor.zoom < 0) {
      return false;
    } else if (monitorPos.y - this.pxSize.height * monitor.zoom >= monitor.height) {
      return false;
    }

    return true;
  }
}