
exports.up = (knex, Promise) => {
  return knex.schema.createTable('users_groups', (table) => {
    table.increments('id');
    table.integer('user_id').notNullable().unsigned();
    table.integer('group_id').notNullable().unsigned();
    table.foreign('user_id').references('users.id');
    table.foreign('group_id').references('groups.id');
    table.timestamps();
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists('users_groups');
};
