module.exports = (container) => {
  container.factory('DB', (container) => {
    const DB = require('./db');
    const db = new DB(container.config);

    return db.getDriver();
  });
};
