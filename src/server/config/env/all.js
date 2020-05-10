const path = require('path');

const rootPath = path.normalize(`${__dirname}/../..`);

module.exports = {
  appName: 'ims-web',
  root: rootPath,
  port: process.env.PORT || 3000,
  accessLog: {
    fileSize: '1m',
    keep: 10,
    compress: true,
  },
  isAWSEnvironment: false,
  preferClusterMode: true,
  endpoints: {
    login: 'http://localhost:8010/api/v1/login',
    allReligions: 'http://localhost:8010/api/v1/',
    allCategories: 'http://localhost:8010/api/v1/',
  },
  defaultUserPassword: 'password',
};
