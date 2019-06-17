// const sinon = require('sinon');
require('dotenv').config();
const expect = require('chai').expect;
const container = require('../app/config/services');
const userModel = container.userModel;

describe('usereModel', () => {
  it('should return array of users', async () => {
    const result = await userModel.all();
    expect(result).to.be.an('array');
  });

  it('should return user with id 1', async () => {
    const result = await userModel.find(1);
    expect(result.id).to.equal(1);
  });
});

after(function() {
  userModel.disconnect();
});
