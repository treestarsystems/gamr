/*
 Purpose - A collection of fan control functions
*/
const core = require("./core.js");
const five = require("johnny-five");
const temperatureSensor = require("./temperatureSensor.js");

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
  //setInterval to generate enclosure's temp
  let temp = 0;
  let calculateAverageTemp = setInterval (async () => {
   let temperatureReadings = await temperatureSensor.readSensorAllDS18B20();
   if (temperatureReadings.status == 'failure') {
    console.log(`\n***Error Reading Temperature. Defaulting to 70F.\n***${temperatureReadings.payload}`);
    temp = 70;
   } else {
    let averageTemperature = (() => {
     //The temperature in F is used to calculate the average.
     let readings = [];
     temperatureReadings.payload.forEach((e,i) => {
      for (k in e) {
       readings.push(e[k].reading.f)
      }
     });
     /*
      Calculate the average by using reduce to add all items in the
      array and divide by the array's length.
     */
     let average = (r) => r.reduce((a, b) => a + b) / readings.length;;
     temp = average(readings);
    })();
   }

console.log(temp);

  },1000);

/*
   let board = new five.Board({
    repl: false,
    debug: false
   });

  fro.fan.forEach((e,i) => {
   //setInterval to check enclosure's temp
   let fanRegulator = setInterval (() => {
    if(!temp) {
     console.log(`Pin: ${e} | Speed: 170 | Temp: ${temp}F`);
     board.emit('adjustSpeed', e, 170);;
    } else {
     //Turn off below 70F
     if (temp < 70) board.emit('adjustSpeed', e, 0);;
     //Set fan speed to Low between 70+ to 90F
     if (temp => 70 && temp <= 90) board.emit('adjustSpeed', e, 170);;
     //Set fan speed to Medium between 90+ to 100F
     if (temp > 90 && temp <= 100) board.emit('adjustSpeed', e, 213);;
     //Set fan speed to High between 100+ to 110F
     if (temp > 100 && temp <= 110) board.emit('adjustSpeed', e, 255);;
     //Shut system when greater than 110F
     if (temp > 110) board.emit('exit');
    }
   },5000);
   //Run fan adjustment procedure
   //p = pin/s = speed or (brightness in johnny-five terms)
   board.on('adjustSpeed', (p,s) => {
    console.log(`Pin: ${p} | Speed: ${s} | Temp: ${temp}F`);
   });
  });

/*
  //Run exit procedures
  board.on('exit', () => {
   console.log('Environment is too hot! Shutdown all systems!');
   fan.stop().off();
   clearInterval(fanRegulator);
  });
*/

/*
  board.on('ready',() => {
   fro.fan.forEach((e,i) => {
    let fan = new five.Led(e);
    //setInterval to check enclosure's temp
    let fanRegulator = setInterval (() => {
     //If you can not retrieve the temp we default to the lowest fan speed.
console.log(`${e}: ${activeTimers}`);
activeTimers++;
     if(!temp) {
//      console.log(`Current Temp: Undefined`);
      fan.brightness(170);
     } else {
//      console.log(`Current Temp: fan${i} (Pin ${e}): ${temp}F`);
      //Turn off below 70F
      if (temp <= 70) fan.off();
      //Set fan speed to Low between 70+ to 90F
      if (temp > 70 && temp <= 90) fan.brightness(170);
      //Set fan speed to Medium between 90+ to 100F
      if (temp > 90 && temp <= 100) fan.brightness(213);
      //Set fan speed to High between 100+ to 110F
      if (temp > 100 && temp <= 110) fan.brightness(255);
      //Shut system when greater than 110F
      if (temp > 110) board.emit('exit');

      //Run exit procedures
      board.on('exit', () => {
       console.log('Environment is too hot! Shutdown all systems!');
       fan.stop().off();
//       clearInterval(fanRegulator);
      });
     }
    },1000);
//}
//let to = setTimeout(() => {},60000);
//clearTimeout(to);
   });
  });
*/
 } catch (e) {
//  console.log(e);
 }
}

module.exports = {
 fanRegulator
}
