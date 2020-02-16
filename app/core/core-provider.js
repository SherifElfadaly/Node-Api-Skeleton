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
  container.constant('DBModel', require('./db-model'));
  container.constant('transaction', require('../config/db').transaction);
  container.constant('logger', require('../helpers/logger'));
  container.constant('joi', require('@hapi/joi'));
  container.constant('axios', require('axios'));
  container.constant('cron', require('./cron'));
  container.constant('sendgrid', require('@sendgrid/mail'));
  container.constant('fs', require('fs'));
  container.constant('ejs', require('ejs'));

  /**
   * Auth dependencies.
   */
  container.factory('authStrategy', function(container) {
    const Strategy = require(`../auth/strategies/${container.config.auth_strategy}`);
    return new Strategy();
  });
  container.factory('mail', function(container) {
    const Mail = require('../mail');
    container.sendgrid.setApiKey(container.config.send_grid_api_key);
    return new Mail(container.sendgrid);
  });
  container.constant('accessToken', require('../auth/models/access-token'));
  container.constant('authCode', require('../auth/models/auth_code'));
  container.constant('refreshToken', require('../auth/models/refresh-token'));
  container.service('validator', require('../validator'));
  container.service('errorHandlers', require('../helpers/error-handler'));
  container.service('auth', require('../auth'), 'authStrategy');
  container.constant('OAuthModel', require('../auth/models/oAuth'));
};
