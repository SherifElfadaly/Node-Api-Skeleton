
exports.up = (knex, Promise) => {
  return knex.schema.createTable('users', (table) => {
    table.increments('id');
    table.string('email', 100).notNullable();
    table.string('password').nullable();
    table.boolean('deleted').defaultTo(0);
    table.timestamps();
    table.unique('email');
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists('users');
};
