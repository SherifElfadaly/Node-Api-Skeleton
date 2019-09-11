
exports.up = (knex, Promise) => {
  return knex.schema.createTable('permission', (table) => {
    table.increments('id');
    table.string('model', 100).notNullable();
    table.string('name', 100).notNullable();
    table.string('key', 100).notNullable();
    table.boolean('deleted').defaultTo(0);
    table.timestamps();
    table.unique(['model', 'key']);
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists('permission');
};
