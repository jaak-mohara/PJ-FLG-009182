const admin = require('firebase-admin/app');
admin.initializeApp();
const reflectUpdates = require('./reflect_updates.js');

exports.reflectUpdates = reflectUpdates.reflectUpdates;
