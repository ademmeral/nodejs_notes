// MIDDLEWARES

  //* Middleware functions in Express.js are functions that have access to the request (req) and response (res) objects,-
  //  and they can perform various tasks on the request or response, modify them,-
  //  or pass control to the "next" middleware (third argument) in the chain.

  //* There are three type middlewares ;
    //  1- built-in
    //  2- custom
    //  3- third-party

  //* We use "app.use(/* middleware */)" method while using middleware
  //* Middlewares are applied all over the app, when we set it.
  //* If we write our custom middleware, we have to put it on top of all the routes. So, the order is important!
  //* app.use( express.urlencoded(/*{options*/}) ) is a middleware function used to handle URL-encoded data in HTTP POST-
  //  requests. It is part of the body-parser middleware package, which allows Express to parse incoming request bodies.
  //  When a client sends data using the application/x-www-form-urlencoded content type (commonly used in HTML forms), the-
  //  server needs to extract and parse that data to access it easily in the route handlers.
  //* app.use( express.json() ) handles files coming in type of json. Its content-type is 'application/json'
  //* app.use( express.static(/*path*/) ) allows us to define our static file. (e.g express.static(./public) )
  //* Thanks to express.static, we can separate out html files to another folders. They will run as they are in public-
  //  directory whatever they have links. (e.g The img tag in another file, but it'll work --> <img src="./imgs/img_01.jpg")

// NOTE : If we don't use express.static middleware, we will have to create another GET request method for our images,css,etc.
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