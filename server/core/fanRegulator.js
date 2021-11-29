const five = require('johnny-five');

function getRandomArbitrary(min, max) {
 return Math.random() * (max - min) + min;
}

//Notes: 3k RPM fans turn on at around 168 brightness and max out at 255.
//Fans
function fanRegulator () {
 try {
  let board = new five.Board({
   repl: false,
   debug: false
  });
  board.on('ready',() => {
   console.log('Begin Fan Control');
   //Setup fan
   let fan = new five.Led(9);
   fan.brightness(255);
   //setInterval to check enclosure's temp
   let fanRegulator = setInterval (() => {
    //Using a random number generator
    let temp = getRandomArbitrary(50,150);
    console.log(`Current Temp: ${temp}F`);
     //Turn off below 70F
    if (temp <= 70) fan.off();
    //Set fan speed to Low between 70+ to 90F
    if (temp > 70 && temp <= 90) fan.brightness(170);
    //Set fan speed to Medium between 90+ to 100F
    if (temp > 90 && temp <= 100) fan.brightness(213);
    //Set fan speed to High between 100+ to 110F
    if (temp > 100 && temp <= 110) fan.brightness(255);
    //Shut system when greater than 110F
//    if (temp > 110) board.emit('exit');
    if (temp > 110) console.log('Exit. Extreme Temp!');
   },10000);

   //Run exit procedures
   board.on('exit', () => {
    console.log('Environment is too hot! Shutdown all systems!');
//    fan.stop().off();
//    clearInterval(fanRegulator);
   });
  });
 } catch (e) {
  console.log(e);
 }
}

module.exports = {
 fanRegulator
}
