/**
 * @author Wang, Hui (huiwang@qlike.com)
 * @repo https://github.com/hui-w/game-of-life
 * @licence MIT  
 */
Element.prototype.createChild = function(tag, param, innerHTML) {
  var element = document.createElement(tag);
  this.appendChild(element);
  if (param) {
    for (key in param) {
      element.setAttribute(key, param[key]);
    }
  }
  if (innerHTML) {
    element.innerHTML = innerHTML;
  }

  return element;
};

String.prototype.format = function() {
  var args = arguments;
  return this.replace(/\{(\d+)\}/g,
    function(m, i) {
      return args[i];
    });
};

Element.prototype.hasClassName = function(a) {
  return new RegExp("(?:^|\\s+)" + a + "(?:\\s+|$)").test(this.className);
};

Element.prototype.addClassName = function(a) {
  if (!this.hasClassName(a)) {
    this.className = [this.className, a].join(" ");
  }
};

Element.prototype.removeClassName = function(b) {
  if (this.hasClassName(b)) {
    var a = this.className;
    this.className = a.replace(new RegExp("(?:^|\\s+)" + b + "(?:\\s+|$)", "g"), " ");
  }
};

String.prototype.trim = function() {
  return this.replace(/(^\s*)|(\s*$)/g, '');
}

var canvasPrototype = window.CanvasRenderingContext2D && CanvasRenderingContext2D.prototype;
canvasPrototype.antiFuzzyLine = function(x1, y1, x2, y2) {
  if (this.lineWidth == 1) {
    //+0.5 to avoid fuzzy line
    x1 -= 0.5;
    y1 -= 0.5;
    x2 -= 0.5;
    y2 -= 0.5;
  }
  this.moveTo(x1, y1);
  this.lineTo(x2, y2);
};

/*
horizontalAlign: left, center, right
verticalAlign: top, middle, bottom
 */
canvasPrototype.fillTextEx = function(text, x, y, horizontalAlign, verticalAlign) {
  this.save();
  var textLeft = x;
  if (horizontalAlign != "left") {
    var textWidth = this.measureText(text).width;
    if (horizontalAlign == "center") {
      textLeft -= textWidth / 2;
    } else if (horizontalAlign == "right") {
      textLeft -= textWidth;
    }
  }
  this.textBaseline = verticalAlign;
  this.fillText(text, textLeft, y);
  this.restore();
};

/* get the rand number between lower and upper */
var rand = function(lower, upper) {
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}

/* If the number length is smaller than the given number, pad left with 0s */
var padNumber = function(number, length) {
  var str = Math.abs(number).toString();
  while (str.length < length) {
    str = "0" + str;
  }

  if (number < 0) {
    str = '-' + str;
  }

  return str;
};

/* Get the time in number and cut the end by length */
var timeNow = function(length) {
  var timestamp = new Date().getTime();
  if (length) {
    var tsStr = timestamp.toString();
    return tsStr.substr(tsStr.length - length);
  } else {
    return timestamp;
  }
}
