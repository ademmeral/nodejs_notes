// Exercise (Auth & Register over an RestAPI)

const express = require('express');
const app = express();
const register = require('./routes/register');
const auth = require('./routes/auth');

app.use('/register', register)
app.use('/auth', auth)

app.listen(3500, () => console.log('Server is running'));