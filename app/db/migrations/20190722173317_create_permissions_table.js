
exports.up = (knex, Promise) => {
  return knex.schema.createTable('permissions', (table) => {
    table.increments('id');
    table.string('model', 100).notNullable();
    table.string('name', 100).notNullable();
    table.boolean('deleted').defaultTo(0);
    table.timestamps();
    table.unique(['model', 'name']);
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists('permissions');
};
