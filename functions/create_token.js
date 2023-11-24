const functions = require('firebase-functions');
const { GoogleAuth } = require('google-auth-library');

const auth = new GoogleAuth();
// To avoid deployment errors, do not call admin.initializeApp() in your code

/**
 * Create a JWT token to be used for authorisation when requesting from the API.
 * @param {{targetAudience: string}} data
 * @param {functions.https.CallableContext} context
 * @return {Promise<{token: string}>}
 */
exports.createToken = functions.https
  .onCall(
    async (data, context) => {
      // Write your code below!
      const { targetAudience } = data;

      if (
        !(typeof targetAudience === 'string') ||
        targetAudience.length === 0
      ) {
        throw new functions.https.HttpsError(
          'invalid-argument',
          'The function must be called with ' +
          'one arguments "targetAudience" containing the target audience ' +
          'for the generated token.',
        );
      }

      const token = await exports.generateToken(targetAudience);

      return {
        token,
      };
      // Write your code above!
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

  const jwt = await client.idTokenProvider.fetchIdToken(targetAudience);

  return jwt;
};

// Function to check if the token is valid.

