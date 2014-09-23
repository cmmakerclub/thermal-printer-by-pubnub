var pubnub = require("pubnub").init({
    publish_key   : "demo",
    subscribe_key : "demo"
});

var SerialPort = require("serialport").SerialPort
var serialPort = new SerialPort("/dev/ttyUSB0", {
  baudrate: 9600
}, false); // this is the openImmediately flag [default is true]

var isReadyToWrite = false;

process.stdin.resume();//so the program will not close instantly

function exitHandler(options, err) {
   
    serialPort.close();
   
    if (options.cleanup) { 
      console.log('clean');
    }

    if (err) {
      console.log(err.stack);
    }

    if (options.exit) {
       process.exit();
    }
}

//do something when app is closing
process.on('exit', exitHandler.bind(null,{cleanup:true}));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit:true}));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));

///////////////////////////////////
//////////////////////////////////
/////////////////////////////////

serialPort.open(function (error) {
  if ( error ) {
    console.log('failed to open: '+error);
  } else {
    setTimeout(function () {
      isReadyToWrite = true;
    }, 1000);
  }
});

pubnub.subscribe({
    channel  : "astatus",
    callback : function(message) {
      if (isReadyToWrite && message.text && message.text != "") {
        var buffer = new Buffer(message.text, "utf-8")
        serialPort.write(buffer, function(err, results) {
        });
      }
    }
});
