/**
 * Hr class.
 */
class Hr {
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
      const response = await container.axios.post(container.config.auth_gateway, {email: email, password: password});
      return response;
    } catch (error) {
      return false;
    }
  }
}

module.exports = Hr;
