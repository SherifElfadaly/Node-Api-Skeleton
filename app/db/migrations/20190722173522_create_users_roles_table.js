
exports.up = async (knex, Promise) => {
  await knex.schema.createTable('user_role', (table) => {
    table.increments('id');
    table.integer('user_id').notNullable().unsigned();
    table.integer('role_id').notNullable().unsigned();
    table.unique(['user_id', 'role_id']);
    table.foreign('user_id').references('user.id');
    table.foreign('role_id').references('role.id');
    table.timestamps();
  });

  /**
   * Assign admin user to admin group.
   */
  return knex('user_role').insert({
    user_id: 1,
    role_id: 1,
    created_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
    updated_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists('user_role');
};
