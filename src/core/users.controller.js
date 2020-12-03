const usersCtrl = {};

// Models
const passport = require('passport');
const User = require('../models/User');
const Company = require('../models/Company');

// Modules

usersCtrl.renderSignUpForm = async (req, res) => {
  const companies = await Company.find({}).lean().sort({ name: 'asc' });
  res.render('users/signup', { companies });
};

usersCtrl.singup = async (req, res) => {
  const {
    documentNumber, name, lastname, email, age, gender, companyName, password, confirmPassword,
  } = req.body;
  const errors = [];

  if (!documentNumber) {
    errors.push({ text: 'Please write a document number' });
  }

  if (!name) {
    errors.push({ text: 'Please write a name' });
  }

  if (!lastname) {
    errors.push({ text: 'Please write a lastname' });
  }

  if (!email) {
    errors.push({ text: 'Please write a email' });
  }

  if (!age) {
    errors.push({ text: 'Please write a age' });
  }

  if (!gender) {
    errors.push({ text: 'Please write a gender' });
  }

  if (password !== confirmPassword) {
    errors.push({ text: 'Passwords does not match' });
  }
  if (password.length < 4) {
    errors.push({ text: 'Password must be at least 4 characters' });
  }
  if (errors.length > 0) {
    res.render('users/signup', {
      errors,
      documentNumber,
      name,
      lastname,
      email,
      age,
      gender,
    });
  } else {
    const emailUser = await User.findOne({ email });
    if (emailUser) {
      req.flash('error_msg', 'The email is already in use');
      res.redirect('/users/signup');
    }

    const companyId = await Company.findOne({ name: companyName }).select('_id');

    const newUser = new User({
      email,
      password,
      admin: false,
      companyId: companyId._id,
      profile: [{
        name, lastname, age, gender, documentNumber,
      }],
    });
    newUser.password = await newUser.encryptPassword(password);
    await newUser.save();
    req.flash('success_msg', 'You are registered');
    res.redirect('/users/signin');
  }
};

usersCtrl.renderSigninForm = (req, res) => {
  res.render('users/signin');
};

usersCtrl.signin = passport.authenticate('local', {
  successRedirect: '/companies',
  failureRedirect: '/users/signin',
  failureFlash: true,
});

usersCtrl.logout = (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out now.');
  res.redirect('/users/signin');
};

usersCtrl.renderEditProfile = async (req, res) => {
  const companies = await Company.find({}).lean().sort({ name: 'asc' });
  const user = await User.findById(req.params.id).lean();
  res.render('users/profile', { user, companies });
};

usersCtrl.updateProfile = async (req, res) => {
  const {
    documentNumber, name, lastname, email, age, gender, companyName
  } = req.body;
  const errors = [];

  if (!documentNumber) {
    errors.push({ text: 'Please write a document number' });
  }

  if (!name) {
    errors.push({ text: 'Please write a name' });
  }

  if (!lastname) {
    errors.push({ text: 'Please write a lastname' });
  }

  if (!email) {
    errors.push({ text: 'Please write a email' });
  }

  if (!age) {
    errors.push({ text: 'Please write a age' });
  }

  if (!gender) {
    errors.push({ text: 'Please write a gender' });
  }

  if (errors.length > 0) {
    res.render('users/profile');
  }

  const companyId = await Company.findOne({ name: companyName }).select('_id');
  await User.findByIdAndUpdate(req.params.id,
    {
      "$set":
      {
        "email": email,
        "companyId": companyId._id
      },
      "$push":
      {
        "name": name,
        "lastname": lastname,
        "age": age,
        "gender": gender
      },
    },{
      "new": true,
      "upsert": true
  });
  req.flash('success_msg', 'User updated successfully');
  res.redirect('/');

};

usersCtrl.renderUpgradeAdmin = async (req, res) => {
  const user = await User.findById(req.params.id).lean();
  res.render('users/signadmin', { user });
};

usersCtrl.updateAdmin = async (req, res) => {
  const {
    codeAdministration,
  } = req.body;
  const errors = [];
  if (codeAdministration !== '2444') {
    errors.push({ text: 'Incorrect code.' });
  }
  if (errors.length > 0) {
    res.render('users/signadmin', {
      errors
    });
  }
  else {
    await User.findByIdAndUpdate(req.params.id, {admin: true});
    req.flash('success_msg', 'You are admin now.');
    res.redirect('/');
  }
};

usersCtrl.renderUsers = async (req, res) => {
  const users = await User.find({})
    .sort({ date: 'desc' })
    .lean();
  res.render('users/all-users', { users });
};

usersCtrl.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  req.flash('success_msg', 'User deleted successfully.');
  res.redirect('/users');
};

module.exports = usersCtrl;
