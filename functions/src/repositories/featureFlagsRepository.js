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
 * @param {{
 *  name: string,
 *  isEnabled: boolean,
 *  description: string,
 *  uuid: string
 * }} featureFlag
 * @param {boolean} isEnabled
 * @param {?string} description
 * @return {Promise<void>}
 */
exports.createFeatureEntry = async (featureFlag) => {
  const collectionRef = (0, admin.firestore)().collection('feature_flags');
  const response = await collectionRef.add(featureFlag);
  return response;
};
