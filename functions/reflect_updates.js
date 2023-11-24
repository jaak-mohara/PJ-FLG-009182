const functions = require('firebase-functions');
const admin = require('firebase-admin');
// To avoid deployment errors, do not call admin.initializeApp() in your code

exports.reflectUpdates = functions.firestore.document('feature_flags/{flagId}')
  .onWrite((change, context) => {
    // Write your code below!
    const { name, isEnabled, uuid } = change.after.data();

    return admin
      .database()
      .ref(`/feature_flags/${uuid}`).set({ name, isEnabled });

    // Write your code above!
  });
