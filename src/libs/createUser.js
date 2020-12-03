const User = require("../models/User");

const createAdminUser = async () => {
  const userFound = await User.findOne({ email: "admin@localhost" });

  if (userFound) return;

  const newUser = new User({
    username: "admin",
    email: "admin@localhost",
    admin: true,
    companyId: '9999999',
    profile: [{
        name: 'ADMIN',
        lastname: 'ADMIN',
        age: '21',
        gender: 'Z',
        documentNumber: '999999',
    }]
  });

  newUser.password = await newUser.encryptPassword("adminpassword");

  await newUser.save();
  console.log('Admin user created')

};

module.exports = { createAdminUser };