var admin = require("firebase-admin");
// let db = require('./db/db.config');
var serviceAccount = require('./notification-4d8cd-firebase-adminsdk-rzmns-97f56a2b5b.json');


// const Notifications = db.noti
admin.initializeApp({
  	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://prismappfcm.firebaseio.com"
});
var topic = 'general';

var message = {
  notification: {
    title: 'messages',
    body: `xyz`
  },
  topic: topic
};
// console.log(message.notification.body);
let updateMessage = message.notification.body

// Send a message to devices subscribed to the provided topic.
admin.messaging().send(message)
  .then(async (response) => {
    // Response is a message ID string.
    // let data = await Notifications.create({message:updateMessage})
    // console.log(data , "data");
    console.log('Successfully sent message:', response);
  })
  .catch((error) => {
    console.log('Error sending message:', error);
});