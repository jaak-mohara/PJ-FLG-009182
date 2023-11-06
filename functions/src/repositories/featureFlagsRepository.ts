import {firestore} from 'firebase-admin';

/**
 * Check if the flag name already exists in the database.
 *
 * @param {string} flagName
 * @return {Promise<boolean>}
 */
export const checkIfFlagNameExists = async (
  flagName: string
): Promise<boolean> => {
  const collectionRef = firestore().collection('feature_flags');

  const snapshot = await collectionRef.where('name', '==', flagName).get();

  return !snapshot.empty;
};
