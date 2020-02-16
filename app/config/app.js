module.exports = {
  /**
   * App config.
   */
  app_name: process.env.APP_NAME || '',
  app_version: process.env.APP_VERSION || 1,

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
  db_port: process.env.DB_PORT || '',

  /**
   * Auth config.
   */
  auth_secret: process.env.AUTH_SECRET || '',
  token_expires_in: process.env.TOKEN_EXPIRES_IN || '',
  refresh_token_expires_in: process.env.REFRESH_TOKEN_EXPIRES_IN || '',
  auth_strategy: process.env.AUTH_STRATEGY || '',
  auth_gateway: process.env.AUTH_GATEWAY || '',
  reset_token_expires_in: process.env.RESET_TOKEN_EXPIRES_IN || '',
  confirm_token_expires_in: process.env.CONFIRM_TOKEN_EXPIRES_IN || '',

  /**
   * Redis config.
   */
  redis_host: process.env.REDIS_HOST || '',
  redis_port: process.env.REDIS_PORT || '',

  /**
   * Cron config.
   */
  cron_path: process.env.CRON_PATH || '/usr/src/app/cron.js',
  cron_user: process.env.CRON_USER || 'root',

  /**
   * Mail config.
   */
  send_grid_api_key: process.env.SENDGRID_API_KEY || '',
  email_from: process.env.EMAIL_FROM || '',
  confirm_url: process.env.CONFIRM_URL || '',
  reset_url: process.env.RESET_URL || '',
};
