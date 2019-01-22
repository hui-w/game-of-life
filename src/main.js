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

  addEventListener("load", function() {
    var wrapperPadding = Config.Misc.wrapperPadding;

    // Create the monitor wrapper
    var rootElement = document.body;
    var newElement = document.createElement("div");
    newElement.style.padding = wrapperPadding + "px";
    rootElement.appendChild(newElement);

    // Create the matrix
    matrix = new Matrix();

    // Crate the monitor and render the planet into the monitor
    var monitorWidth = width - wrapperPadding * 2;
    var monitorHeight = height - wrapperPadding * 2;
    monitor = new Monitor(monitorWidth, monitorHeight);
    monitor.renderInto(newElement);

    // Attach the monitor event
    monitor.onRedraw = function() {
      matrix.render(monitor);
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