// EXPRESS ROUTER

const express = require('express')
const app = express();
// Routers
const mainRouter = require('./routes/root');
const emplooyes = require('./routes/api/emplooyes');
const posts = require('./routes/posts');

app.use(posts);
app.use(emplooyes)
app.use(mainRouter)

app.listen(3500, () => console.log('Server has been started!'))