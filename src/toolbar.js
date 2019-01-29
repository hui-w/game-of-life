/**
 * @author Wang, Hui (huiwang@qlike.com)
 * @repo https://github.com/hui-w/game-of-life
 * @licence MIT  
 *
 * The toolbar class
 */
function Toolbar(matrix) {

}

Toolbar.prototype = {
  // Render the planet
  renderInto: function(wrapper) {
    this.frame = wrapper.createChild("div", {
      "id": "toolbar",
      "class": "toolbar"
    });

    this.frame.createChild("img", {
      "src": "../res/icon-play.svg",
      "width": "32",
      "height": "32",
    })

    this.frame.createChild("img", {
      "src": "../res/icon-pause.svg",
      "width": "32",
      "height": "32",
    })

    this.frame.createChild("img", {
      "src": "../res/icon-next.svg",
      "width": "32",
      "height": "32",
    })

    this.frame.createChild("img", {
      "src": "../res/icon-stop.svg",
      "width": "32",
      "height": "32",
    })
  }
}