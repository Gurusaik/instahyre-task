require('dotenv').config()
require('dotenv').config()

const express = require('express');

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/user', require('./routes/user.route'));

app.listen(8000);
console.log('App started on port 8000')

module.exports = app;