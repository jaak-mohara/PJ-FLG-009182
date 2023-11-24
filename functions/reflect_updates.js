const functions = require('firebase-functions');
const admin = require('firebase-admin');
// To avoid deployment errors, do not call admin.initializeApp() in your code

exports.reflectUpdates = functions.firestore.document('feature_flags/{flagId}')
  // @ts-ignore
  .onWrite((change, context) => {
    // Write your code below!
    const { name, toggled, uuid } = change.after.data();

    return admin
      .database()
      .ref(`/feature_flags/${uuid}`).set({ name, toggled });

    // Write your code above!
  });
