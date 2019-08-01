module.exports = {
  /**
   * Node config.
   */
  node_env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,

  /**
   * DB config.
   */
  db_host: process.env.DB_HOST || '',
  db_driver: process.env.DB_DRIVER || '',
  db_user: process.env.DB_USER || '',
  db_password: process.env.DB_PASSWORD || '',
  db_name: process.env.DB_NAME || '',

  /**
   * Auth config.
   */
  app_secret: process.env.APP_SECRET || '',
  token_expires_in: process.env.TOKEN_EXPIRES_IN || '',
  auth_strategy: process.env.AUTH_STRATEGY || '',
  auth_gateway: process.env.AUTH_GATEWAY || '',
};
