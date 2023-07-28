require('dotenv').config({path : __dirname + '/../.env'});

const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const {getMany} = require('./controllers/users');
const verifyJWT = require('./middlewares/verifyJWT');

app.use(express.json())
app.use(cookieParser());

app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));

app.use(verifyJWT)
app.use('/users', getMany)

app.listen(3500, () => console.log('Server has started'))