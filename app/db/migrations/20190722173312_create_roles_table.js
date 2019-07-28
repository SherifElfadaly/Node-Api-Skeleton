
exports.up = (knex, Promise) => {
  return knex.schema.createTable('roles', (table) => {
    table.increments('id');
    table.string('name', 100).notNullable();
    table.string('key', 100).notNullable();
    table.boolean('deleted').defaultTo(0);
    table.timestamps();
    table.unique('key');
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists('roles');
};
