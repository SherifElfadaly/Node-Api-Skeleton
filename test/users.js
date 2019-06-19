// const sinon = require('sinon');
require('dotenv').config();
const expect = require('chai').expect;
const container = require('../app/config/services');
const userRepository = container.userRepository;

describe('userRepository', () => {
  it('should return array of users', async () => {
    const result = await userRepository.all();
    expect(result).to.be.an('array');
  });

  it('should return user with id 1', async () => {
    const result = await userRepository.find(1);
    expect(result.id).to.equal(1);
  });
});

after(() => container.knex.destroy());
