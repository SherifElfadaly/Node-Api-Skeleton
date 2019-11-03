module.exports = (container) => {
  container.constant('oauthClientModel', require('./oauth-client-model'));
  container.service('oauthClient', require('./oauth-client'), 'oauthClientModel');
  container.service('oauthClientRepository', require('./oauth-client-repository'), 'oauthClient');
  container.service('oauthClientController', require('./oauth-client-controller'), 'oauthClientRepository');
  container.constant('oauthClientRoutes', require('./oauth-client-routes'));
  container.constant('oauthClientValidationRules', require('./oauth-client-validation-rules'));
};
