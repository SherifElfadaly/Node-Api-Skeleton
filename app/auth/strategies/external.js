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
      const user = await container.userRepository.first({email: response.data.data.email});

      return user ? container.oauth.options.model.tokenFromUser(user, {id: 1}) : false;
    } catch (error) {
      return false;
    }
  }
}

module.exports = Hr;
