require('dotenv').config({path : __dirname + '/../.env'});

const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const verifyJWT = require('./middlewares/verifyJWT');

app.use(express.json())
app.use(cookieParser());

app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

app.use(verifyJWT)
app.use('/users', require('./routes/api/users'))

app.listen(3500, () => console.log('Server has started'))