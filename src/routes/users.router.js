const router = require('express').Router();

const {
  renderSignUpForm,
  singup,
  renderSigninForm,
  signin,
  logout,
  updateAdmin,
  renderUpgradeAdmin,
  renderEditProfile,
  updateProfile,
  renderUsers,
  deleteUser,
} = require('../core/users.controller');

// Helpers
const { isAuthenticated, isAdmin } = require('../helpers/auth');

// Routes
router.get('/users/signup', renderSignUpForm);

router.post('/users/signup', singup);

router.get('/users/signin', renderSigninForm);

router.post('/users/signin', signin);

router.get('/users/profile/:id', isAuthenticated, renderEditProfile);

router.put('/users/edit-profile/:id', isAuthenticated, updateProfile);

router.get('/users/logout', isAuthenticated, logout);

router.get('/users/admin/:id', isAuthenticated, renderUpgradeAdmin);

router.put('/users/edit-admin/:id', isAuthenticated, updateAdmin);

router.get('/users', isAuthenticated, isAdmin, renderUsers);

router.delete('/users/delete/:id', isAuthenticated, deleteUser);

module.exports = router;
