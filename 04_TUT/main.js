// EXPRESS JS

const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3500;

  //* app.get method handles GET requests. There are also PORT/DELETE/... methods (e.g app.post, app.all )
  //* We can also define Regular Expression in the first parameter to the methods (e.g app.get('^/|/index(.html)?') )
  //* We use res.sendFile('route', options) to display a file on the screen
  //* res.send('some text') displays a plain text on the screen
  //* res.json(jsonData) returns a json data
  //* Express returns a plain text (Cannot GET,POST,etc /path) and set the status code to 404 if cannot find the file.
  //* res.redirect allows us to redirect user to a particular page. Its status code is 302 by default, but we can set it.
  //* We use res.status(404).sendFile(/* path */) when we want to display a custom 404 page
  //* The methods to request also allows us to chain callbacks (middlewares)
  //* The callbacks (middleware) inside the methods to request also take a third parameter called "next" (a function)
  //* The next function makes the operation continue. 'next()' means "Do not await! Continue!"
  //* We have to use the next function when we don't use any response method, like res.sendFile(/* path */)
  //* Those response method includes the next function, so we don't need to define the "next" function additionally.

// REMEMBER : We have to define all the path to the files (css, png, json, etc) when a request occurs.

// app.get('^/$|/home(.html)?', (req, res) => {
//   // res.send('Hello ExpressJs')
//   // res.sendFile(path.join(__dirname, 'views', 'home.html') /*, { options } */)
//   // OR
//   res.sendFile('./views/home.html', {root: __dirname})
//   console.log(req.url, req.method)
// })
/*
app.get('/about(.html)?', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'about.html'))
})
app.get('/posts/index(.html)?', (req, res) => {
  res.sendFile(path.join(__dirname, 'views','posts','index.html'))
})
app.get('/images(.html)?', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'images.html'))
})
app.get('/contact(.html)?', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'contact.html'))
})
app.get('/new-page(.html)?', (req, res) => {
  res.sendFile('./views/new-page.html', {root: __dirname})
})
app.get('/old-page(.html)?', (req, res) => {
  res.redirect(301, '/new-page.html')
})
app.get('/style.css', (req, res) => {
  res.sendFile('./views/style.css', {root: __dirname})
})
*/

/*
// Chaining callbacks
app.get('/example(.html)?', (req, res, next) => {
  console.log('Requested to example-page')
  next()
}, (req, res, next) => {
  console.log('Requested to example-page again')
  next()
}, (req, res) => {
  res.send('Finished!')     // sends a plain text
})
*/
/*
// The callbacks could be in an array as well
const one = (req, res, next) => {
  console.log('Requested to example-page');
  next()
}
const two = (req, res, next) => {
  console.log('Requested to example-page again');
  next()
}
const three = (req, res, next) => {
  res.send('Finished!')
}

app.get('/example(.html)?', [one, two, three])

// app.get('/*', (req, res) => {
//   res.status(404).sendFile('./views/404.html', {root: __dirname})
// })
*/
// app.listen(PORT, () => console.log('Server is running at on port ' + PORT))