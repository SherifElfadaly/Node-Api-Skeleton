exports.up = async (knex, Promise) => {
  await knex.raw('SET foreign_key_checks = 0;');
  await knex.schema.createTable('oauth_access_token', (table) => {
    table.string('id', 100).primary();
    table.datetime('expires_at').notNullable();
    table.string('scope', 100).nullable();
    table.integer('user_id').notNullable().unsigned();
    table.integer('client_id').notNullable().unsigned();
    table.foreign('user_id').references('user.id');
    table.foreign('client_id').references('oauth_client.id');
    table.timestamps();
  });
  return await knex.raw('SET foreign_key_checks = 1;');
};

exports.down = async (knex, Promise) => {
  await knex.raw('SET foreign_key_checks = 0;');
  await knex.schema.dropTableIfExists('oauth_access_token');
  return await knex.raw('SET foreign_key_checks = 1;');
};
