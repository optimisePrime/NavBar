const db = require('./db/db');
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const { getProducts, getCategories } = require('.././server/db/postgres/db.js')

const app = express();

// const categoriesRouter = require('./routes/category.routes');
// const productsRouter = require('./routes/product.routes');

// STATIC FILES
app.use(express.static(path.join(__dirname, '..', 'public')));

// MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.urlencoded());
app.use(cors());

// ROUTES
// app.use('/categories', categoriesRouter);
// app.use('/products', productsRouter);

app.get('/categories', (req, res) => {
  res.send(getCategories());
});


app.get('/products/:category/:query', (req, res) => {
  const { query } = req.params;
  getProducts();
  
});

// 404
app.use((req, res) => {
  res.status(404).send('Not found');
});



module.exports = app;
