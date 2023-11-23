const functions = require('firebase-functions');
const { GoogleAuth } = require('google-auth-library');

const auth = new GoogleAuth();
// To avoid deployment errors, do not call admin.initializeApp() in your code

exports.createToken = functions.https.onCall(
  async (data, context) => {
    // Write your code below!
    const { targetAudience } = data;

    console.debug(
      'CREATE_TOKEN: Generating token for audience: ',
      targetAudience,
    );

    if (!(typeof targetAudience === 'string') || targetAudience.length === 0) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'The function must be called with ' +
        'one arguments "targetAudience" containing the target audience ' +
        'for the generated token.',
      );
    }

    const response = await exports.generateToken(targetAudience);
    // Write your code above!
    return response;
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

  console.debug(
    'CREATE_TOKEN: Got ID token client for audience: ',
    targetAudience,
  );

  const res = await client.request({ url: targetAudience });

  console.debug(
    'CREATE_TOKEN: Response from the function to generate a token: ',
    res,
  );

  return 'done';
};

// Function to check if the token is valid.

