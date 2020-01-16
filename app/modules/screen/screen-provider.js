module.exports = (container) => {
  container.constant('screenModel', require('./screen-db-model'));
  container.service('screen', require('./screen'), 'screenModel');
  container.service('screenRepository', require('./screen-repository'), 'screen');
  container.service('screenController', require('./screen-controller'), 'screenRepository');
  container.constant('screenRoutes', require('./screen-routes'));
  container.constant('screenValidationRules', require('./screen-validation-rules'));
};
