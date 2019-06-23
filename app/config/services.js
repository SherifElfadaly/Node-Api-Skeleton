const Bottle = require('bottlejs');
const bottle = new Bottle();
const providers = require('./providers');
global.container = bottle.container;

/**
   * Register read only dependencies.
   */
bottle.constant('config', require('./app'));
bottle.constant('mysql', require('mysql'));
bottle.constant('knex', require('./db').knex);
bottle.constant('Model', require('./db').Model);
bottle.constant('transaction', require('./db').transaction);
bottle.constant('util', require('util'));
bottle.constant('bodyParser', require('body-parser'));
bottle.constant('sprintf', require('sprintf-js').sprintf);

/**
   * Call all registered providers.
   */
providers.forEach((provider) => {
  provider = require(provider);
  provider(bottle);
});

module.exports = bottle.container;
