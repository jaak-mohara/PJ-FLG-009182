import {https} from 'firebase-functions';
import {GoogleAuth} from 'google-auth-library';

const auth = new GoogleAuth();

export default https.onCall(async (
  data,
  context,
) => {
  const url = context.rawRequest.url;

  const client = await auth.getIdTokenClient(url);
  const res = await client.request({url});

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello from getAuthToken!',
      res,
    }),
  };
});
