const admin = require('firebase-admin');

/**
 * Check if the flag name already exists in the database.
 *
 * @param {string} flagName
 * @return {Promise<boolean>}
 */
exports.checkIfFlagNameExists = async (flagName) => {
  const collectionRef = (0, admin.firestore)().collection('feature_flags');
  const snapshot = await collectionRef.where('name', '==', flagName).get();
  return !snapshot.empty;
};

/**
 * Create a new feature flag entry in the database.
 *
 * @param {string} flagName
 * @param {boolean} isEnabled
 * @param {?string} description
 * @return {Promise<void>}
 */
exports.createFeatureEntry = async ({ name, isEnabled, description }) => {
  const collectionRef = (0, admin.firestore)().collection('feature_flags');
  const response = await collectionRef.add({
    name,
    description: description || '',
    isEnabled,
  });
  return response;
};
