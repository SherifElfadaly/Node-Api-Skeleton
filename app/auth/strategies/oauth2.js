/**
 * Oauth2 class.
 */
class Oauth2 {
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
          `${container.config.auth_gateway}/token`, `grant_type=password&username=${email}&password=${password}`,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': `Basic ${container.config.auth_secret}`,
              'app-version': container.config.app_version,
            },
          }
      );
      return response.data.data;
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
          `${container.config.auth_gateway}/token`, `grant_type=refresh_token&refresh_token=${token}`,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': `Basic ${container.config.auth_secret}`,
              'app-version': container.config.app_version,
            },
          }
      );
      return response.data.data;
    } catch (error) {
      return false;
    }
  }

  /**
    * Authorize the logged in user to the given client id.
    *
    * @param   {string}  clientId
    * @param   {string}  authorization
    *
    * @return  {string}
    */
  async authorize(clientId, authorization) {
    try {
      const response = await container.axios.post(
          `${container.config.auth_gateway}/authorize`, `client_id=${clientId}&response_type=code`,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': `Bearer ${authorization}`,
              'app-version': container.config.app_version,
            },
          }
      );
      return response.data.data;
    } catch (error) {
      return false;
    }
  }

  /**
   * Exchange auth code with access token.
    *
    * @param   {string}  code
    * @param   {string}  authorization
    * @param   {string}  redirectUri
    *
    * @return  {string}
    */
  async getToken(code, authorization, redirectUri) {
    try {
      const response = await container.axios.post(
          `${container.config.auth_gateway}/token`, `grant_type=authorization_code&code=${code}&redirect_uri=${redirectUri}`,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': `Basic ${authorization}`,
              'app-version': container.config.app_version,
            },
          }
      );
      return response.data.data;
    } catch (error) {
      return false;
    }
  }
}

module.exports = Oauth2;
