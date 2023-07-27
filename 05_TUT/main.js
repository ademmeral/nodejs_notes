/*
const express = require('express');
const app = express();
const path = require('path');
const logger = require('./middlewares/logEvents');
*/
// app.use( express.static(path.join(__dirname, 'public')) )

//* 'extended: false' means the values can only be strings or arrays. 
// So, you cannot use nested objects as values.

//* extended: true means you can use nested objects in the URL-encoded data, 
// but in most cases, the false option is sufficient for parsing simple form data.

//* To use this middleware app.use( express.urlencoded({extended : false}) ) in your Express application, 
//  you would typically use it before your route handlers.
 
//* This middleware will then parse the URL-encoded data in incoming POST requests and-
//  make it accessible in your route handlers through req.body. 
//  For example, if the client sends a POST request with data name=John&age=30, you can access them like-
//  req.body.name and req.body.age

// app.use(express.urlencoded({extended : false}))

//* express.json() middleware is a built-in middleware function that is used to parse incoming JSON data in the request body.
// app.use( express.json() )

// Setting a custom middleware (logger)
// Open google.com and the console, make a request to localhost:3500/give_me_some_data through fetch API
// This middleware will run all over the app, because we didn't specify any route path in app.use(/*path*/, logger).
// The logger function will work, but you should see a CORS-Error on the console.
/*
app.use(logger)

// Try a POST request in type of either json or form and see the name and age on the console.
app.post('^/$|/home(.html)?', (req, res, next) => {
  // console.log(req.body.name, req.body.age)
  console.log(req.body)
  next()
})

app.get('^/$|/home(.html)?', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'home.html'))
})

app.listen(3500, () => console.log('Server has started!'))
*/
/*
// Handling errors
const path = require('path')
const errorHandler = require('./middlewares/errorHandler');
const express = require('express')
const app = express();

app.use(errorHandler)
app.use( express.static(path.join('./public')) )

// app.all(path, callback) handles each request method (POST, GET, DELETE, etc)
app.all('*', (req, res) => {
  res.status(404).sendFile(path.join(__dirname,'pages', '404.html'))
})

// OR
app.all('*', (req, res) => {

  if (req.accepts('json')) {
    res.json({ message: 'This is JSON data.' });
  }
  // Check if the client accepts XML
  else if (req.accepts('xml')) {
    res.type('xml');
    res.send('<message>This is XML data.</message>');
  }
  else if (req.accepts('html')) {
    res.type('xml');
    res.sendFile(path.join(__dirname,'pages', '404.html'))
  }
  // If the client doesn't accept JSON or XML, send plain text
  else {
    res.send('This is plain text data.');
  }
})

app.listen(3500, () => console.log('Running'))
*/