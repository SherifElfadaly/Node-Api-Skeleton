
exports.up = (knex, Promise) => {
  return knex.schema.createTable('groups_prermissions', (table) => {
    table.increments('id');
    table.integer('group_id').notNullable().unsigned();
    table.integer('permission_id').notNullable().unsigned();
    table.foreign('group_id').references('groups.id');
    table.foreign('permission_id').references('permissions.id');
    table.timestamps();
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists('groups_prermissions');
};
