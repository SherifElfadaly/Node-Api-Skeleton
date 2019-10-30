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
              'Authorization': `Basic ${container.config.auth_secert}`,
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
