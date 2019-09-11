module.exports = async (value, id, attributeName, data, table, column = attributeName, idColumn = 'id') => {
  const query = container.knex.from(table).where(column, value).count(`${idColumn} as count`).first();
  if (id) query.whereNot(idColumn, id);
  const exists = (await query).count;
  if (exists) container.errorHandlers.alreadyExists(attributeName);
};
