let moduleConfig = {};

/**
 * Call all registered moduleConfig.
 */
container.glob.sync(`${__dirname}/../modules/**/*-config.js`).forEach((moduleRelation) => {
  moduleConfig = {...moduleConfig, ...require(moduleRelation)};
});

module.exports = moduleConfig;
