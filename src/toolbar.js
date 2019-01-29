/**
 * @author Wang, Hui (huiwang@qlike.com)
 * @repo https://github.com/hui-w/game-of-life
 * @licence MIT  
 *
 * The toolbar class
 */
function Toolbar(matrix) {
  // Callback of button click
  this.onClick = null;
  this.status = null;
}

Toolbar.prototype = {
  handlePlayClick: function() {
    if (typeof this.onClick === "function") {
      this.onClick("play")
    }
  },

  handlePauseClick: function() {
    if (typeof this.onClick === "function") {
      this.onClick("pause")
    }
  },

  handleNextClick: function() {
    if (typeof this.onClick === "function") {
      this.onClick("next")
    }
  },

  handleStopClick: function() {
    if (typeof this.onClick === "function") {
      this.onClick("stop")
    }
  },

  setStatus: function(status) {
    this.status = status;
  },

  // Render the planet
  renderInto: function(wrapper) {
    this.frame = wrapper.createChild("div", {
      "id": "toolbar",
      "class": "toolbar"
    });

    this.frame.createChild("img", {
      "src": "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/PjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQxLjk5OSA0MS45OTkiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQxLjk5OSA0MS45OTk7IiB4bWw6c3BhY2U9InByZXNlcnZlIj48cGF0aCBkPSJNMzYuMDY4LDIwLjE3NmwtMjktMjBDNi43NjEtMC4wMzUsNi4zNjMtMC4wNTcsNi4wMzUsMC4xMTRDNS43MDYsMC4yODcsNS41LDAuNjI3LDUuNSwwLjk5OXY0MGMwLDAuMzcyLDAuMjA2LDAuNzEzLDAuNTM1LDAuODg2YzAuMTQ2LDAuMDc2LDAuMzA2LDAuMTE0LDAuNDY1LDAuMTE0YzAuMTk5LDAsMC4zOTctMC4wNiwwLjU2OC0wLjE3N2wyOS0yMGMwLjI3MS0wLjE4NywwLjQzMi0wLjQ5NCwwLjQzMi0wLjgyM1MzNi4zMzgsMjAuMzYzLDM2LjA2OCwyMC4xNzZ6IE03LjUsMzkuMDk1VjIuOTA0bDI2LjIzOSwxOC4wOTZMNy41LDM5LjA5NXoiLz48L3N2Zz4=",
      "width": "32",
      "height": "32",
      "class": "svg-button"
    }).addEventListener("click", this.handlePlayClick.bind(this), false);

    this.frame.createChild("img", {
      "src": "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/PjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQyIDQyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0MiA0MjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPjxwYXRoIGQ9Ik0xNC41LDBjLTAuNTUyLDAtMSwwLjQ0Ny0xLDF2NDBjMCwwLjU1MywwLjQ0OCwxLDEsMXMxLTAuNDQ3LDEtMVYxQzE1LjUsMC40NDcsMTUuMDUyLDAsMTQuNSwweiIvPjxwYXRoIGQ9Ik0yNy41LDBjLTAuNTUyLDAtMSwwLjQ0Ny0xLDF2NDBjMCwwLjU1MywwLjQ0OCwxLDEsMXMxLTAuNDQ3LDEtMVYxQzI4LjUsMC40NDcsMjguMDUyLDAsMjcuNSwweiIvPjwvZz48L3N2Zz4=",
      "width": "32",
      "height": "32",
      "class": "svg-button"
    }).addEventListener("click", this.handlePauseClick.bind(this), false);

    this.frame.createChild("img", {
      "src": "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/PjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQyIDQyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0MiA0MjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxwYXRoIGQ9Ik0zNS41LDBjLTAuNTUyLDAtMSwwLjQ0Ny0xLDF2MTguMDk1TDcuMDY4LDAuMTc3QzYuNzYyLTAuMDM0LDYuMzY0LTAuMDU3LDYuMDM1LDAuMTE0QzUuNzA2LDAuMjg3LDUuNSwwLjYyOCw1LjUsMXY0MGMwLDAuMzcyLDAuMjA2LDAuNzEzLDAuNTM1LDAuODg2QzYuMTgxLDQxLjk2Miw2LjM0MSw0Miw2LjUsNDJjMC4xOTksMCwwLjM5Ny0wLjA2LDAuNTY4LTAuMTc3TDM0LjUsMjIuOTA1VjQxYzAsMC41NTMsMC40NDgsMSwxLDFzMS0wLjQ0NywxLTFWMUMzNi41LDAuNDQ3LDM2LjA1MiwwLDM1LjUsMHogTTcuNSwzOS4wOTZWMi45MDRMMzMuNzM5LDIxTDcuNSwzOS4wOTZ6Ii8+w5PDn8Ofw5/Dn8OfPC9zdmc+",
      "width": "32",
      "height": "32",
      "class": "svg-button"
    }).addEventListener("click", this.handleNextClick.bind(this), false);

    this.frame.createChild("img", {
      "src": "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/PjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDM2IDM2IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAzNiAzNjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxwYXRoIGQ9Ik0zNSwwSDFDMC40NDgsMCwwLDAuNDQ3LDAsMXYzNGMwLDAuNTUzLDAuNDQ4LDEsMSwxaDM0YzAuNTUyLDAsMS0wLjQ0NywxLTFWMUMzNiwwLjQ0NywzNS41NTIsMCwzNSwweiBNMzQsMzRIMlYyaDMyVjM0eiIvPjwvc3ZnPg==",
      "width": "32",
      "height": "32",
      "class": "svg-button"
    }).addEventListener("click", this.handleStopClick.bind(this), false);
  }
}