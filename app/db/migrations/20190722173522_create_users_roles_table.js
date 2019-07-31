
exports.up = async (knex, Promise) => {
  await knex.schema.createTable('users_roles', (table) => {
    table.increments('id');
    table.integer('user_id').notNullable().unsigned();
    table.integer('role_id').notNullable().unsigned();
    table.unique(['user_id', 'role_id']);
    table.foreign('user_id').references('users.id');
    table.foreign('role_id').references('roles.id');
    table.timestamps();
  });

  /**
   * Assign admin user to admin group.
   */
  return knex('users_roles').insert({
    user_id: 1,
    role_id: 1,
    created_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
    updated_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists('users_roles');
};
