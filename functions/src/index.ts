import {initializeApp} from 'firebase-admin/app';

import reflectUpdates from './handlers/reflectUpdates';
import createFeatureEntry from './handlers/createFeatureEntry';
import getAuthToken from './handlers/getAuthToken';

initializeApp();

export {
  reflectUpdates,
  createFeatureEntry,
  getAuthToken,
};
