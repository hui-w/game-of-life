/**
 * @author Wang, Hui (huiwang@qlike.com)
 * @repo https://github.com/hui-w/game-of-life
 * @licence MIT  
 */
function matrix_main() {
  var width = document.documentElement.clientWidth;
  var height = document.documentElement.clientHeight;
  var matrix = null;
  var monitor = null;
  var toolbar = null;

  addEventListener("load", function() {
    var wrapperPadding = Config.Misc.wrapperPadding;

    // Create the monitor wrapper
    var rootElement = document.body;
    var newElement = document.createElement("div");
    newElement.style.padding = wrapperPadding + "px";
    rootElement.appendChild(newElement);

    // Create the matrix and toolbar
    matrix = new Matrix();
    toolbar = new Toolbar();
    toolbar.renderInto(newElement);
    matrix.onStatusChanged = function(status) {
      toolbar.setStatus(status);
    };
    matrix.init();

    // Crate the monitor and render the planet into the monitor
    var monitorWidth = width - wrapperPadding * 2;
    var monitorHeight = height - wrapperPadding * 2;
    monitor = new Monitor(monitorWidth, monitorHeight);
    monitor.renderInto(newElement);

    // Attach the monitor event
    monitor.onRedraw = function() {
      matrix.render(monitor);
    };

    // Attach the matrix timer tick handler
    matrix.onTimerTick = function(timerCount) {
      monitor.setMatrixTimerCount(timerCount);
    }

    // Render the toolbar
    toolbar.onClick = function(cmd) {
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
          Config.zoomIn();
          break;
        case "zoomOut":
          Config.zoomOut();
          break;
        default:
          break;
      }
    };

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
      monitor.resize(width - wrapperPadding * 2, height - wrapperPadding * 2);
    }
  };
}

/* the entry of whole application */
matrix_main();