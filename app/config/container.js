const Bottle = require('bottlejs');
const bottle = new Bottle();
global.container = bottle.container;

/**
 * Register the core provider.
 */
require('../core/core-provider')(bottle);

/**
 * Call all registered providers.
 */
container.glob.sync(`${__dirname}/../modules/**/*-provider.js`).forEach((provider) => {
  provider = require(provider);
  provider(bottle);
});

module.exports = bottle.container;
