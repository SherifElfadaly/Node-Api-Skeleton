let relations = {};

/**
 * Call all registered relations.
 */
container.glob.sync(`${__dirname}/../modules/**/*-relations.js`).forEach((moduleRelation) => {
  relations = {...relations, ...require(moduleRelation)};
});

module.exports = relations;
