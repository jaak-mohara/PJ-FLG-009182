import {initializeApp} from 'firebase-admin/app';
import reflectUpdates from './handlers/reflect_updates';

initializeApp();

exports.reflectUpdates = reflectUpdates;
