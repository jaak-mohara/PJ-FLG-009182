const admin = require('firebase-admin/app');
admin.initializeApp();
const reflectUpdates = require('./reflect_updates.js');
exports.reflectUpdates = reflectUpdates.reflectUpdates;
const newCloudFunction = require('./new_cloud_function.js');
exports.newCloudFunction = newCloudFunction.newCloudFunction;
const createFeatureEntry = require('./create_feature_entry.js');
exports.createFeatureEntry = createFeatureEntry.createFeatureEntry;
