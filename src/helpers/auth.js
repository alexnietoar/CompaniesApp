const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash('error_msg', 'Not authorized');
    res.redirect('/users/signin');
  }
};

helpers.isAdmin = (req, res, next)=>{
  if(req.user.admin){
    next();
  } else{
    req.flash('error_msg', 'You are not admin');
    res.redirect('/users/admin/:id');
  }
}

module.exports = helpers;
