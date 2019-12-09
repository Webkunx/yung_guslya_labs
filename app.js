const express = require('express');
const mongoose = require('mongoose');
const objectId = require('mongodb').ObjectID;
const User = require('./models/User');
const mongo_uri =
  'mongodb+srv://admin:admin@cluster0-cuh7a.mongodb.net/test?retryWrites=true&w=majority';
const app = express();
const jsonParser = express.json();

mongoose
  .connect(mongo_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log('Mongodb connected'))
  .catch(err => console.log(err));

app.use(express.static(__dirname + '/public'));

app.get('/api/users', (req, res) => {
  User.find({}, (err, users) => {
    res.send(users);
  });
});
app.get('/api/users/:id', (req, res) => {
  User.findById(req.params.id, (err, user) => {
    res.send(user);
  });
});

app.post('/api/users', jsonParser, (req, res) => {
  User.create({
    phone: req.body.phone,
    name: req.body.name,
    debt: req.body.debt
  }).then(user => res.send(user));
});

app.delete('/api/users/:id', function(req, res) {
  User.findByIdAndRemove(req.params.id, (err, user) => {
    res.send(user);
  });
});

app.put('/api/users/', jsonParser, function(req, res) {
  if (!req.body)
    return res.status(400).json({ error: 'You havent provided any data' });
  console.log(req.body);

  User.findOneAndUpdate(
    { _id: req.body.id },
    {
      name: req.body.name,
      phone: req.body.phone,
      debt: req.body.debt
    },
    (err, user) => {
      res.send(user);
    }
  );
});

app.listen(3000, () => console.log('Server is running'));
