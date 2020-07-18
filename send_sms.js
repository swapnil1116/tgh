// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure
const accountSid = 'AC70fc5d59ea014a17d177f6661c2573d7';
const authToken = '77e2cd1e1774b5ade7cb9d12f54ac507';
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
     from: '+12015815856',
     to: '+919340618228'
   })
  .then(message => console.log(message.sid));