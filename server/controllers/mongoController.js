/* eslint-disable camelcase */

const mongoController = {};
const mongoConnections = require('../models/mongoConnection');

// connecting to the database upon server start to prevent this from happening on every request
let qAndAModel;
// same idea for document count, do it at server-startup & only then
let documentCache;

// connect to database, set qAndAModel and docuemntCount variables
mongoConnections()
  .then((models) => {
    qAndAModel = models.qAndAModel;

    // note: this was in an attempt to have truly randomized queries
    // note: I'm not confident in how mongoose skips randomize
    // cache all the docs on the server @ startup
    qAndAModel.find({}, (err, docs) => {
      // console.log('all docs are', docs);
      documentCache = docs;
    });
  });

// get one random document from the q_and_as collection
mongoController.getNewQandA = async (req, res, next) => {
  // generate a "random" number and grab that element of the docs cache
  const randSkip = Math.floor(Math.random() * documentCache.length);
  // place it on res.locals to persist prompt to next piece of middleware
  res.locals.newQuestion = documentCache[randSkip];
  return next();
};

module.exports = mongoController;
