module.exports = (container) => {
  container.constant('repository', require('./repository'));
  container.constant('controller', require('./controller'));
};
