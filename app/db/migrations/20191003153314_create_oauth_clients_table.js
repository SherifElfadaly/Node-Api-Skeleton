exports.up = async (knex, Promise) => {
  await knex.raw('SET foreign_key_checks = 0;');
  await knex.schema.createTable('oauth_client', (table) => {
    table.increments('id');
    table.string('name', 100).notNullable();
    table.string('client_secret', 100).notNullable();
    table.text('redirect_uri').notNullable();
    table.integer('user_id').notNullable().unsigned();
    table.boolean('deleted').defaultTo(0);
    table.foreign('user_id').references('user.id');
    table.timestamps();
  });
  return await knex.raw('SET foreign_key_checks = 1;');
};

exports.down = async (knex, Promise) => {
  await knex.raw('SET foreign_key_checks = 0;');
  await knex.schema.dropTableIfExists('oauth_client');
  return await knex.raw('SET foreign_key_checks = 1;');
};
