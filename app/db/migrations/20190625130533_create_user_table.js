
exports.up = async (knex, Promise) => {
  await knex.schema.createTable('user', (table) => {
    table.increments('id');
    table.string('image_checksum', 300).nullable().defaultTo('');
    table.string('name', 100).nullable();
    table.string('email', 100).notNullable();
    table.string('password').nullable();
    table.boolean('confirmed').defaultTo(0);
    table.boolean('deleted').defaultTo(0);
    table.timestamps();
    table.unique('email');
  });

  /**
   * Create default admin user.
   */
  const password = await require('bcrypt').hash('123456', 12);
  return knex('user').insert({
    email: 'admin@user.com',
    password: password,
    confirmed: 1,
    created_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
    updated_at: require('moment')().format('YYYY-MM-DD hh:mm:ss'),
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists('user');
};
