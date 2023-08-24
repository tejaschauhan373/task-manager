const express = require('express');
const userRouter = require('./router/user');
const productRouter = require('./router/item');
const cartRouter = require('./router/cart');

const app = express();
require('dotenv').config();
console.log(`Database name is ${process.env.MONGODB_URL}`);
app.use(express.json());

app.use(userRouter);
app.use(productRouter);
app.use(cartRouter);

module.exports = app