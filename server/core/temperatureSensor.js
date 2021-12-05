/*
 Purpose - A collection of sensor data collection functions
*/
const fs = require('fs');
const core = require("./core.js");

/*
 Retrieves a list of sensor IDs that are present on the system. IDs are
 filtered and only show IDs that match the pattern "begins with 28-"
 Ex: ['28-0118307077ff','28-0118307077fe']
*/
async function listSensorAllDS18B20 () {
 let returnObj = {"status": "success","message": "success","payload": ""};
 try {
  let sensorDir = `/sys/bus/w1/devices`
  let sensorDataResults = await fs.promises.readdir(sensorDir)
   .then((list) => {
    //If you need to add to the filter RegEx to catch new patterns you can do so below.
    return list.filter(l => /^[2]8-/.test(l));
   })
   .catch(e => core.defaultErrorHandler(e));
  if (sensorDataResults.status == 'failure') throw sensorDataResults.payload;
  returnObj.payload = sensorDataResults;
  return returnObj;
 } catch (e) {
  return core.defaultErrorHandler(e);
 }
}

/*
 Takes a sensorID string and produces a standard return object.
 Ex:
 {
  "status":"success",
  "message":"success",
  "payload":{
   "28-0118307077ff":{
    "reading":{
     "raw":21187,
     "c":21.187,
     "f":70.1366,
     "k":294.337
    }
   }
  }
 }
*/
async function readSensorSingleDS18B20 (sensorID) {
 let returnObj = {"status": "success","message": "success","payload": ""};
 try {
  let sensorDir = `/sys/bus/w1/devices/${sensorID}/w1_slave`
  let sensorDataResults = await fs.promises.readFile(sensorDir,{encoding: 'utf8'})
   .then((data) => {
    //converts data to string, removes chars, and extracts temperature in millicelcius.
    return data.replace(/\n/g, " ").replace(/\s/g, "" ).match(/[^=]*$/g)[0];
   });
  let processedSensorDataResults = {
   [sensorID]: {
    "reading": {
     "raw": Number(sensorDataResults),
     "c": core.temperatureConversion(sensorDataResults, 'c'),
     "f": core.temperatureConversion(sensorDataResults, 'f'),
     "k": core.temperatureConversion(sensorDataResults, 'k')
    }
   }
  }
  returnObj.payload = processedSensorDataResults;
  return returnObj;
 } catch (e) {
  return core.defaultErrorHandler(e);
 }
}

/*
 Takes an array of sensorID strings and produces a standard return object.
 Ex:
  {
   "status":"success",
   "message":"success",
   "payload":[
    {
     "28-0118307077ff":{
      "reading":{
       "raw":21062,
       "c":21.062,
       "f":69.9116,
       "k":294.212
      }
     }
    },
    {
     "28-011830b2d5ff":{
      ...truncated
     }
    }
   ]
  }
*/
async function readSensorAllDS18B20 () {
 let returnObj = {"status": "success","message": "success","payload": ""};
 try {
  let allSensors = await listSensorAllDS18B20();
  if (allSensors.status == "failure") throw allSensors.payload;
  let allSensorReadings = [];
  for (as of allSensors.payload) {
   let reading = await readSensorSingleDS18B20(as);
   allSensorReadings.push(reading.payload);
  }
  returnObj.payload = allSensorReadings;
  return returnObj;
 } catch (e) {
  return core.defaultErrorHandler(e);
 }
}

/*
//Test block
(async () => {
 let t0 = await listSensorAllDS18B20();
 let t1 = await readSensorSingleDS18B20(t0.payload[0]);
 let t2 = await readSensorAllDS18B20()
 console.log(JSON.stringify(t0));
 console.log(JSON.stringify(t1));
 console.log(JSON.stringify(t2));
})();
*/

module.exports = {
 listSensorAllDS18B20,
 readSensorSingleDS18B20,
 readSensorAllDS18B20
}
