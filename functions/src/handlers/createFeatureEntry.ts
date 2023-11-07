import {https} from 'firebase-functions';
import {
  checkIfFlagNameExists,
  createFeatureEntry,
} from '../repositories/featureFlagsRepository';
import {processName} from '../helpers/stringHelper';

export default https.onRequest(async (
  request: https.Request,
  response
): Promise<void> => {
  if (request.method !== 'POST') {
    response.status(405).send('Method Not Allowed');
    return;
  }

  const {
    name = null,
    isEnabled = null,
    description = null,
  } = request.body;

  if (!name == null) {
    response
      .status(422)
      .send({message: 'Name is required.'});
    return;
  }

  // Parse to all caps format with underscores.
  const processedName = processName(name);

  if (!isEnabled == null) {
    response
      .status(422)
      .send({message: 'isEnabled is required.'});
    return;
  }

  // Check if the flag name exists to prevent creating duplicate flags.
  if (await checkIfFlagNameExists(processedName)) {
    response
      .status(409)
      .send({message: 'Name already exists.'});
    return;
  }

  // Create the flag.
  const creationResponse = await createFeatureEntry({
    name: processedName,
    isEnabled,
    description,
  });

  response
    .status(200)
    .send({
      message: 'Feature flag created.',
      ...creationResponse.get(),
    });
});
