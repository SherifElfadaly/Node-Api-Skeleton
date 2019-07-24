
exports.up = (knex, Promise) => {
  return knex.schema.createTable('permissions', (table) => {
    table.increments('id');
    table.string('name', 100).notNullable();
    table.boolean('deleted').defaultTo(0);
    table.timestamps();
    table.unique('name');
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists('permissions');
};
