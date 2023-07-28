require('dotenv').config({path : __dirname + '/../.env'});

const express = require('express');
const cookieParser = require('cookie-parser');
// const mongoose = require('mongoose');
const app = express();
const {getMany} = require('./controllers/users');
const verifyJWT = require('./middlewares/verifyJWT');
const connectDB = require('./config/dbConn');

// connectDB();

app.use(express.json())
app.use(cookieParser());

app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

app.use(verifyJWT)
app.use('/users', require('./routes/api/users'))
// mongoose.connection.once('open', () => {
  // console.log('Connected to CompanyDB')
  app.listen(3500, () => console.log('Server has started'))
// })