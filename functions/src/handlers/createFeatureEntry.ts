import {https} from 'firebase-functions';

export default https.onRequest((request: https.Request, response) => {
  if (request.method !== 'POST') {
    response.status(405).send('Method Not Allowed');
    return;
  }

  const message = request.body.message;
  response.send({message: `You sent: ${message}`});
});
