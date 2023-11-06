import {initializeApp} from 'firebase-admin/app';
import reflectUpdates from './handlers/reflectUpdates';

initializeApp();

exports.reflectUpdates = reflectUpdates;
