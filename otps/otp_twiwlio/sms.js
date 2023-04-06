// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = 'AC6c0c84d6e2dfdc9375732a2e0f458f1d';
const authToken = '66bbf425d4cf85abfc511e454a3d161c';
const client = require('twilio')(accountSid, authToken);

client.messages
    .create({
        body: 'Hi Ayush Your OTP is 88xhA90',
        from: '+19127328394',
        to: '+917355305504'
    })
    .then(message => console.log(message)).catch((err)  => console.log(err));
