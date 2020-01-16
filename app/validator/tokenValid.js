module.exports = async (user, data, value, attributeName) => {
  try {
    await container.jwt.verify(value, container.config.app_secret);
  } catch (err) {
    container.errorHandlers.tokenInvalid();
  }
};
