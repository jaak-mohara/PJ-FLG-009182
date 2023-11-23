const admin = require('firebase-admin/app');
admin.initializeApp();
const reflectUpdates = require('./reflect_updates.js');
exports.reflectUpdates = reflectUpdates.reflectUpdates;
const createToken = require('./create_token.js');
exports.createToken = createToken.createToken;
const createFeatureEntry = require('./create_feature_entry.js');
exports.createFeatureEntry = createFeatureEntry.createFeatureEntry;
