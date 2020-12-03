const mongoose = require('mongoose');

const config = require("./config/config");

const MONGODB_URI = `mongodb://${config.MONGODB_HOST}/${config.MONGODB_DATABASE}`;

module.exports = async () => {
  mongoose.connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
    .then((db) => console.log('MongoDB is connected to', db.connection.host))
    .catch((err) => console.log(err));
};
