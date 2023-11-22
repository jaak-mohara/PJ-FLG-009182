const functions = require('firebase-functions');
const { GoogleAuth } = require('google-auth-library');

const auth = new GoogleAuth();
// To avoid deployment errors, do not call admin.initializeApp() in your code

exports.newCloudFunction = functions.https.onCall(
  async (data, context) => {
    // Write your code below!
    // const {targetAudience} = data;
    // Write your code above!
    return {
      message: 'test message',
    };
  },
);

/**
 * Generate a JWT token to be user for authorisation when calling the
 * cloud requests.
 * @param {string} targetAudience
 * @return {Promise<string>}
 */
exports.generateToken = async (targetAudience) => {
  const client = await auth.getIdTokenClient(targetAudience);
  const res = await client.request({ url: targetAudience });
  console.log(res);
  return 'done';
};

// Function to check if the token is valid.

