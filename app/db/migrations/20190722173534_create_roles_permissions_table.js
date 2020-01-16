
exports.up = (knex, Promise) => {
  return knex.schema.createTable('role_permission', (table) => {
    table.increments('id');
    table.integer('role_id').notNullable().unsigned();
    table.string('permission_id', 100);
    table.unique(['role_id', 'permission_id']);
    table.foreign('role_id').references('role.id');
    table.foreign('permission_id').references('permission.id');
    table.timestamps();
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists('role_permission');
};
