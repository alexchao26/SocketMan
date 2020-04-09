const mongoose = require('mongoose');
require('dotenv').config(); // place environment variables on process.env

// require in models
const qAndAModel = require('./mongoModel');

// export an async function that awaits the connection to the database,
// and returns all defined models
module.exports = async () => {
  // internal pool handling set to 5 connections?
  await mongoose.connect(
    process.env.MONGO_URI,
    {
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
  // return an object with all the models on it, in this case only the qAndAModel
  return { qAndAModel };
};
