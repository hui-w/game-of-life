/**
 * @author Wang, Hui (huiwang@qlike.com)
 * @repo https://github.com/hui-w/game-of-life
 * @licence MIT  
 *
 * The planet handles the path finding with AStar algurithm
 */
function Planet() {
  this.openArea = [];
  this.closeArea = {};
  this.cache = {};
}

Planet.prototype = {
  getPath: function(startGrid, endGrid) {
    this.openArea = [];
    this.closeArea = {};
    this.cache = {};

    // Prepare a cache object according to current planet status
    this.prepareCache();

    var startNode = this.getNode(startGrid.x, startGrid.y);
    var endNode = this.getNode(endGrid.x, endGrid.y);

    // Start path finding
    this.processNodesNearby(startNode, endNode);
    if (this.openArea.length == 0) {
      return null;
    }

    // Search until reaching the end node, or there is no items in the open list
    while (!this.closeArea[endNode.id]) {
      var fMinNode = this.getOpenNodeWithMinF();
      if (!fMinNode) {
        break;
      }
      this.processNodesNearby(fMinNode, endNode);
    };

    // Prepare the output
    if (this.closeArea[endNode.id]) {
      var path = [];
      path.push(endNode);
      var node = endNode.prev;
      while (node !== startNode) {
        path.push(node);
        node = node.prev;
      }
      path.push(startNode);
      return path;
    };
  },


  getNodeId: function(x, y) {
    return 'node_' + x + '_' + y;
  },

  getNode: function(x, y) {
    return this.cache[this.getNodeId(x, y)];
  },

  prepareCache: function() {
    for (var x = 0; x < 1000; x++) {
      for (var y = 0; y < 1000; y++) {
        var node = {
          x: x,
          y: y,
          id: this.getNodeId(x, y),
          isBlock: false,
          prev: null,
          fObj: null
        };
        /*
        if (matrix.blockArray[x][y] != 0) {
          mapNode.isRoadBlock = true;
          astar.closeArea[mapNode.id] = mapNode;
        }
        astar.cache[mapNode.id] = mapNode;
        */
        this.cache[node.id] = node;
      }
    }
  },

  processNodesNearby: function(currentNode, endNode) {
    var currentX;
    var currentY;

    for (var x = -1; x <= 1; x++) {
      currentX = currentNode.x + x;
      for (var y = -1, nextNode, nextFObj, tmpNode; y <= 1; y++) {
        currentY = currentNode.y + y;

        if (x === 0 && y === 0) {
          // Skip self
          continue;
        }

        nextNode = this.getNode(currentX, currentY);
        if (nextNode) {
          // Check the node nearby
          var accessable = false;
          if (Math.abs(x) == Math.abs(y)) {
            // For nodes in the corners, need to check the neighbours
            var nodeHorizontal = this.getNode(currentNode.x + x, currentNode.y);
            var nodeVertical = this.getNode(currentNode.x, currentNode.y + y);
            accessable = !nodeHorizontal.isBlock && !nodeVertical.isBlock && !this.closeArea[nextNode.id];
          } else {
            // Node on the up, down, left and right
            accessable = !this.closeArea[nextNode.id];
          }

          // The node is accessable
          if (accessable) {
            nextFObj = this.getF(nextNode, currentNode, endNode);

            // If the node nearby exists in the open area, get the new G value for it
            // If the new G is smaller, change its parent to current node
            tmpNode = this.inOpenArea(nextNode);
            if (tmpNode && tmpNode.fObj.G <= nextFObj.G) {
              continue;
            };

            nextNode.fObj = nextFObj;
            nextFObj.prev = currentNode;
            this.openArea.push(nextNode);
          }
        }
      }
    }
  },

  // Get the F object for node
  getF: function(node, previousNode, endNode) {
    var targetDistanceX = (endNode.x - node.x) * 10;
    var targetDistanceY = (endNode.y - node.y) * 10;
    var h = Math.round(Math.sqrt(Math.pow(targetDistanceX, 2) + Math.pow(targetDistanceY, 2)));
    var g = (previousNode.x == node.x || previousNode.y == node.y) ? 10 : 14;

    if (previousNode.fObj) {
      g = previousNode.fObj.G + g;
    }

    return {
      F: h + g,
      H: h,
      G: g
    };
  },

  // Check if the node exists in the open area
  inOpenArea: function(node) {
    var openArea = this.openArea;
    for (var i = 0; i < openArea.length; i++) {
      if (openArea[i].id === node.id)
        return openArea[i];
    };

    return null;
  },

  // Get the node with smallest F from the open list, and move it to the close list
  getOpenNodeWithMinF: function() {
    if (this.openArea.length === 0) {
      return null;
    }

    this.sortOpenArea();
    this.closeArea[this.openArea[0].id] = this.openArea[0];
    return this.openArea.shift();
  },

  //Sort the open area according to the F object
  sortOpenArea: function() {
    this.openArea.sort(function(objF, objN) {
      return objF.fObj.F - objN.fObj.F;
    });
  },

  // Render the planet
  render: function(monitor) {
    var context = monitor.context;
    context.save();
    context.beginPath();

    var unitSize = Math.round(Config.Planet.gridSize * monitor.zoom);

    // Y0 is where the fist horizontal line starts
    var y0 = (Math.round(monitor.height / 2) - monitor.offsetY) % unitSize;
    for (var y = y0; y <= monitor.height; y += unitSize) {
      // Horizontal lines
      var x1 = 0;
      var x2 = monitor.width;
      context.antiFuzzyLine(x1, y, x2, y);
    }

    // X0 is where the fist vertical line starts
    var x0 = (Math.round(monitor.width / 2) - monitor.offsetX) % unitSize;
    for (var x = x0; x <= monitor.width; x += unitSize) {
      // Vertical lines
      var y1 = 0;
      var y2 = monitor.height;
      context.antiFuzzyLine(x, y1, x, y2);
    }

    context.strokeStyle = "RGBA(204, 204, 204, 0.2)";
    context.lineWidth = 1;
    context.stroke();
    context.restore();
  }
}