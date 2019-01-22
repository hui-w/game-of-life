/**
 * @author Wang, Hui (huiwang@qlike.com)
 * @repo https://github.com/hui-w/game-of-life
 * @licence MIT  
 *
 * The class Monitor handles the user actions and perform the renderring
 */
function Monitor(width, height) {
  this.width = width;
  this.height = height;

  // The monitor frame
  this.frame = null;

  // Offset is the planet coordinate on the monitor center
  this.offsetX = 0;
  this.offsetY = 0;

  // Painting objects
  this.canvas = null;
  this.context = null;

  // The point on monitor which is selected
  this.selectedPos = null;

  // The point where mouse was down
  this.moveBeginPos = null;

  // From 0000 to 1111 (Keys: left-up-right-bottom)
  this.arrowKeyStatus = 0;
  this.keyboardTimer = null;

  // Callback of redrawing
  this.onRedraw = null;
}

Monitor.prototype = {
  /* Mouse events */
  handleMouse: function(e, that) {
    switch (e.type) {
      case "mousedown":
        that.touchstartAndMousedown(e);
        break;
      case "mousemove":
        that.touchmoveAndMousemove(e);
        break;
      case "mouseup":
        that.touchcancelAndMouseup(e);
        break;
      case "mouseout":
        that.moveBeginPos = null;
        that.frame.removeClassName("move-cursor");
        break;
      case "mousewheel":
        break;
    }
  },

  /* Touch events */
  handleTouch: function(e, that) {
    e.preventDefault();
    switch (e.type) {
      case "touchstart":
        if (e.touches.length == 1) {
          that.touchstartAndMousedown(e.targetTouches[0]);
        } else if (e.touches.length == 2) {}
        break;
      case "touchend":
        if (e.changedTouches.length == 1) {
          that.touchcancelAndMouseup(e.changedTouches[0]);
        }
        break;
      case "touchmove":
        if (e.changedTouches.length == 1) {
          that.touchmoveAndMousemove(e.changedTouches[0]);
        } else if (e.touches.length == 2) {}
        break;
    }
  },

  touchstartAndMousedown: function(e) {
    this.moveBeginPos = {
      x: e.pageX,
      y: e.pageY
    };

    // Record the selected position on monitor
    this.selectedPos = this.getEventPosition(e);
  },

  touchcancelAndMouseup: function(e) {
    this.moveBeginPos = null;
    if (this.frame.hasClassName("move-cursor")) {
      this.frame.removeClassName("move-cursor");
    }
  },

  touchmoveAndMousemove: function(e) {
    if (this.moveBeginPos == null) {
      return;
    }

    // Set the mouse cursor
    if (!this.frame.hasClassName("move-cursor")) {
      this.frame.addClassName("move-cursor");
    }

    this.offsetX -= e.pageX - this.moveBeginPos.x;
    this.offsetY -= e.pageY - this.moveBeginPos.y;

    this.moveBeginPos = {
      x: e.pageX,
      y: e.pageY
    };

    this.redraw();
  },

  /* Keyboard events */
  handleKey: function(e) {
    var that = this;
    switch (e.type) {
      case "keydown":
        var keyCode = event.keyCode;
        switch (keyCode) {
          case 37:
            this.arrowKeyStatus |= 1;
            break;
          case 38:
            this.arrowKeyStatus |= 1 << 1;
            break;
          case 39:
            this.arrowKeyStatus |= 1 << 2;
            break;
          case 40:
            this.arrowKeyStatus |= 1 << 3;
            break;
        }
        if (this.arrowKeyStatus > 0 && this.keyboardTimer == null) {
          keyboardTimerHandler();
        }

        function keyboardTimerHandler() {
          var changeUnit = Config.Monitor.keyboardChangeUnit;
          if ((that.arrowKeyStatus & 1) > 0) {
            that.offsetX += changeUnit;
          }

          if ((that.arrowKeyStatus & (1 << 1)) > 0) {
            that.offsetY += changeUnit;
          }

          if ((that.arrowKeyStatus & (1 << 2)) > 0) {
            that.offsetX -= changeUnit;
          }

          if ((that.arrowKeyStatus & (1 << 3)) > 0) {
            that.offsetY -= changeUnit;
          }

          if (that.arrowKeyStatus > 0) {
            that.redraw();

            //set-up the timer for next round
            that.keyboardTimer = setTimeout(keyboardTimerHandler, Config.Monitor.keyboardTimerDelay);
          } else {
            that.keyboardTimer = null;
          }

        };
        break;
      case "keyup":
        var keyCode = event.keyCode;
        switch (keyCode) {
          case 37:
            that.arrowKeyStatus &= ~1;
            break;
          case 38:
            that.arrowKeyStatus &= ~(1 << 1);
            break;
          case 39:
            that.arrowKeyStatus &= ~(1 << 2);
            break;
          case 40:
            that.arrowKeyStatus &= ~(1 << 3);
            break;
        }
        if (that.arrowKeyStatus == 0) {
          if (that.keyboardTimer != null) {
            clearTimeout(that.keyboardTimer);
            that.keyboardTimer = null;
          }
        }
        break;
    }
  },

  /* Get the event position on the monitor */
  getEventPosition: function(ev) {
    /*
    return {
    x : ev.offsetX,
    y : ev.offsetY
    };
     */
    return {
      x: ev.pageX - this.canvas.offsetLeft,
      y: ev.pageY - this.canvas.offsetTop
    };
  },

  /* Render into the HTML DOM object */
  renderInto: function(wrapper) {
    var that = this;

    // Render the HTML element
    var cssStyle = "background-color: #FFF; width: {0}px; height: {1}px;".format(this.width, this.height);
    this.frame = wrapper.createChild("div", {
      "id": "monitor-frame",
      "style": cssStyle
    });

    // Handle the mouse events
    this.handleMouseEvent = function(e) {
      that.handleMouse(e, that);
    }
    this.frame.addEventListener("mousedown", this.handleMouseEvent, false);
    this.frame.addEventListener("mousemove", this.handleMouseEvent, false);
    this.frame.addEventListener("mouseup", this.handleMouseEvent, false);
    this.frame.addEventListener("mouseout", this.handleMouseEvent, false);
    this.frame.addEventListener("mousewheel", this.handleMouse, false);

    // Handle the touch events
    this.handleTouchEvent = function(e) {
      that.handleTouch(e, that);
    }
    this.frame.addEventListener("touchstart", this.handleTouchEvent, false);
    this.frame.addEventListener("touchend", this.handleTouchEvent, false);
    this.frame.addEventListener("touchmove", this.handleTouchEvent, false);

    // Handle the key events
    this.handleKeyEvent = function(e) {
      that.handleKey(e, that);
    }
    document.addEventListener("keydown", this.handleKeyEvent, false);
    document.addEventListener("keyup", this.handleKeyEvent, false);

    // Initialize the canvas and the context
    this.canvas = this.frame.createChild("canvas", {
      "id": "monitor-canvas",
      "width": this.width,
      "height": this.height
    });
    if (typeof G_vmlCanvasManager != "undefined") {
      this.canvas = G_vmlCanvasManager.initElement(this.canvas);
    }
    this.context = this.canvas.getContext("2d");

    // Setup the timer to update the matrix view
    monitorTimerHandler();

    function monitorTimerHandler() {
      if (that.moveBeginPos == null && that.arrowKeyStatus == 0) {
        that.redraw();
      }

      // Setup the timer for next round
      setTimeout(monitorTimerHandler, Config.Monitor.timerDelay);
    };
  }, // End of renderInto

  /* Resize the monitor */
  resize: function(width, height) {
    this.width = width;
    this.height = height;

    if (this.frame != null) {
      this.frame.style.width = this.width + "px";
      this.frame.style.height = this.height + "px";
    }

    if (this.canvas != null) {
      this.canvas.width = this.width;
      this.canvas.height = this.height;
    }
  },

  /* Clear the canvas and redraw the matrix */
  redraw: function() {
    //clear the existing display
    //this.context.clearRect(10, 10, this.width, this.height);
    this.canvas.width = this.canvas.width;
    this.canvas.height = this.canvas.height;

    // Fill the background
    this.fillBackground();

    // Show the scale
    this.drawScale();

    // Draw labels
    this.drawLabel();

    //console.log("Monitor Redraw {0} - {1}".format(this.offsetX, this.offsetY));
    if (typeof this.onRedraw == "function") {
      this.onRedraw();
    }
  },

  // Fill the background
  fillBackground: function() {
    var context = this.context;
    context.save();
    context.fillStyle = "RGBA(255, 255, 255, 1)";
    context.fillRect(0, 0, this.width, this.height);
    context.restore();
  },

  // Render the scale lines and text labels
  drawScale: function() {
    var context = this.context;
    context.save();
    context.beginPath();

    context.font = "{0}px verdana".format(Config.Monitor.fontSize);
    context.textBaseline = "top";
    context.fillStyle = "#000000";

    var unitSize = Config.Monitor.gridSize;

    // Y0 is where the fist horizontal line starts
    var y0 = (Math.round(this.height / 2) - this.offsetY) % unitSize;
    for (var y = y0; y <= this.height; y += unitSize) {
      // Horizontal lines
      var x1 = 0;
      var x2 = this.width;
      context.antiFuzzyLine(x1, y, x2, y);

      var pxPosition = this.monitorToPlanet(0, y);
      context.fillText(pxPosition.y, 0, y);
    }

    // X0 is where the fist vertical line starts
    var x0 = (Math.round(this.width / 2) - this.offsetX) % unitSize;
    for (var x = x0; x <= this.width; x += unitSize) {
      // Vertical lines
      var y1 = 0;
      var y2 = this.height;
      context.antiFuzzyLine(x, y1, x, y2);

      var pxPosition = this.monitorToPlanet(x, 0);
      context.fillText(pxPosition.x, x, 0);
    }

    context.strokeStyle = "RGBA(0, 0, 0, 0.2)";
    context.lineWidth = 1;
    context.stroke();
    context.restore();
  },

  drawLabel: function() {
    // Show offset X and Y
    var context = this.context;
    context.save();
    context.font = "{0}px verdana".format(Config.Monitor.fontSize);
    context.fillStyle = "#333333";
    var lblStr = "Monitor: {0}, {1}, {2}".format(
      padNumber(this.offsetX, 4),
      padNumber(this.offsetY, 4),
      timeNow(5)
    );
    context.fillTextEx(lblStr, this.width, this.height, "right", "bottom");

    context.restore();
  },

  /* Get the position on the planet based on the position on the monitor */
  monitorToPlanet: function(mx, my) {
    return {
      x: mx - Math.round(this.width / 2) + this.offsetX,
      y: my - Math.round(this.height / 2) + this.offsetY
    };
  },

  /* Get the position on the monitor based on the position on the planet */
  planetToMonitor: function(px, py) {
    return {
      x: px + Math.round(this.width / 2) - this.offsetX,
      y: py + Math.round(this.height / 2) - this.offsetY
    };
  }
}

/*
8 = 1000
4 = 100
2 = 10

15 & 9 = 9 (1111 & 1001 = 1001)
15 | 9 = 15 (1111 | 1001 = 1111)
15 ^ 9 = 6 (1111 ^ 1001 = 0110)
*/
