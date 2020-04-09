const mongoose = require('mongoose');

// require in models
const qAndAModel = require('./mongoModel');

mongoose.connect(
  process.env.MONGO_URI, {
    // these options are just to get rid of some deprecation warnings from mongo...
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 5,
    socketTimeoutMS: 1000,
  },
)
  .then(() => {
    if (process.env.NODE_ENV === 'development') console.log('Connected to MongoDB');
  })
  .catch((err) => console.log('ERROR ON FIRST CONNECTION ATTEMPT TO MONGO:', err));

module.exports = { qAndAModel };
