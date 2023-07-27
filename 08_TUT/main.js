// EXERCISE


const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const verifyJWT = require('./middlewares/verifyJWT');

app.use(express.json())
app.use(cookieParser())         

app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

app.use(verifyJWT)
app.use('/users', require('./routes/api/users'))

app.listen(3500, () => console.log('Server has started.'))