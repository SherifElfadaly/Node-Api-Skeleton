module.exports = (container) => {
  container.constant('ouathClientModel', require('./ouath-client-model'));
  container.service('ouathClient', require('./ouath-client'), 'ouathClientModel');
  container.service('ouathClientRepository', require('./ouath-client-repository'), 'ouathClient');
  container.service('ouathClientController', require('./ouath-client-controller'), 'ouathClientRepository');
  container.constant('ouathClientRoutes', require('./ouath-client-routes'));
  container.constant('ouathClientValidationRules', require('./ouath-client-validation-rules'));
};
