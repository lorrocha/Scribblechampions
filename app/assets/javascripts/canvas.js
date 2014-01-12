// Keep everything in anonymous function, called on window load.
if(window.addEventListener) {
window.addEventListener('load', function () {
  var canvas, context, canvaso, contexto;

  // The active tool instance.
  var tool;
  var tool_default = 'pencil';
  var color;
  var color_default = 'black';
  var thickness;
  var thickness_default = 'normal';

  function init () {
    // Find the canvas element.
    canvaso = document.getElementById('imageView');
    if (!canvaso) {
      alert('Error: I cannot find the canvas element!');
      return;
    }

    if (!canvaso.getContext) {
      alert('Error: no canvas.getContext!');
      return;
    }

    // Get the 2D canvas context.
    contexto = canvaso.getContext('2d');
    if (!contexto) {
      alert('Error: failed to getContext!');
      return;
    }

    // Add temporary canvas
    var container = canvaso.parentNode;
    canvas = document.createElement('canvas');
    if (!canvas) {
      alert('Cannot create new canvas element!');
      return;
    }

    canvas.id = 'imageTemp';
    canvas.width = canvaso.width;
    canvas.height = canvaso.height;
    container.appendChild(canvas);

    context = canvas.getContext('2d');

    // Clear the canvas
    var clear_canvas = document.getElementById("clear-button")
    clear_canvas.addEventListener('click', ev_clear_canvas, false)

    // Get the tool select input.
    var tool_select = document.getElementById('dtool');
    if (!tool_select) {
      alert('Error: failed to get the dtool element!');
      return;
    }
    tool_select.addEventListener('change', ev_tool_change, false);

    // Get the color select input
    var color_select = document.getElementById('color');
    if (!color_select) {
      alert('Error: Failed to get the color element');
      return;
    }
    color_select.addEventListener('change', ev_color_change, false);

    // Get the thickness select input
    var thickness_select = document.getElementById('thickness');
    if (!thickness_select) {
      alert('Error: Failed to get the thickness selector');
      return;
    }
    thickness_select.addEventListener('change', ev_thickness_change, false);

    // Activate the default tool.
    if (tools[tool_default]) {
      tool = new tools[tool_default]();
      tool_select.value = tool_default;
    }

    //Activate the default color
    if (colors[color_default]) {
      color = new colors[color_default]();
      color_select.value = color_default;
    }

    //Activate the default thickness
    if (thicknesses[thickness_default]) {
      thickness = new thicknesses[thickness_default]();
      thickness_select.value = thickness_default;
    }

    // Attach the mousedown, mousemove and mouseup event listeners.
    canvas.addEventListener('mousedown', ev_canvas, false);
    canvas.addEventListener('mousemove', ev_canvas, false);
    canvas.addEventListener('mouseup',   ev_canvas, false);
  }

  // The general-purpose event handler. This function just determines the mouse
  // position relative to the canvas element.
  function ev_canvas (ev) {
    if (ev.layerX || ev.layerX == 0) { // Firefox
      ev._x = ev.layerX;
      ev._y = ev.layerY;
    } else if (ev.offsetX || ev.offsetX == 0) { // Opera
      ev._x = ev.offsetX;
      ev._y = ev.offsetY;
    }

  // Call the event handler of the tool.
    var func = tool[ev.type];
    if (func) {
      func(ev);
    }
  }

  // The event handler for any changes made to the tool selector.
  function ev_tool_change (ev) {
    console.log('trigger err time')
    console.log(this.value)
    if (tools[this.value]) {
      tool = new tools[this.value]();
      console.log(tool)
    }
  }

  // the event handler for any changes made to the color changer
  function ev_color_change(ev) {
    if (colors[this.value]) {
      color = new colors[this.value]();
    }
  }

  function ev_thickness_change(ev) {
    if (thicknesses[this.value]) {
      thickness = new thicknesses[this.value]();
    }
  }

  // The event handler for clearing the canvas
  function ev_clear_canvas(ev) {
    contexto.clearRect(0, 0, canvaso.width, canvaso.height);
  }

  // This function draws imageTemp canvas on top of imageView
  // Then imageView is cleared, allowing rectangles
  function img_update() {
    contexto.drawImage(canvas, 0, 0);
    context.clearRect(0,0,canvas.width, canvas.height);
  }

  // this objest holds the implementation of each color
  var colors = {};

  //the color black
  colors.black = function() {
    context.strokeStyle = '#000'
  };

  //the color red
  colors.red = function() {
    context.strokeStyle = '#F00'
  };

  colors.blue = function() {
    context.strokeStyle = '#00F'
  };

  colors.tan = function() {
    context.strokeStyle = '#d2b48c'
  };

  colors.green = function() {
    context.strokeStyle = '#008000'
  };

  colors.yellow = function() {
    context.strokeStyle = '#cccc00'
  };

  colors.violet = function() {
    context.strokeStyle = '#8e4e8e'
  };

  //this tool holds the thickness
  var thicknesses = {};

  thicknesses.thick = function() {
    context.lineWidth = 9;
  };

  thicknesses.normal = function() {
    context.lineWidth = 3;
  };

  thicknesses.thin = function() {
    context.lineWidth = 1;
  };

  thicknesses.thicker = function() {
    context.lineWidth = 16;
  };

  // This object holds the implementation of each drawing tool.
  var tools = {};

  // The drawing pencil.
  tools.pencil = function () {
    var tool = this;
    this.started = false;

    // This is called when you start holding down the mouse button.
    // This starts the pencil drawing.
    this.mousedown = function (ev) {
        context.beginPath();
        context.moveTo(ev._x, ev._y);
        tool.started = true;
    };

    // This function is called every time you move the mouse. Obviously, it only
    // draws if the tool.started state is set to true (when you are holding down
    // the mouse button).
    this.mousemove = function (ev) {
      if (tool.started) {
        context.lineTo(ev._x, ev._y);
        context.stroke();
      }
    };

    // This is called when you release the mouse button.
    this.mouseup = function (ev) {
      if (tool.started) {
        tool.mousemove(ev);
        tool.started = false;
        img_update();
      }
    };
  };

  // The rectangle tool.
  tools.rect = function () {
    var tool = this;
    this.started = false;

    this.mousedown = function (ev) {
      tool.started = true;
      tool.x0 = ev._x;
      tool.y0 = ev._y;
    };

    this.mousemove = function (ev) {
      if (!tool.started) {
        return;
      }

      var x = Math.min(ev._x,  tool.x0),
          y = Math.min(ev._y,  tool.y0),
          w = Math.abs(ev._x - tool.x0),
          h = Math.abs(ev._y - tool.y0);

      context.clearRect(0, 0, canvas.width, canvas.height);

      if (!w || !h) {
        return;
      }

      context.strokeRect(x, y, w, h);
    };

    this.mouseup = function (ev) {
      if (tool.started) {
        tool.mousemove(ev);
        tool.started = false;
        img_update();
      }
    };
    };

    // The line tool
    tools.line = function () {
      var tool = this;
      this.started = false;

      this.mousedown = function(ev) {
        tool.started = true;
        tool.x0 = ev._x;
        tool.y0 = ev._y;
        console.log(tool.started)
      };

      this.mousemove = function(ev){
        if(!tool.started) {
          return;
        }

        context.clearRect(0,0, canvas.width, canvas.height);

        context.beginPath();
        context.moveTo(tool.x0, tool.y0);
        context.lineTo(ev._x, ev._y);
        context.stroke();
        context.closePath();
      };

      this.mouseup = function(ev) {
        if (tool.started) {
          tool.mousemove(ev);
          tool.started = false;
          img_update();
        }
      };
    };

  init();

}, false); }
