/* eslint-disable camelcase */

const mongoController = {};
const mongoConnections = require('../models/mongoConnection');

// connecting to the database upon server start to prevent this from happening on every request
let qAndAModel;
// same idea for document count, do it at server-startup & only then
let documentCache;

// connect to database, set qAndAModel and docuemntCount variables
const dbConnectionPromise = mongoConnections()
  .then((models) => new Promise((resolve) => {
    qAndAModel = models.qAndAModel;

    // note: this was in an attempt to have truly randomized queries
    // note: I'm not confident in how mongoose skips randomize
    // cache all the docs on the server @ startup
    qAndAModel.find({}, (err, docs) => {
      console.log('docs loaded');
      documentCache = docs;
      resolve();
    });
  }));

// set to track which questions have been "used" to prevent repeating ones
const usedQuestions = new Set();

// get one random document from the q_and_as collection
mongoController.getNewQandA = async (req, res, next) => {
  // need to delay the initial question load if the db is not connecting quickly
  // this is hacky but leverages async/await and promises decently...
  if (!documentCache) await dbConnectionPromise;

  // generate a "random" number that is not in the usedQuestions set already
  let randSkip;
  do {
    randSkip = Math.floor(Math.random() * documentCache.length);
  } while (usedQuestions.has(randSkip));

  // place it on res.locals to persist prompt to next piece of middleware
  res.locals.newQuestion = documentCache[randSkip];

  // add the random index to the set, if the set is full, empty/clear it
  usedQuestions.add(randSkip);
  if (usedQuestions.size === documentCache.length) {
    usedQuestions.clear();
    // also want to refresh from the database if all of the questions have been used up
    qAndAModel.find({}, (err, docs) => {
      if (err) console.log('error querying database from mongoController');
      console.log('updating doc cache!');
      documentCache = docs;
    });
  }

  // code for getting newQuestion is synchronous so no need to wait for the cache refresh
  return next();
};

module.exports = mongoController;
