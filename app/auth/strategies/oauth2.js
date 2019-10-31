/**
 * Local class.
 */
class Local {
  /**
    * Check the given credentials.
    *
    * @param   {string}  email
    * @param   {string}  password
    *
    * @return  {string}
    */
  async checkCredentials(email, password) {
    try {
      const response = await container.axios.post(
          container.config.auth_gateway, `grant_type=password&username=${email}&password=${password}`,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': `Basic ${container.config.auth_secret}`,
            },
          }
      );
      return await response.data.data;
    } catch (error) {
      return false;
    }
  }

  /**
    * Refresh access token using the given refresh token.
    *
    * @param   {string}  token
    *
    * @return  {string}
    */
  async refreshToken(token) {
    try {
      const response = await container.axios.post(
          container.config.auth_gateway, `grant_type=refresh_token&refresh_token=${token}`,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': `Basic ${container.config.auth_secret}`,
            },
          }
      );
      return await response.data.data;
    } catch (error) {
      return false;
    }
  }
}

module.exports = Local;
