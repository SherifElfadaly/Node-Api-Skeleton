module.exports = async (user, data, value, attributeName, comapredAttributeName) => {
  if (value !== data[comapredAttributeName]) container.errorHandlers.notEqual(attributeName, comapredAttributeName);
};
