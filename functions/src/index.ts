import {initializeApp} from 'firebase-admin/app';

import reflectUpdates from './handlers/reflectUpdates';
import createFeatureEntry from './handlers/createFeatureEntry';

initializeApp();

exports.reflectUpdates = reflectUpdates;
exports.createFeatureEntry = createFeatureEntry;
