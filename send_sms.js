// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = "ACc32085ddb541b7807126ebb85115eb3e";
const authToken = "520ba663c3faa1662a8682203403b0e0";
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
     from: '+18447710785',
     to: '+18133681620'
   })
  .then(message => console.log(message.sid));
