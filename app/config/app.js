module.exports = {
  node_env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  db_host: process.env.DB_HOST || '',
  db_driver: process.env.DB_DRIVER || '',
  db_user: process.env.DB_USER || '',
  db_password: process.env.DB_PASSWORD || '',
  db_database: process.env.DB_DATABASE || '',
};
