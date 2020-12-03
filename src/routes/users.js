const express = require('express');
const passport = require('passport');

const router = express.Router();

const Company = require('../models/Company');
const User = require('../models/User');

router.get('/users/signin', (req, res) => {
  res.render('users/signin');
});

router.get('/users/signin/admin', (req, res) => {
  res.render('users/signadmin');
});

router.post('/users/signin', (req, res) => {
  res.render('/');
});

router.post('/users/signin/admin', (req, res) => {
  res.render('users/signadmin');
});

router.get('/users/editadmin/:id', async (req, res) => {
  const {
    codeAdministration,
  } = req.body;
  const errors = [];
  if (codeAdministration !== '2444') {
    errors.push({ text: 'Incorrect code.' });
  }
  console.log(user._id);
});

router.get('/users/signup', async (req, res) => {
  const companies = await Company.find({}).lean().sort({ name: 'asc' });
  res.render('users/signup', { companies });
});

router.post('/users/signup', async (req, res) => {
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
});

router.get('/users/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
