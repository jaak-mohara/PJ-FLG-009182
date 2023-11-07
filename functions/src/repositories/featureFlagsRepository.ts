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

/**
 * Create a new feature flag entry in the database.
 *
 * @param {string} flagName
 * @param {boolean} isEnabled
 * @param {?string} description
 * @return {Promise<void>}
 */
export const createFeatureEntry = async ({
  name,
  isEnabled,
  description,
}: FeatureEntry): Promise<
  firestore.DocumentReference<firestore.DocumentData>
> => {
  const collectionRef = firestore().collection('feature_flags');

  const response = await collectionRef.add({
    name,
    description: description || '',
    isEnabled,
  });

  return response;
};
