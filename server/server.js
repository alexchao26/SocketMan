const path = require('path');
const express = require('express');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const bodyParser = require('body-parser');
const mongoFunctions = require('./controllers/mongoController');

const PORT = process.env.PORT || 3000;

let userCount = 0;

// connect to socketio server
io.on('connection', (socket) => {
  // console.log('\n\nSOCKET ID: ', socket.id);
  userCount += 1;
  // console.log('user count', userCount);
  io.sockets.emit('userCount', userCount);

  // when a newQuestion is received, emit it out to the server
  socket.on('newQuestion', (question, answer) => {
    // console.log('server received new question', question, answer);
    io.sockets.emit('newQuestion', question, answer);
  });

  // when a clickedLetter is received, emit it out to the server
  socket.on('clickedLetter', (letter) => {
    // console.log('server recived', letter);
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
app.use('/dist', express.static(path.resolve(__dirname, '../dist')));

// endpoint to grab a new question and answer
app.get('/newPrompt',
  mongoFunctions.getNewQandA,
  (req, res) => {
    res.status(300).json(res.locals.newQuestion);
  });

// endpoint for default landing page at '/' endpoint
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/index.html'));
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
app.use((err, req, res, next) => {
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
