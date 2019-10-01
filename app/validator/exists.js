module.exports = async (user, data, value, attributeName, table, column = attributeName) => {
  const query = container.knex.from(table).where(column, value).count(`${column} as count`).first();
  const exists = (await query).count;
  if ( ! exists) container.errorHandlers.doesnotExists(attributeName);
};
