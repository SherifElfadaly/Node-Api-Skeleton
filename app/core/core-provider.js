module.exports = (container) => {
  /**
   * Register read only dependencies.
   */
  container.constant('glob', require('glob'));
  container.constant('repository', require('./repository'));
  container.constant('controller', require('./controller'));
  container.constant('config', require('../config/app'));
  container.constant('moduleConfig', require('../config/module-config'));
  container.constant('mysql', require('mysql'));
  container.constant('knex', require('../config/db').knex);
  container.constant('objection', require('../config/db').Model);
  container.constant('Model', require('./model'));
  container.constant('DBModel', require('./db-model'));
  container.constant('transaction', require('../config/db').transaction);
  container.constant('util', require('util'));
  container.constant('sprintf', require('sprintf-js').sprintf);
  container.constant('noCase', require('no-case'));
  container.constant('moment', require('moment'));
  container.constant('logger', require('../helpers/logger'));
  container.constant('joi', require('@hapi/joi'));
  container.constant('jwt', require('jsonwebtoken'));
  container.constant('axios', require('axios'));
  container.constant('cron', require('./cron'));
  container.constant('sendgrid', require('@sendgrid/mail'));
  container.constant('fs', require('fs'));
  container.constant('ejs', require('ejs'));

  /**
   * Register object dependencies.
   */
  container.factory('authStrategy', function(container) {
    let Strategy;

    if (container.config.auth_strategy === 'local') Strategy = require('../auth/strategies/local');
    else Strategy = require('../auth/strategies/external');

    return new Strategy();
  });
  container.factory('mail', function(container) {
    const Mail = require('../mail');
    container.sendgrid.setApiKey(container.config.send_grid_api_key);
    return new Mail(container.sendgrid);
  });
  container.service('validator', require('../validator'));
  container.service('errorHandlers', require('../helpers/error-handler'));
  container.service('auth', require('../auth'), 'authStrategy');
};
