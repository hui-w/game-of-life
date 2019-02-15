/**
 * @author Wang, Hui (huiwang@qlike.com)
 * @repo https://github.com/hui-w/game-of-life
 * @licence MIT  
 */

/* the entry of whole application */
(function() {
  var width = null;
  var height = null;

  var matrix = null;
  var monitor = null;
  var toolbar = null;

  addEventListener("load", function() {
    matrix = new Matrix();
    monitor = new Monitor();
    toolbar = new Toolbar(matrix);

    // Create the wrapper
    // Render the monitor and toolbar
    var wrapperPadding = Config.Misc.wrapperPadding;
    var rootElement = document.body;
    var newElement = document.createElement("div");
    newElement.style.padding = wrapperPadding + "px";
    rootElement.appendChild(newElement);

    monitor.renderInto(newElement);
    toolbar.renderInto(newElement);

    // Attach the matrix events
    matrix.onStatusChanged = function(status) {
      toolbar.setStatus(status);
    };
    matrix.onTimerTick = function(timerCount) {
      monitor.setMatrixTimerCount(timerCount);
    }

    // Attach the toolbar events
    toolbar.onCommand = function(cmd) {
      switch (cmd) {
        case "add":
          matrix.add();
          break;
        case "play":
          matrix.play();
          break;
        case "pause":
          matrix.pause();
          break;
        case "next":
          matrix.next();
          break;
        case "stop":
          matrix.stop();
          break;
        case "zoomIn":
          monitor.zoomIn();
          break;
        case "zoomOut":
          monitor.zoomOut();
          break;
        default:
          break;
      }
    };

    // Attach the monitor events
    monitor.onRedraw = function() {
      matrix.render(monitor);
    };

    // Init the matrix
    matrix.init();

    // Init the monitor immediately
    checkWindowsize();

    // Check if the window size is changed
    setInterval(checkWindowsize, 200);
  });

  function checkWindowsize() {
    var nwidth = document.documentElement.clientWidth;
    var nheight = document.documentElement.clientHeight;
    var wrapperPadding = Config.Misc.wrapperPadding;
    if (nwidth != width || nheight != height) {
      width = nwidth;
      height = nheight;
      var monitorWidth = width - wrapperPadding * 2;
      var monitorHeight = height - wrapperPadding * 2;
      monitor.resize(monitorWidth, monitorHeight);
    }
  };
})();