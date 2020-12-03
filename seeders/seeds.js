const faker = require('faker');
const User = require('../src/models/User');
const Company = require('../src/models/Company');

function getRandomAge() {
  return Math.floor(Math.random() * (21 - 19)) + 19;
}

function getRandomGender() {
  let result = '';
  const genders = 'FM';
  for (let u = 0; u < 1; u++) {
    result += genders.charAt(Math.floor(Math.random() * genders.length));
  }
  return result;
}

const seedCompanies = async function () {
  try {
    const companiesCollections = await Company.find();
    if (companiesCollections.length > 1) {
      return;
    }
    const quantity = 3;
    const companies = [];
    for (let u = 0; u < quantity; u++) {
      companies.push(
        new Company({
          name: faker.company.companyName(),
          nit: faker.random.number(),
          address: faker.address.streetAddress(),
        }),
      );
    }
    await Company.deleteMany();
    companies.forEach(async (company) => {
      await Company.create(company);
    });
    console.log('Companies collection has been populated!');
  } catch (error) {
    console.log(error);
  }
};

const seedUsers = async function () {
  try {
    const usersCollections = await User.find();
    if (usersCollections.length > 1) {
      return;
    }
    const users = [];
    Company.find({});
    const companiesIds = await Company.find().select('_id');
    companiesIds.forEach((id) => {
      const quantity = 20;
      for (let u = 0; u < quantity; u++) {
        users.push(
          new User({
            email: faker.internet.email(),
            password: faker.internet.password(),
            admin: false,
            companyId: id._id,
            profile: [{
              name: faker.name.firstName(),
              lastname: faker.name.lastName(),
              age: getRandomAge(),
              gender: getRandomGender(),
              documentNumber: faker.random.number(),
            }],
          }),
        );
      }
    });

    await User.deleteMany();
    users.forEach((user) => {
      User.create(user);
    });
    console.log('Users collection has been populated!');
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  seedUsers,
  seedCompanies,
};
