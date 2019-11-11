/**
 * Local class.
 */
class Local {
  /**
     * Check the given credentials.
     *
     * @param   {string}  email
     * @param   {string}  password
     * @param   {object}  trx
     *
     * @return  {string}
     */
  async checkCredentials(email, password, trx) {
    const user = await container.userRepository.first({'email': email}, '[]', '*', trx);
    if (user && user.password && await user.verifyPassword(password)) return user;

    return false;
  }
}

module.exports = Local;
