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
    const user = (await container.userRepository.findBy({'email': email}))[0];
    if (await user.verifyPassword(password)) return user;

    return false;
  }
}

module.exports = Local;
