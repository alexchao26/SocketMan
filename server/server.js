const path = require('path');
const express = require('express');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

// place environment variables on process.env, invoked as early on in server as possible
require('dotenv').config();

const mongoFunctions = require('./controllers/mongoController');

const PORT = process.env.PORT || 3000;

let userCount = 0;

// connect to socket-io server
io.on('connection', (socket) => {
  // console.log('\n\nSOCKET ID: ', socket.id);
  userCount += 1;
  // console.log('user count', userCount);
  io.sockets.emit('userCount', userCount);

  // when a clickedLetter is received, emit it out to the server
  socket.on('clickedLetter', (letter) => {
    // console.log('server received', letter);
    io.sockets.emit('clickedLetter', letter);
  });

  socket.on('disconnect', () => {
    userCount -= 1;
    // console.log('a user disconnected, count is', userCount);
    io.sockets.emit('userCount', userCount);
  });
});


app.use(express.json());

// serve up statics (build, imgs)
app.use(express.static(path.resolve(__dirname, '../dist'))); // bundle
app.use(express.static(path.resolve(__dirname, '../src/assets'))); // images

// endpoint to grab a new question and answer
app.get('/newPrompt',
  mongoFunctions.getNewQandA,
  (req, res) => {
    // console.log(res.locals.newQuestion);
    const { question, answer } = res.locals.newQuestion;
    // emit to all sockets to trigger consistent question & answer re-renders
    io.emit('newQuestion', question, answer);
    res.sendStatus(300);
  });

// endpoint for default landing page at '/' endpoint
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../src/index.html'));
});

/**
 * @name GLOBAL 404 ROUTE HANDLER
 * @description handles all bad requests sent from frontend
 */
app.all('*', (req, res) => {
  res.status(404).send('Page not found');
});

/**
 * @name : GLOBAL ERROR HANDLER
 * @description sending error objects from controllers/routes should be sent as an object with
 * 'status' and 'message' as key.
 * Status value should be a status code & message value should be a string describing the error
 * and location/file in which the error was invoked from
 */
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const defaultError = {
    log: 'Error caught by Global Error Handler',
    message: 'Unknown Middleware Error occured',
    status: 500,
  };
  const newError = { ...defaultError, ...err };
  // console.log('*********** ERROR **********\n', newError.log);
  res.status(newError.status).send(newError.message);
});

server.listen(PORT, () => {
  if (process.env.NODE_ENV === 'development') console.log('Server listening on PORT:', PORT);
});
