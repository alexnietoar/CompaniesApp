const { seedCompanies, seedUsers } = require('../../seeders/seeds');
const { createAdminUser } = require("../libs/createUser");

const poblate = async () => {
  await seedCompanies();
  await seedUsers();
  await createAdminUser();
};

module.exports = poblate;
