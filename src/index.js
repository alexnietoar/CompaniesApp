// Read environment variables
require('dotenv').config();
const db = require('./database');
const poblate = require('./core/controller');
const app = require('./server');

db().then(poblate());

// Server is listening
app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
  console.log('Environment:', process.env.NODE_ENV);
});