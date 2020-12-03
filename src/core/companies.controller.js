const companiesCtrl = {};

// Models
const Company = require('../models/Company');

companiesCtrl.renderCompanyForm = (req, res) => {
  res.render('companies/add');
};

companiesCtrl.createNewCompany = async (req, res) => {
  const { name, nit, address } = req.body;
  const errors = [];
  if (!name) {
    errors.push({ text: 'Please write a name' });
  }
  if (!nit) {
    errors.push({ text: 'Please write a NIT' });
  }
  if (!address) {
    errors.push({ text: 'Please write a address' });
  }
  if (errors.length > 0) {
    res.render('companies/add', {
      errors,
      name,
      nit,
      address,
    });
  } else {
    const newCompany = new Company({ name, nit, address });
    await newCompany.save();
    req.flash('success_msg', 'Company added successfully.');
    res.redirect('/companies');
  }
};

companiesCtrl.renderCompanies = async (req, res) => {
  const companies = await Company.find({})
    .sort({ date: 'desc' })
    .lean();
  res.render('companies/all-companies', { companies });
};

companiesCtrl.renderEditForm = async (req, res) => {
  const company = await Company.findById(req.params.id).lean();
  res.render('companies/edit-company', { company });
};

companiesCtrl.updateCompany = async (req, res) => {
  const { name, nit, address } = req.body;
  await Company.findByIdAndUpdate(req.params.id, { name, nit, address });
  req.flash('success_msg', 'Company updated successfully');
  res.redirect('/companies');
};

companiesCtrl.deleteCompany = async (req, res) => {
  await Company.findByIdAndDelete(req.params.id);
  req.flash('success_msg', 'Company deleted successfully.');
  res.redirect('/companies');
};

module.exports = companiesCtrl;
