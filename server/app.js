//Destination: server/app.js
const core = require('./core/core.js');
const fanControl = require('./core/fanRegulator.js');

function appCode () {
 console.log('Running App Specific Code...')
 if (process.env.INSTANCE_TYPE == 'primary') {
  fanControl.fanRegulator();
 }
}

module.exports = {
 appCode
}
