
exports.up = (knex, Promise) => {
  return knex.schema.createTable('users_roles', (table) => {
    table.increments('id');
    table.integer('user_id').notNullable().unsigned();
    table.integer('role_id').notNullable().unsigned();
    table.foreign('user_id').references('users.id');
    table.foreign('role_id').references('roles.id');
    table.timestamps();
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists('users_roles');
};
