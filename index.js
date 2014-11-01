var NPS = require('neopixels');

var neo = new NPS();

var trace = Buffer.concat(tracer(600));
neo.on('end', function() {
  // Start the animation again
  neo.animate(60, trace);
});

function tracer(numLEDs) {
  var trail = 100;
  var arr = new Array(numLEDs);
  for (var i = 0; i < numLEDs; i++) {
    var buf = new Buffer(numLEDs * 3);
    buf.fill(0);
    for (var col = 0; col < 3; col++){
      for (var k = 0; k < trail; k++) {
        buf[(3*(i+numLEDs*col/3)+col+1 +3*k)] = (0xFF-(col * (0xFF/6)));
      }
    }
    arr[i] = buf;
  }
  return arr;
}

neo.animate(60, trace);