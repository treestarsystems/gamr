/*
 Documentation: https://www.raspberrypi.com/documentation/computers/config_txt.html#monitoring-core-temperature
 Purpose - A collection of fan control functions
*/
const EventEmitter = require('events');
const five = require("johnny-five");
const core = require("./core.js");
const temperatureSensor = require("./temperatureSensor.js");

//Set your default temperature scale here. Valid options: raw,k,f,c
var defaultScale = "f";

//Temp is in F.
var defaultTemperaure = 80;

//Notes: 3k+ RPM fans turn on at around 168 brightness and max out at 255 like normal.
//Pass this an array of numbers representing the pins that the fan(s) is/are connected to.
async function fanRegulator (fro) {
 /*
  Pass this function an object containing two keys:fan and arrays.
  fan: an array of pwm pins on an arduino. Note: PWM Fan Hub will
       allow you connect multiple pwm pins to the same arduino port.
       Ex: [2,3]
 */
 try {
  //Define custom event and addListener
  const adjustFan = new EventEmitter();
  //Initialize board
  let board = new five.Board({
   repl: false,
   debug: false
  });
  board.on('ready',() => {
   /*
    Call the .Leds sub function which accepts an array of Leds.
    I wish I knew about this earlier.
    Source:
     - https://github.com/rwaldron/johnny-five/blob/main/docs/led-array.md
     - https://github.com/rwaldron/johnny-five/blob/main/docs/led-array-controller.md
   */
   let fans = new five.Leds(fro.fan);
   /*
    Using function keyword to allow the use of the this keyword
    Source: https://nodejs.org/api/events.html#passing-arguments-and-this-to-listeners
    s = speed (aka brightness in Johnny-Five)
   */
   adjustFan.on('changeFanSpeed', (s) => {
    console.log(`Speed: ${s} | Temp: ${temp.toFixed(2)}${defaultScale.toUpperCase()}`);
    fans.brightness(s);
   });

   adjustFan.on('off', () => {
    console.log(`Fan Off: Speed: 0 | Temp: ${temp.toFixed(2)}${defaultScale.toUpperCase()}`);
    fans.off();
   });

   adjustFan.on('emergencyShutdown', (s) => {
    console.log(`Shutting Down: Speed: ${s} | Temp: ${temp.toFixed(2)}${defaultScale.toUpperCase()}`);
    clearInterval(calculateAverageTemp);
   })
  });
  //setInterval to generate enclosure's temp
  let temp = defaultTemperaure;
  async function emitTemperature (obj) {
   let temperatureReadings = await temperatureSensor.readSensorAllDS18B20();
   if (temperatureReadings.status == 'failure') {
    console.log(`\n***Error Reading Temperature. Defaulting to ${temp.toFixed(2)}F.\n***${temperatureReadings.payload}`);
    adjustFan.emit('changeFanSpeed', 170);
   } else {
    //Retrieve average temperature
    //I have to be doing something wrong. I shouldn't need to have two for loops here.
    for (tr of temperatureReadings.payload) {
     for (at in tr) {
      if (at == "averageTemperature") temp = tr[at][defaultScale]
     }
    }
   }
   //Emit an event that is passed an array of pins the fans are connected to and the speed
//temp = core.getRandomInt(0,190)
   //Turn off below 150F
   if (temp < 150) adjustFan.emit('off');
   //Set fan speed to Low between 150+ to 160F
   if (temp > 150 && temp <= 160) adjustFan.emit('changeFanSpeed', 170);
   //Set fan speed to Medium between 160+ to 170F
   if (temp > 160 && temp <= 170) adjustFan.emit('changeFanSpeed', 213);
   //Set fan speed to High between 170+ to 180F
   if (temp > 170 && temp <= 180) adjustFan.emit('changeFanSpeed', 255);
   //Shut system when greater than 180F
   if (temp > 180) adjustFan.emit('emergencyShutdown', 0);
  }

  let calculateAverageTemp = setInterval (() => {
   emitTemperature()
  },10000);
 } catch (e) {
  console.log(e);
 }
}

module.exports = {
 fanRegulator
}
