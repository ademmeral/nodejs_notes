/*
const express = require('express');
const app = express();
const path = require('path');
// Importing CORS to prevert CORS error when a request comes from another domain 
const cors = require('cors')    

// app.use(cors())   // If we don't define CORS options, It will allow all domains by default.

// CORS Options & Whitelist
const whitelist = [
  //'https://www.mywebsite.com',
  'http://localhost:3500',
  '127.0.0.1:3500',
  'https://anexampledomain.com'
]

const corsOptions = {
  // origin accepts either a function or an origin. The function accepts two parameters, the second one is a callback-
  // function that accepts two parameters, the first one is error and the other is a boolean.

  origin: (origin, callback) => {           // Instead of the function, we could define only the origin as well.
    if ( whitelist.indexOf(origin) !== -1 ) {
      callback(null, true)
    } else {
      callback(new Error('Accessing blocked by CORS'))
    }
    console.log(origin)
  },
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

app.get('/', (req, res) => {
  console.log(req.headers.origin, req.method, req.url)
  res.send('OK');
})

app.listen(3500, () => console.log('Server is running'))
*/