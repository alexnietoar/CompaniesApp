const router = require('express').Router();

// Controller
const {
  renderCompanyForm,
  createNewCompany,
  renderCompanies,
  renderEditForm,
  updateCompany,
  deleteCompany,
} = require('../core/companies.controller');

// Helpers
const { isAuthenticated } = require('../helpers/auth');

// New Company
router.get('/companies/add', isAuthenticated, renderCompanyForm);

router.post('/companies/add', isAuthenticated, createNewCompany);

// Get All Company
router.get('/companies', isAuthenticated, renderCompanies);

// Edit Company
router.get('/companies/edit/:id', isAuthenticated, renderEditForm);

router.put('/companies/edit-company/:id', isAuthenticated, updateCompany);

// Delete Company
router.delete('/companies/delete/:id', isAuthenticated, deleteCompany);

module.exports = router;
