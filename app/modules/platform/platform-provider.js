module.exports = (container) => {
  container.constant('platformModel', require('./platform-db-model'));
  container.service('platform', require('./platform'), 'platformModel');
  container.service('platformRepository', require('./platform-repository'), 'platform');
  container.service('platformController', require('./platform-controller'), 'platformRepository');
  container.constant('platformRoutes', require('./platform-routes'));
  container.constant('platformValidationRules', require('./platform-validation-rules'));
};
