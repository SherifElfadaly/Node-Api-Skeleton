module.exports = async (user, data, value, attributeName, table, column = attributeName, idColumn = 'id') => {
  const query = container.knex.from(table).where(column, value).count(`${idColumn} as count`).first();
  if (data.hasOwnProperty('id')) query.whereNot(idColumn, data['id']);
  const exists = (await query).count;
  if (exists) container.errorHandlers.alreadyExists(attributeName);
};
