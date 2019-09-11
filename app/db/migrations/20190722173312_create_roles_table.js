
exports.up = async (knex, Promise) => {
  await knex.schema.createTable('role', (table) => {
    table.increments('id');
    table.string('name', 100).notNullable();
    table.string('key', 100).notNullable();
    table.boolean('deleted').defaultTo(0);
    table.timestamps();
    table.unique('key');
  });

  /**
   * Create default admin role.
   */
  return knex('role').insert({
    name: 'Admin',
    key: 'admin',
    created_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
    updated_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists('role');
};
