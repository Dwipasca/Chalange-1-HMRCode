const express = require('express')
const bodyParser = require('body-parser')
const Validator = require('validatorjs')

const app = express()

app.use(bodyParser.urlencoded({
  extended: false
}));

const members = [];
const port = 8080;

const memberInputValidatorGuard = function (req, res, next) {
  const data = {
    name: req.body.name,
    email: req.body.email
  }

  const rules = {
    name: 'required|min:3',
    email: 'required|email'
  }

  const validation = new Validator(data, rules);

  if (validation.fails()) {
    return res.status(422).json({
      errors: {
        name: validation.errors.first('name'),
        email: validation.errors.first('email'),
      }
    })
  }

  // if data not error
  req.data = data;

  return next();
};

app.get('/members', function (req, res) {
  res.status(200).json({
    members
  });
});

app.post(
  '/members',
  memberInputValidatorGuard,
  function (req, res) {
    const data = req.data;

    members.push(data);
    res.status(201).json({
      message: 'User has been created',
    });
  }
);

app.listen(port, () => console.log('running on port : ', port));