/**
 * @author Wang, Hui (huiwang@qlike.com)
 * @repo https://github.com/hui-w/game-of-life
 * @licence MIT  
 *
 * The toolbar class
 */
function Toolbar() {
  // Callback of button click
  this.onCommand = null;

  // Buttons
  this.btnAdd = null;
  this.btnPlay = null;
  this.btnPause = null;
  this.btnNext = null;
  this.btnStop = null;

  this.btnZoomIn = null;
  this.btnZoomOut = null;
}

Toolbar.prototype = {
  handleButtonClick: function(key) {
    return function() {
      if (typeof this.onCommand === "function") {
        this.onCommand(key)
      }
    }
  },

  setStatus: function(status) {
    this.btnAdd.style = status === "empty" || status === "ready" ? "display: inline;" : "display: none;";
    this.btnPlay.style = status === "paused" || status === "ready" ? "display: inline;" : "display: none;";
    this.btnPause.style = status === "playing" ? "display: inline;" : "display: none;";
    this.btnNext.style = status === "paused" || status === "ready" ? "display: inline;" : "display: none;";
    this.btnStop.style = status === "playing" || status === "paused" ? "display: inline;" : "display: none;";
  },

  // Render the planet
  renderInto: function(wrapper) {
    this.frame = wrapper.createChild("div", {
      "id": "toolbar",
      "class": "toolbar"
    });

    this.btnAdd = this.frame.createChild("div", {
      "class": "svg-button"
    }, [
      '<svg width="32" height="32" viewBox="0 0 42 42">',
      '  <g fill="currentColor">',
      '    <polygon points="42,20 22,20 22,0 20,0 20,20 0,20 0,22 20,22 20,42 22,42 22,22 42,22 "/>',
      '  </g>',
      '</svg>'
    ].join(""));
    this.btnAdd.addEventListener("click", this.handleButtonClick("add").bind(this), false);

    this.btnStop = this.frame.createChild("div", {
      "class": "svg-button"
    }, [
      '<svg width="32" height="32" viewBox="0 0 36 36">',
      '  <g fill="currentColor">',
      '    <path d="M35,0H1C0.448,0,0,0.447,0,1v34c0,0.553,0.448,1,1,1h34c0.552,0,1-0.447,1-1V1C36,0.447,35.552,0,35,0z M34,34H2V2h32V34z" />',
      '  </g>',
      '</svg>'
    ].join(""));
    this.btnStop.addEventListener("click", this.handleButtonClick("stop").bind(this), false);

    this.btnPlay = this.frame.createChild("div", {
      "class": "svg-button"
    }, [
      '<svg width="32" height="32" viewBox="0 0 41.999 41.999">',
      '  <g fill="currentColor">',
      '    <path d="M36.068,20.176l-29-20C6.761-0.035,6.363-0.057,6.035,0.114C5.706,0.287,5.5,0.627,5.5,0.999v40',
      '      c0,0.372,0.206,0.713,0.535,0.886c0.146,0.076,0.306,0.114,0.465,0.114c0.199,0,0.397-0.06,0.568-0.177l29-20',
      '      c0.271-0.187,0.432-0.494,0.432-0.823S36.338,20.363,36.068,20.176z M7.5,39.095V2.904l26.239,18.096L7.5,39.095z"/>',
      '  </g>',
      '</svg>'
    ].join(""));
    this.btnPlay.addEventListener("click", this.handleButtonClick("play").bind(this), false);

    this.btnPause = this.frame.createChild("div", {
      "class": "svg-button"
    }, [
      '<svg width="32" height="32" viewBox="0 0 42 42">',
      '  <g fill="currentColor">',
      '    <path d="M14.5,0c-0.552,0-1,0.447-1,1v40c0,0.553,0.448,1,1,1s1-0.447,1-1V1C15.5,0.447,15.052,0,14.5,0z"/>',
      '    <path d="M27.5,0c-0.552,0-1,0.447-1,1v40c0,0.553,0.448,1,1,1s1-0.447,1-1V1C28.5,0.447,28.052,0,27.5,0z"/>',
      '  </g>',
      '</svg>'
    ].join(""));
    this.btnPause.addEventListener("click", this.handleButtonClick("pause").bind(this), false);

    this.btnNext = this.frame.createChild("div", {
      "class": "svg-button"
    }, [
      '<svg width="32" height="32" viewBox="0 0 42 42">',
      '  <g fill="currentColor">',
      '    <path d="M35.5,0c-0.552,0-1,0.447-1,1v18.095L7.068,0.177C6.762-0.034,6.364-0.057,6.035,0.114C5.706,0.287,5.5,0.628,5.5,1v40',
      '      c0,0.372,0.206,0.713,0.535,0.886C6.181,41.962,6.341,42,6.5,42c0.199,0,0.397-0.06,0.568-0.177L34.5,22.905V41c0,0.553,0.448,1,1,1',
      '      s1-0.447,1-1V1C36.5,0.447,36.052,0,35.5,0z M7.5,39.096V2.904L33.739,21L7.5,39.096z"/>',
      '  </g>',
      '</svg>'
    ].join(""));
    this.btnNext.addEventListener("click", this.handleButtonClick("next").bind(this), false);

    this.btnZoomIn = this.frame.createChild("div", {
      "class": "svg-button"
    }, [
      '<svg width="32" height="32" viewBox="0 0 52.966 52.966">',
      '  <g fill="currentColor">',
      '    <path d="M28.983,20h-6v-6c0-0.552-0.448-1-1-1s-1,0.448-1,1v6h-6c-0.552,0-1,0.448-1,1s0.448,1,1,1h6v6c0,0.552,0.448,1,1,1',
      '      s1-0.448,1-1v-6h6c0.552,0,1-0.448,1-1S29.535,20,28.983,20z"/>',
      '    <path d="M51.704,51.273L36.845,35.82c3.79-3.801,6.138-9.041,6.138-14.82c0-11.58-9.42-21-21-21s-21,9.42-21,21s9.42,21,21,21',
      '      c5.083,0,9.748-1.817,13.384-4.832l14.895,15.491c0.196,0.205,0.458,0.307,0.721,0.307c0.25,0,0.499-0.093,0.693-0.279',
      '      C52.074,52.304,52.086,51.671,51.704,51.273z M2.983,21c0-10.477,8.523-19,19-19s19,8.523,19,19s-8.523,19-19,19',
      '      S2.983,31.477,2.983,21z"/>',
      '  </g>',
      '</svg>'
    ].join(""));
    this.btnZoomIn.addEventListener("click", this.handleButtonClick("zoomIn").bind(this), false);

    this.btnZoomOut = this.frame.createChild("div", {
      "class": "svg-button"
    }, [
      '<svg width="32" height="32" viewBox="0 0 52.966 52.966">',
      '  <g fill="currentColor">',
      '    <path d="M28.983,20h-14c-0.552,0-1,0.448-1,1s0.448,1,1,1h14c0.552,0,1-0.448,1-1S29.535,20,28.983,20z"/>',
      '    <path d="M51.704,51.273L36.845,35.82c3.79-3.801,6.138-9.041,6.138-14.82c0-11.58-9.42-21-21-21s-21,9.42-21,21s9.42,21,21,21',
      '      c5.083,0,9.748-1.817,13.384-4.832l14.895,15.491c0.196,0.205,0.458,0.307,0.721,0.307c0.25,0,0.499-0.093,0.693-0.279',
      '      C52.074,52.304,52.086,51.671,51.704,51.273z M2.983,21c0-10.477,8.523-19,19-19s19,8.523,19,19s-8.523,19-19,19',
      '      S2.983,31.477,2.983,21z"/>',
      '  </g>',
      '</svg>'
    ].join(""));
    this.btnZoomOut.addEventListener("click", this.handleButtonClick("zoomOut").bind(this), false);
  }
}