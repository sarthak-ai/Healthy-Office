const express = require('express')
const mongoose = require('mongoose')
var bodyParser = require('body-parser')
const app = express()
const expressLayouts=require('express-ejs-layouts')
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const port = process.env.PORT || 3000

require('./config/passport')(passport);

mongoose.connect('mongodb://localhost:27017/healthy-office', {useNewUrlParser: true,  useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected!");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));

app.listen(port, () => {
  console.log(`Healthy-Office listening at http://localhost:${port}`)
})