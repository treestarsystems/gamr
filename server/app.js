//Destination: server/app.js
const core = require('./core/core.js');
const fanControl = require('./core/fanRegulator.js');

async function appCode () {
 console.log('Running App Specific Code...')
 if (process.env.INSTANCE_TYPE == 'primary') {
  //Create the expected object for fanControl.fanRegulator
  let fanRegulatorObj = {fan: [2]};
  fanControl.fanRegulator(fanRegulatorObj);
 }
}

module.exports = {
 appCode
}
