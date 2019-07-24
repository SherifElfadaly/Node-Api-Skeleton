
exports.up = (knex, Promise) => {
  return knex.schema.createTable('groups_prermissions', (table) => {
    table.increments('id');
    table.integer('group_id').notNullable().unsigned();
    table.integer('permission_id').notNullable().unsigned();
    table.foreign('user_id').references('users.id');
    table.foreign('permission_id').references('permissions.id');
    table.timestamps();
    table.unique('name');
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists('groups_prermissions');
};
