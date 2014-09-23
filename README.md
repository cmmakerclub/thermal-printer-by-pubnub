thermal-printer-by-pubnub
=========================

Connect thermalprinter to computer (eg. raspberry pi).

Set port to thermal_printer.js at 

	var serialPort = new SerialPort("[YOUR PORT]", {
		
eg. /dev/ttyUSB0

Find port

	ls /dev/tty*
	
PUBNUB
===

set publish\_key, subscribe\_key , channel

In this we set 

	publish_key   : "demo"
	subscribe_key : "demo"
	channel       : astatus
	
Setting Thermal printer
===
Please see at [adafruit](https://learn.adafruit.com/mini-thermal-receipt-printer)
