module.exports = (container) => {
  /**
   * Npm dependencies.
   */
  container.constant('glob', require('glob'));
  container.constant('util', require('util'));
  container.constant('sprintf', require('sprintf-js').sprintf);
  container.constant('noCase', require('no-case'));
  container.constant('moment', require('moment'));
  container.constant('joi', require('@hapi/joi'));
  container.constant('axios', require('axios'));
  container.constant('mysql', require('mysql'));
  container.constant('OAuth2Server', require('oauth2-server'));

  /**
   * Core dependencies.
   */
  container.constant('repository', require('./repository'));
  container.constant('controller', require('./controller'));
  container.constant('config', require('../config/app'));
  container.constant('moduleConfig', require('../config/module-config'));
  container.constant('knex', require('../config/db').knex);
  container.constant('objection', require('../config/db').Model);
  container.constant('Model', require('./model'));
  container.constant('Mapper', require('./mapper'));
  container.constant('transaction', require('../config/db').transaction);
  container.constant('logger', require('../helpers/logger'));
  container.constant('asyncWrapper', require('../config/exception-handler').asyncWrapper);
  container.service('validator', require('../validator'));
  container.service('errorHandlers', require('../helpers/error-handler'));

  /**
   * Auth dependencies.
   */
  container.constant('accessToken', require('../auth/models/access-token'));
  container.constant('auhtCode', require('../auth/models/auth_code'));
  container.constant('refreshToken', require('../auth/models/refresh-token'));
  container.factory('authStrategy', function(container) {
    const Strategy = require(`../auth/strategies/${container.config.auth_strategy}`);
    return new Strategy();
  });
  container.service('auth', require('../auth'), 'authStrategy');
  container.constant('OAuthModel', require('../auth/models/oAuth'));
};
