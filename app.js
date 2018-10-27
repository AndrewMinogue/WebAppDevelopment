var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const pizzas = require("./routes/pizzas");
const pizzadeal = require("./routes/pizzadeal")
const user = require("./routes/users")


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.post('/pizzas',pizzas.addPizza);
app.post('/pizzadeal',pizzadeal.addPizzaDeal);
app.post('/users',user.Register);
app.post('/login',user.Authenticate);

app.get('/pizzas', pizzas.findAll);
app.get('/pizzadeal', pizzadeal.findAllDeals);
app.get('/pizzas/:id', pizzas.findOne);
app.get('/pizzadeal/:id', pizzadeal.findOneDeal);
app.get('/pizzas/gettotal/getIt', pizzas.GetTotalPizzas);
app.get('/pizzadeal/gettotal/getIt', pizzadeal.GetTotalPizzaDeals);

app.put('/pizzas/:id/rating', pizzas.incrementRating);
app.put('/pizzas/:id',pizzas.editPizza);
app.put('/pizzadeal/:id/rating', pizzadeal.incrementDealRating);
app.put('/pizzadeal/:id',pizzadeal.editPizzaDeal);

app.delete('/pizzas/:id', pizzas.deletePizza);
app.delete('/pizzadeal/:id', pizzadeal.DeletePizzaDeal);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
