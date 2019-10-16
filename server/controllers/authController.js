const fetch = require('node-fetch');
const User = require('../models/userModel');

const authController = {};

authController.getTokenJSON = async (req, res, next) => {
  console.log('\n*********** authController.getTokenJSON ****************', `\nMETHOD: ${req.method} \nENDPOINT: '${req.url}' \nBODY: ${JSON.stringify(req.body)} \nLOCALS: ${JSON.stringify(res.locals)} `);
  console.log(`\nDOMAIN: ${req.headers.host}`)
  await fetch(`https://github.com/login/oauth/access_token?client_id=cecbb15649468c524b83&client_secret=7ef8af810a3ed3ce98cde4a29e48205e0cd6fcfc&code=${req.query.code}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
  }).then((response) => response.json()).then((response2) => {
    res.locals.token = response2.access_token;
    return next();
  }).catch((err) => {
    const error = {
      log: `Error authController.getTokenJSON: failed fetch request\n${err.message}`, 
      message: 'Failed Fetch request', 
      status: 500
    }
    next(error)
  });
};

authController.getUserProfile = (req, res, next) => {
  const access_token = res.locals.token;

  const userProfile = fetch('https://api.github.com/user', {
    headers: {
      Authorization: `token ${access_token}`,
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json()).then((userProfile) => {
    console.log();
    res.locals.userProfile = userProfile;
    return next();
  }).catch((err) => {
    console.log('error in getTokenJSON', err);
  });
};

authController.redirectAfterLogin = (req, res, next) => {
  res.redirect('http://localhost:3000/loggedin');
};

authController.createUser = (req, res, next) => {
  const { userProfile } = res.locals;

  const { login, name, avatar_url } = userProfile;
  const access_token = res.locals.token;

  User
    .findOrCreate({
      where: { login },
      defaults: {
        name,
        avatar_url,
        access_token,
      },
    })
    .then(([user, created]) => {
      res.locals.userID = user.id;
      return next();
    }).catch((err) => {
      console.log('Err at adding user to database', err);
    });
};


authController.createDummy = (req, res, next) => {
  User
    .findOrCreate({
      where: { login: 'yyyy' },
      defaults: {
        access_token: 'Technical Lead JavaScript',
        avatar_url: 'egegege',
      },
    })
    .then(([user, created]) => {
      console.log(user.get({
        plain: true,
      }));
    });
};

module.exports = authController;
