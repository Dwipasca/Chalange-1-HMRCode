const Validator = require('validatorjs')
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({
  extended: false
}));

app.get('/api/member', (req, res) => {
  res.status(200).json({
    message: 'hello dwi!',
    from: 'Jane Shepard'
  })
});

app.post('/api/member', (req, res) => {
  let input = {
    'name': req.body.name,
    'email': req.body.email
  }
  const rules = {
    'name': 'required|min:3',
    'email': 'required|email'
  }

  const validasi = new Validator(input, rules, {
    "required.email": "Without an :attribute we can't reach you!"
  });

  if (validasi.fails()) {
    res.status(422).json({
      errors: {
        name: validasi.errors.first('name'),
        email: validasi.errors.first('email')
      }
    })
  } else {
    res.status(200).json({
      'message': 'user has been created'
    })
  }

})

app.listen(port, () => {
  console.log(`App running on port : ${port}`);
});