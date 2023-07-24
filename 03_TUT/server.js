/*
const http = require('http');

// Creating a web-server
const PORT = process.env.PORT || 3500;
const server = http.createServer((req, res) => {
  console.log(req.url)
});
*/
// server.listen(PORT, /*,serverid,*/ () => {
//   console.log(`Server is running on port ${PORT}`)
// })

//* server.listen method listens the server. 
//* The callback in http.createServer method does whatever exists in the callback whenever a change occur.
//* Each time we hit the enter after typing a url, is a request to server.
//* In the callback in http.createServer method, we've wanted to get request url.
//* A response is an answer that server send the client by its request.

// Example

const http = require('http');
const fs = require('fs');
const EventEmitter = require('events');
const path = require('path');
const logEvents = require('./logEvents');

const PORT = process.env.PORT || 3500;
const logEvent = new EventEmitter();
logEvent.on('log', (dir, fileName, url) => logEvents(dir, fileName, url))

const serveFile = (resp, filePath, ContentType) => {
  try{
    const status = filePath.includes("404.html") ? 404 : 200;
    const encoding = !ContentType.startsWith('image') ? 'utf-8' : ''
    const data = fs.readFileSync(filePath, encoding)
    resp.writeHead( status, {"Content-Type": ContentType} );
    resp.end(data)
  } catch (err) {
    console.log(err)
    resp.statusCode = 500;
    logEvent.emit(
      'log', 
      'logs',
      'errorLogs.txt', 
      `${err.message}`
    );
    resp.end()
  }
}

const server = http.createServer((req, res) => {
  logEvent.emit(
    'log', 
    'logs',
    'eventLogs.txt', 
    `${req.url} ${req.method}`
  );

  // Displaying html pages
  let extention = path.extname(req.url);
  let ContentType;

  switch(extention){
    case '.css' :
      ContentType = 'text/css'
      break;
    case '.js' :
      ContentType = 'text/javascript'
      break;
    case '.html' :
      ContentType = 'text/html'
      break;
    case '.txt' :
      ContentType = 'text/plain'
      break;
    case '.json' :
      ContentType = 'application/json'
      break;
    case '.jpg' :
      ContentType = 'image/jpg'
      break;
    case '.png' :
      ContentType = 'image/png'
      break;
    case '.ico' :
      ContentType = 'image/ico'
      break;
    default :
      ContentType = 'text/html'
      break;
  }

  let filePath = 
    ContentType === 'text/html' && (req.url === '/' || req.url === '/home.html')
      ? path.join('views', 'home.html')
      : ContentType === 'text/html' && req.url.at(-1) === '/'
        ? path.join('views', req.url, 'index.html')
        : ContentType === 'text/html'
          ? path.join('views', req.url)
          : path.join('views', req.url);

  if (!extention && req.url.at(-1) !== '/') filePath += '.html';
  let doesExist = path.extname(filePath);
  if(doesExist){
    // serve the file
    serveFile(res, filePath, ContentType)
  } else {
    switch(path.parse(filePath).base){
      case 'old-page.html' :
        res.writeHead(301, {'Location' : '/home.html'})
        break; 
      default :
        serveFile(res, path.join('views', '404.html'), 'text/html')
        break;
    }
  }
  //console.log( path.parse(filePath) )     // just to see what's going on there
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

// SUMMARY OF THE EXAMPLE
  // 1- We imported (required) the needed files
  // 2- We created an http-server and started listening to
  // 3- We got the extension when user types/clicks a url/link
  // 4- Checked the extension in a switch statement to set the content-type
  // 5- Checked the file-type according to GET request
  // 6- Created a function to handle the related file
  // 7- If file doesn't exist, a user will be directed to 404.html page