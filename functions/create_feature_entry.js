const { https } = require('firebase-functions');

const repository = require('./src/repositories/featureFlagsRepository');
const stringHelper = require('./src/helpers/stringHelper');

exports.createFeatureEntry = https.onRequest(async (request, response) => {
  if (request.method === 'GET') {
    response.status(204);
    return;
  }

  if (request.method !== 'POST') {
    response.status(405).send({ message: 'Method Not Allowed.' });
    return;
  }

  const {
    name,
    isEnabled,
    description = 'No description provided.',
  } = request.body;

  if (!name) {
    response
      .status(422)
      .send({ message: 'Name is required.' });
    return;
  }
  // Parse to all caps format with underscores.
  const processedName = stringHelper.processName(name);
  if (!isEnabled) {
    response
      .status(422)
      .send({ message: 'isEnabled is required.' });
    return;
  }

  // Check if the flag name exists to prevent creating duplicate flags.
  if (await repository.checkIfFlagNameExists(processedName)) {
    response
      .status(409)
      .send({ message: 'Name already exists.' });
    return;
  }

  const test = response.status(200);

  // Create the flag.
  const result = await repository.createFeatureEntry({
    name: processedName,
    isEnabled,
    description,
  });

  response
    .status(200)
    .send({
      message: 'Feature flag created.',
      id: result.id,
    });
});
