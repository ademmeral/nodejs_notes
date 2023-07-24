// CORS ( Cross-Origin Resource Sharing)

  //* is a security feature implemented by web browsers to prevent unauthorized access to resources hosted on different
  //  domains (origin). It is an important aspect of web application security that helps protect users from potential attacks.
  //* In the context of web development, an "origin" is a combination of the protocol (e.g., http, https), domain (e.g.,-
  //  example.com), and port (e.g., 80, 443) from which a web page is served.
  //* Browsers enforce the Same-Origin Policy (SOP), which restricts web pages from making requests to a different origin-
  //  than the one that served the page. 
  //* This policy helps prevent various security risks, such as unauthorized data access and-
  //  cross-site request forgery (CSRF) attacks.
  //* However, there are legitimate scenarios where web pages from one origin may need to access resources hosted on another-
  //  origin. For example, an application hosted on https://app.example.com may need to request data-
  //  from an API hosted on https://api.example.com. 
  //* CORS allows servers to specify which origins are permitted to access their resources, effectively-
  //  relaxing the Same-Origin Policy for those trusted origins. (whitelist)

  // Here's how CORS works:
    // 1- Origin Header: When a web page makes a cross-origin request (e.g., using JavaScript's XMLHttpRequest or-
    //    Fetch API), the browser includes an Origin header in the request (req.headers.origin),-
    //    indicating the origin of the requesting web page. (e.g https://www.google.com <-- origin)
    
    // 2- Pre-flight Request: For certain types of requests (e.g., requests with certain HTTP methods like PUT or DELETE,-
    //    or requests with custom headers), the browser first sends a pre-flight request with the HTTP OPTIONS method-
    //    to the target server.  
    //    This pre-flight request asks the server if the actual request is allowed from the given origin.

    // 3- CORS Headers: The server responds to the pre-flight request with CORS-specific response headers,-
    //    such as Access-Control-Allow-Origin, Access-Control-Allow-Methods, Access-Control-Allow-Headers, and others.
    //    These headers inform the browser about the permissions granted to the requesting origin.

    // 4- Actual Request: If the server confirms that the requesting origin is allowed, the actual request is made.
    //    The server includes the appropriate CORS headers in the response to the actual request, allowing the browser-
    //    to determine whether the response should be accessible to the requesting page.

    //* CORS is essential for secure cross-origin communication in modern web applications while still-
    //  maintaining the protection provided by the Same-Origin Policy. 
    //* It is up to web developers to configure their server to include the appropriate CORS headers based on-
    //  their security requirements and the origins they want to allow access to their resources.
/*
const express = require('express');
const app = express();
const path = require('path');
// Importing CORS to prevert CORS error when a request comes from another domain 
const cors = require('cors')    

// app.use(cors())   // If we don't define CORS options, It will allow all domains by default.

// CORS Options & Whitelist
const whitelist = [
  //'https://www.google.com',
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